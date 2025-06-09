
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

  const fetchProfile = async (userId: string) => {
    try {
      console.log('🔍 Fetching profile for user:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('❌ Error fetching profile:', error);
        return null;
      }

      console.log('✅ Profile fetched successfully:', data);
      return data;
    } catch (error) {
      console.error('❌ Exception fetching profile:', error);
      return null;
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
          const userProfile = await fetchProfile(session.user.id);
          setProfile(userProfile);
        } else {
          console.log('👤 No user, clearing profile');
          setProfile(null);
        }
        
        setLoading(false);
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
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData || {}
        }
      });
      
      if (!error) {
        toast.success('Usuário criado com sucesso!');
      }
      
      return { error };
    } catch (error: any) {
      console.error('SignUp error:', error);
      toast.error('Erro ao criar usuário: ' + error.message);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
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
        
        // Fetch profile immediately after login
        const userProfile = await fetchProfile(data.user.id);
        if (userProfile) {
          setProfile(userProfile);
          console.log('✅ Profile set after login:', userProfile);
        }
        
        // Update last access
        try {
          await supabase.from('profiles')
            .update({ last_access: new Date().toISOString() })
            .eq('id', data.user.id);
            
          await supabase.from('activity_logs').insert([{
            user_id: data.user.id,
            action: 'login',
            user_agent: navigator.userAgent,
          }]);
        } catch (err) {
          console.warn('Failed to update last access or log activity:', err);
        }
        
        toast.success('Login realizado com sucesso!');
      }
      
      return { error };
    } catch (error: any) {
      console.error('❌ SignIn error:', error);
      toast.error('Erro ao fazer login: ' + error.message);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      if (user) {
        try {
          await supabase.from('activity_logs').insert([{
            user_id: user.id,
            action: 'logout',
            user_agent: navigator.userAgent,
          }]);
        } catch (err) {
          console.warn('Failed to log logout activity:', err);
        }
      }
      
      await supabase.auth.signOut();
      toast.success('Logout realizado com sucesso!');
    } catch (error: any) {
      console.error('SignOut error:', error);
      toast.error('Erro ao fazer logout: ' + error.message);
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
      hasProfile: !!profile,
      userId: user?.id,
      userEmail: user?.email 
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
