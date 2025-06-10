
-- LIMPEZA COMPLETA E RECRIAÇÃO DO SISTEMA

-- 1. Remover tudo existente
DROP TABLE IF EXISTS public.activity_logs CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.is_super_admin(uuid) CASCADE;
DROP FUNCTION IF EXISTS public.is_admin(uuid) CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Limpar usuários existentes problemáticos
DELETE FROM auth.users WHERE email = 'admin@araraquara.sp.gov.br';

-- 2. CRIAR SISTEMA NOVO E LIMPO

-- Tabela de perfis simplificada e funcional
CREATE TABLE public.profiles (
  id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL UNIQUE,
  name text NOT NULL,
  phone text,
  avatar_url text,
  role text NOT NULL DEFAULT 'user' CHECK (role IN ('super_admin', 'admin', 'user')),
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  last_access timestamptz,
  
  PRIMARY KEY (id)
);

-- Tabela de logs de atividade
CREATE TABLE public.activity_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  action text NOT NULL,
  resource_type text,
  resource_id uuid,
  details jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now(),
  
  PRIMARY KEY (id)
);

-- 3. HABILITAR RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- 4. POLÍTICAS RLS SIMPLES E FUNCIONAIS
-- Profiles: usuários veem próprio perfil, admins veem todos
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_select_admin" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
      AND active = true
    )
  );

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "profiles_update_admin" ON public.profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
      AND active = true
    )
  );

CREATE POLICY "profiles_insert_admin" ON public.profiles
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND role = 'super_admin'
      AND active = true
    )
  );

CREATE POLICY "profiles_delete_super_admin" ON public.profiles
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND role = 'super_admin'
      AND active = true
    )
  );

-- Activity logs: usuários veem próprios logs, admins veem todos
CREATE POLICY "activity_logs_select_own" ON public.activity_logs
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "activity_logs_select_admin" ON public.activity_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
      AND active = true
    )
  );

CREATE POLICY "activity_logs_insert" ON public.activity_logs
  FOR INSERT WITH CHECK (true);

-- 5. FUNÇÃO PARA CRIAR PERFIL AUTOMATICAMENTE
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'name', split_part(NEW.email, '@', 1)),
    CASE 
      WHEN NEW.email = 'admin@araraquara.sp.gov.br' THEN 'super_admin'
      ELSE 'user'
    END
  );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RETURN NEW;
END;
$$;

-- 6. TRIGGER PARA CRIAR PERFIL
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. FUNÇÕES AUXILIARES
CREATE OR REPLACE FUNCTION public.is_super_admin(user_uuid uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = user_uuid 
    AND role = 'super_admin' 
    AND active = true
  );
$$;

CREATE OR REPLACE FUNCTION public.is_admin(user_uuid uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = user_uuid 
    AND role IN ('admin', 'super_admin') 
    AND active = true
  );
$$;

-- 8. CRIAR USUÁRIO ADMIN DO ZERO
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  confirmation_sent_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmation_token,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@araraquara.sp.gov.br',
  crypt('admin123456', gen_salt('bf')),
  now(),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Administrador do Sistema"}',
  false,
  '',
  ''
);
