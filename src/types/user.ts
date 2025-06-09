
export interface UserContact {
  id?: string;
  user_id?: string;
  contact_type: 'phone' | 'email' | 'whatsapp';
  contact_value: string;
  is_primary: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar_url?: string;
  role: string;
  active: boolean;
  created_at: string;
  updated_at: string;
  last_access?: string;
  contacts?: UserContact[];
}
