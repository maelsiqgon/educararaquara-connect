
import { User, Session } from '@supabase/supabase-js';

export interface UserRole {
  id: string;
  school_id: string | null;
  role: string;
  active: boolean;
  created_at: string;
  school?: {
    id: string;
    name: string;
  };
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userRoles: UserRole[];
  signUp: (email: string, password: string, name?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updatePassword: (password: string) => Promise<{ error: any }>;
  hasRole: (schoolId: string, roles: string[]) => boolean;
  isSuperAdmin: () => boolean;
  refreshUserRoles: () => Promise<void>;
}
