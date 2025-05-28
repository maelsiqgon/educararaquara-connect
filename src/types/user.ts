
export interface UserContact {
  id: string;
  user_id: string;
  contact_type: 'phone' | 'mobile' | 'whatsapp' | 'email';
  contact_value: string;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  school_id: string;
  role: 'super_admin' | 'admin' | 'director' | 'coordinator' | 'teacher' | 'staff' | 'parent' | 'student' | 'editor' | 'viewer';
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
  active: boolean;
  avatar_url?: string;
  last_access?: string;
  created_at: string;
  updated_at: string;
  userRoles: UserRole[];
  contacts?: UserContact[];
}
