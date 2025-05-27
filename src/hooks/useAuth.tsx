import { useState, useEffect, useContext, createContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updatePassword: (password: string) => Promise<{ error: any }>;
  hasRole: (schoolId: string, roles: string[]) => boolean;
  isSuperAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRoles, setUserRoles] = useState<any[]>([]);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        // Fetch user roles when user changes
        if (session?.user) {
          setTimeout(() => {
            fetchUserRoles(session.user.id);
          }, 100); // Small delay to ensure database consistency
        } else {
          setUserRoles([]);
        }
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      
      // Fetch user roles if user exists
      if (session?.user) {
        fetchUserRoles(session.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRoles = async (userId: string) => {
    try {
      console.log('Fetching roles for user:', userId);
      const { data, error } = await supabase
        .from('user_school_roles')
        .select('*')
        .eq('user_id', userId)
        .eq('active', true);
      
      if (error) {
        console.error('Error fetching user roles:', error);
        setUserRoles([]);
        return;
      }
      
      console.log('User roles fetched:', data);
      setUserRoles(data || []);
    } catch (error) {
      console.error('Error fetching user roles:', error);
      setUserRoles([]);
    }
  };

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
        
        // Update last access time and log activity via API
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
      // Log activity before signing out
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
    
    return userRoles.some(role => 
      role.school_id === schoolId && 
      roles.includes(role.role)
    );
  };

  const isSuperAdmin = () => {
    if (!user) return false;
    
    const isSuper = userRoles.some(role => role.role === 'super_admin');
    console.log('Checking super admin status:', isSuper, userRoles);
    return isSuper;
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    hasRole,
    isSuperAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
