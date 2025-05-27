
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface AdminProtectedProps {
  children: React.ReactNode;
  requiredPermission?: string;
}

const AdminProtected: React.FC<AdminProtectedProps> = ({ 
  children, 
  requiredPermission 
}) => {
  const { user, loading, isSuperAdmin } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  
  useEffect(() => {
    console.log('AdminProtected check:', { user: user?.email, loading, isSuperAdmin: isSuperAdmin() });
    
    if (loading) {
      return;
    }
    
    // Check authentication
    if (!user) {
      console.log('No user, redirecting to login');
      setIsAuthorized(false);
      return;
    }
    
    // Check if user is super admin (bypass all permission checks)
    if (isSuperAdmin()) {
      console.log('User is super admin, granting access');
      setIsAuthorized(true);
      return;
    }
    
    // Check specific permission if required
    if (requiredPermission) {
      // For now, only super admins can access admin features
      // This can be expanded later with more granular permissions
      console.log('Required permission but user is not super admin');
      toast.error("Você não tem permissão para acessar esta área");
      setIsAuthorized(false);
      return;
    }
    
    // Default to requiring super admin for any admin access
    console.log('Default permission check - requiring super admin');
    toast.error("Você não tem permissão para acessar esta área administrativa");
    setIsAuthorized(false);
  }, [user, loading, requiredPermission, isSuperAdmin]);
  
  // Loading state
  if (loading || isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-education-light">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-education-primary"></div>
      </div>
    );
  }
  
  if (!isAuthorized) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

export default AdminProtected;
