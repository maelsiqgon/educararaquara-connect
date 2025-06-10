
import React, { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AuthContext } from './authContext';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string, retryCount = 0) => {
    try {
      console.log('🔍 Fetching profile for user:', userId, 'Retry:', retryCount);
      
      // Usar service role para buscar perfil diretamente sem RLS
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('❌ Error fetching profile:', error);
        
        // Se o perfil não existe, criar um
        if (error.code === 'PGRST116' && retryCount < 3) {
          console.log('🔄 Profile not found, attempting to create...');
          await createProfile(userId);
          return await fetchProfile(userId, retryCount + 1);
        }
        return null;
      }

      console.log('✅ Profile fetched successfully:', data);
      return data;
    } catch (error) {
      console.error('❌ Exception fetching profile:', error);
      return null;
    }
  };

  const createProfile = async (userId: string) => {
    try {
      const user = await supabase.auth.getUser();
      const userEmail = user.data.user?.email;
      
      if (!userEmail) return;

      const profileData = {
        id: userId,
        email: userEmail,
        name: userEmail === 'admin@araraquara.sp.gov.br' ? 'Administrador do Sistema' : userEmail.split('@')[0],
        role: userEmail === 'admin@araraquara.sp.gov.br' ? 'super_admin' : 'user',
        active: true
      };

      console.log('📝 Creating profile:', profileData);

      const { error } = await supabase
        .from('profiles')
        .insert([profileData]);

      if (error) {
        console.error('❌ Error creating profile:', error);
      } else {
        console.log('✅ Profile created successfully');
      }
    } catch (error) {
      console.error('❌ Exception creating profile:', error);
    }
  };

  useEffect(() => {
    console.log('🚀 Setting up auth state listener');
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔐 Auth state changed:', event, {
          userEmail: session?.user?.email,
          userId: session?.user?.id
        });
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          console.log('👤 User found, fetching profile...');
          setTimeout(async () => {
            const userProfile = await fetchProfile(session.user.id);
            setProfile(userProfile);
            setLoading(false);
          }, 100);
        } else {
          console.log('👤 No user, clearing profile');
          setProfile(null);
          setLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log('🔍 Initial session check:', {
        hasSession: !!session,
        userEmail: session?.user?.email,
        userId: session?.user?.id
      });
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        console.log('👤 Existing session found, fetching profile...');
        const userProfile = await fetchProfile(session.user.id);
        setProfile(userProfile);
      }
      
      setLoading(false);
    });

    return () => {
      console.log('🧹 Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      setLoading(true);
      console.log('🔑 Attempting signup with:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData || {},
          emailRedirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) {
        console.error('❌ Signup error:', error);
        toast.error('Erro ao criar usuário: ' + error.message);
        return { error };
      }

      if (data.user) {
        console.log('✅ Signup successful for:', data.user.email);
        toast.success('Usuário criado com sucesso!');
      }
      
      return { error: null };
    } catch (error: any) {
      console.error('❌ SignUp error:', error);
      toast.error('Erro ao criar usuário: ' + error.message);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('🔑 Attempting login with:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('❌ Login error:', error);
        toast.error('Erro ao fazer login: ' + error.message);
        return { error };
      }

      if (data.user) {
        console.log('✅ Login successful for:', data.user.email);
        toast.success('Login realizado com sucesso!');
      }
      
      return { error: null };
    } catch (error: any) {
      console.error('❌ SignIn error:', error);
      toast.error('Erro ao fazer login: ' + error.message);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      console.log('🚪 Signing out...');
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('❌ Signout error:', error);
        toast.error('Erro ao fazer logout: ' + error.message);
      } else {
        console.log('✅ Signout successful');
        toast.success('Logout realizado com sucesso!');
      }
    } catch (error: any) {
      console.error('❌ SignOut error:', error);
      toast.error('Erro ao fazer logout: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = signOut;

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      
      if (!error) {
        toast.success('Email de redefinição de senha enviado com sucesso!');
      }
      
      return { error };
    } catch (error: any) {
      console.error('Reset password error:', error);
      toast.error('Erro ao enviar email de redefinição: ' + error.message);
      return { error };
    }
  };

  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password
      });
      
      if (!error) {
        toast.success('Senha atualizada com sucesso!');
      }
      
      return { error };
    } catch (error: any) {
      console.error('Update password error:', error);
      toast.error('Erro ao atualizar senha: ' + error.message);
      return { error };
    }
  };

  const isSuperAdmin = () => {
    const result = profile?.role === 'super_admin' && profile?.active === true;
    console.log('🔍 Checking super admin status:', { 
      result, 
      role: profile?.role,
      active: profile?.active,
      hasProfile: !!profile
    });
    return result;
  };

  const isAdmin = () => {
    if (!profile) return false;
    return ['admin', 'super_admin'].includes(profile.role) && profile.active === true;
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    logout,
    resetPassword,
    updatePassword,
    isSuperAdmin,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth } from './authContext';
