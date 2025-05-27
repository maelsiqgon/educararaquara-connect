
export interface UserData {
  email: string;
  password?: string;
  name: string;
  cpf?: string;
  phone?: string;
  address?: string;
  registration?: string;
  roles?: RoleData[];
}

export interface RoleData {
  school_id: string;
  role: string;
}

export interface UpdateData {
  name?: string;
  cpf?: string;
  phone?: string;
  address?: string;
  registration?: string;
  password?: string;
  active?: boolean;
}
