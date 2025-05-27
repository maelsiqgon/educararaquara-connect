
import React, { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AuthContext } from './authContext';
import { UserRole } from './types';
import { fetchUserRoles, isSuperAdmin as checkSuperAdmin, hasRole as checkHasRole } from './userRoleService';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);

  const refreshUserRoles = async () => {
    if (user) {
      console.log('Refreshing user roles for:', user.id);
      const roles = await fetchUserRoles(user.id);
      console.log('Roles refreshed:', roles);
      setUserRoles(roles);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        // Fetch user roles when user changes
        if (session?.user) {
          // Small delay to ensure database is ready
          setTimeout(async () => {
            console.log('Fetching roles after auth change for:', session.user.id);
            const roles = await fetchUserRoles(session.user.id);
            console.log('Roles fetched after auth change:', roles);
            setUserRoles(roles);
          }, 500);
        } else {
          setUserRoles([]);
        }
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      
      // Fetch user roles if user exists
      if (session?.user) {
        setTimeout(async () => {
          console.log('Fetching roles for existing session:', session.user.id);
          const roles = await fetchUserRoles(session.user.id);
          console.log('Roles fetched for existing session:', roles);
          setUserRoles(roles);
        }, 500);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name || email.split('@')[0]
          }
        }
      });
      
      if (!error) {
        toast.success('Cadastro realizado com sucesso! Verifique seu email para confirmação.');
      }
      
      return { error };
    } catch (error: any) {
      console.error('SignUp error:', error);
      toast.error('Erro ao criar conta: ' + error.message);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting login with:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (!error && data.user) {
        console.log('Login successful:', data.user.email);
        toast.success('Login realizado com sucesso!');
        
        // Update last access time and log activity
        setTimeout(async () => {
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
        }, 0);
      } else if (error) {
        console.error('Login error:', error);
        toast.error('Erro ao fazer login: ' + error.message);
      }
      
      return { error };
    } catch (error: any) {
      console.error('SignIn error:', error);
      toast.error('Erro ao fazer login: ' + error.message);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      if (user) {
        setTimeout(async () => {
          try {
            await supabase.from('activity_logs').insert([{
              user_id: user.id,
              action: 'logout',
              user_agent: navigator.userAgent,
            }]);
          } catch (err) {
            console.warn('Failed to log logout activity:', err);
          }
        }, 0);
      }
      
      await supabase.auth.signOut();
      toast.success('Logout realizado com sucesso!');
    } catch (error: any) {
      console.error('SignOut error:', error);
      toast.error('Erro ao fazer logout: ' + error.message);
    }
  };

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

  const hasRole = (schoolId: string, roles: string[]) => {
    if (!user) return false;
    return checkHasRole(userRoles, schoolId, roles);
  };

  const isSuperAdmin = () => {
    if (!user) {
      console.log('No user, not super admin');
      return false;
    }
    
    const isSuper = checkSuperAdmin(userRoles);
    console.log('Checking super admin status:', { 
      isSuper, 
      userRoles, 
      userId: user.id,
      userEmail: user.email 
    });
    return isSuper;
  };

  const value = {
    user,
    session,
    loading,
    userRoles,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    hasRole,
    isSuperAdmin,
    refreshUserRoles
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
