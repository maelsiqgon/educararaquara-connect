
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

// Tipos de usuário e permissões
export type UserRole = "super_admin" | "content_editor" | "viewer";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: string[];
}

// Mock de usuários administrativos
const adminUsers: AdminUser[] = [
  {
    id: "1",
    name: "Super Administrador",
    email: "admin@educ.araraquara.sp.gov.br",
    role: "super_admin",
    permissions: ["manage_all", "edit_all", "view_all"]
  },
  {
    id: "2",
    name: "Editor de Conteúdo",
    email: "editor@educ.araraquara.sp.gov.br",
    role: "content_editor",
    permissions: ["edit_content", "view_all"]
  },
  {
    id: "3",
    name: "Visualizador",
    email: "viewer@educ.araraquara.sp.gov.br",
    role: "viewer",
    permissions: ["view_all"]
  }
];

// Funções de autenticação melhoradas
export const isAuthenticated = (): boolean => {
  const authToken = localStorage.getItem("admin_auth_token");
  return !!authToken;
};

export const getCurrentUser = (): AdminUser | null => {
  const userEmail = localStorage.getItem("admin_user_email");
  if (!userEmail) return null;
  
  const user = adminUsers.find(user => user.email === userEmail);
  return user || null;
};

export const hasPermission = (permission: string): boolean => {
  const currentUser = getCurrentUser();
  if (!currentUser) return false;
  
  return currentUser.permissions.includes(permission) || 
         currentUser.role === "super_admin";
};

export const logout = () => {
  localStorage.removeItem("admin_auth_token");
  localStorage.removeItem("admin_user_email");
  localStorage.removeItem("admin_user_role");
};

interface AdminProtectedProps {
  children: React.ReactNode;
  requiredPermission?: string;
}

const AdminProtected: React.FC<AdminProtectedProps> = ({ 
  children, 
  requiredPermission 
}) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Verificação de autenticação
    const authenticated = isAuthenticated();
    
    if (!authenticated) {
      setIsAuthorized(false);
      return;
    }
    
    // Verificação de permissão, se necessário
    if (requiredPermission) {
      const hasRequiredPermission = hasPermission(requiredPermission);
      if (!hasRequiredPermission) {
        toast.error("Você não tem permissão para acessar esta área");
        setIsAuthorized(false);
        return;
      }
    }
    
    setIsAuthorized(true);
  }, [requiredPermission]);
  
  // Estado de carregamento inicial
  if (isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-education-light">
        <div className="text-education-primary">Verificando permissões...</div>
      </div>
    );
  }
  
  if (!isAuthorized) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

export default AdminProtected;
