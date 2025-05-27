
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
        setSession(session);
        setUser(session?.user ?? null);
        
        // Fetch user roles when user changes
        if (session?.user) {
          fetchUserRoles(session.user.id);
        } else {
          setUserRoles([]);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
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
      const { data, error } = await supabase
        .from('user_school_roles')
        .select('*')
        .eq('user_id', userId)
        .eq('active', true);
      
      if (error) throw error;
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
    } catch (error) {
      toast.error('Erro ao criar conta: ' + error.message);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (!error) {
        toast.success('Login realizado com sucesso!');
        
        // Log activity
        await supabase.from('activity_logs').insert([{
          user_id: user?.id,
          action: 'login',
          user_agent: navigator.userAgent,
        }]);
        
        // Update last access time
        await supabase.from('profiles')
          .update({ last_access: new Date().toISOString() })
          .eq('id', user?.id);
      }
      
      return { error };
    } catch (error) {
      toast.error('Erro ao fazer login: ' + error.message);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      // Log activity before signing out
      if (user) {
        await supabase.from('activity_logs').insert([{
          user_id: user.id,
          action: 'logout',
          user_agent: navigator.userAgent,
        }]);
      }
      
      await supabase.auth.signOut();
      toast.success('Logout realizado com sucesso!');
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
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
    
    return userRoles.some(role => role.role === 'super_admin');
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
