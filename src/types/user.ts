
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar_url?: string;
  role: 'super_admin' | 'admin' | 'user';
  active: boolean;
  created_at: string;
  updated_at: string;
  last_access?: string;
}

export interface ActivityLog {
  id: string;
  user_id?: string;
  action: string;
  resource_type?: string;
  resource_id?: string;
  details?: any;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}
