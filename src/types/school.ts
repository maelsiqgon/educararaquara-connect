
export interface SchoolContact {
  id: string;
  school_id: string;
  type: 'phone' | 'email' | 'whatsapp' | 'cellphone';
  value: string;
  label?: string;
  primary_contact: boolean;
  created_at: string;
}

export interface School {
  id: string;
  name: string;
  type: 'EMEI' | 'EMEF' | 'CEMEI' | 'Creche';
  address?: string;
  director?: string;
  description?: string;
  image_url?: string;
  students: number;
  teachers: number;
  classes: number;
  active: boolean;
  created_at: string;
  updated_at: string;
  contacts?: SchoolContact[];
}

export interface SchoolBasicInfo {
  name: string;
  type: 'EMEI' | 'EMEF' | 'CEMEI' | 'Creche';
  director: string;
  address: string;
  description: string;
  students: number;
  teachers: number;
  classes: number;
  image_url: string;
}

export interface ContactForm {
  type: 'phone' | 'email' | 'whatsapp' | 'cellphone';
  value: string;
  label: string;
  primary_contact: boolean;
}
