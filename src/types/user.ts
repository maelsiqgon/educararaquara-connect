
export interface UserRole {
  id: string;
  user_id: string;
  school_id: string;
  role: 'super_admin' | 'admin' | 'editor' | 'viewer';
  active: boolean;
  created_at: string;
  school?: {
    id: string;
    name: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  cpf?: string;
  phone?: string;
  address?: string;
  registration?: string;
  avatar_url?: string;
  active: boolean;
  last_access?: string;
  created_at: string;
  updated_at: string;
  roles: UserRole[];
}
