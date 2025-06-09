
-- LIMPEZA COMPLETA - Removendo tudo relacionado ao sistema atual
DROP TABLE IF EXISTS public.user_contacts CASCADE;
DROP TABLE IF EXISTS public.user_school_roles CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.activity_logs CASCADE;

-- Removendo funções existentes
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.is_super_admin(uuid) CASCADE;
DROP FUNCTION IF EXISTS public.has_role(uuid, text) CASCADE;
DROP FUNCTION IF EXISTS public.get_user_roles(uuid) CASCADE;

-- Removendo triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- CRIAÇÃO DO NOVO SISTEMA LIMPO

-- 1. Tabela de perfis simplificada
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

-- 2. Tabela de logs de atividade
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

-- 3. Habilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- 4. Políticas RLS simples e funcionais
-- Profiles - usuários podem ver próprio perfil, admins veem todos
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

-- Activity logs - usuários veem próprios logs, admins veem todos
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

-- 5. Função para criar perfil automaticamente
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
    -- Se falhar, não bloqueia o cadastro
    RETURN NEW;
END;
$$;

-- 6. Trigger para criar perfil
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. Funções auxiliares
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

-- 8. Inserir usuário admin se não existir
DO $$
DECLARE
  admin_id uuid;
BEGIN
  -- Verificar se já existe
  SELECT id INTO admin_id 
  FROM auth.users 
  WHERE email = 'admin@araraquara.sp.gov.br';
  
  -- Se não existe, criar
  IF admin_id IS NULL THEN
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      confirmation_sent_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      recovery_token,
      email_change,
      email_change_token_new,
      email_change_token_current,
      email_change_confirm_status
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'admin@araraquara.sp.gov.br',
      crypt('admin123456', gen_salt('bf')),
      now(),
      now(),
      null,
      null,
      '{"provider":"email","providers":["email"]}',
      '{"name":"Administrador do Sistema"}',
      now(),
      now(),
      '',
      '',
      '',
      '',
      '',
      0
    ) RETURNING id INTO admin_id;
    
    -- Criar perfil do admin
    INSERT INTO public.profiles (id, email, name, role)
    VALUES (admin_id, 'admin@araraquara.sp.gov.br', 'Administrador do Sistema', 'super_admin');
    
  END IF;
END $$;
