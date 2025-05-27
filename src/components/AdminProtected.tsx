
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
  const [hasChecked, setHasChecked] = useState(false);
  
  useEffect(() => {
    console.log('AdminProtected check:', { user: user?.email, loading, isSuperAdmin: isSuperAdmin() });
    
    if (loading) {
      return;
    }
    
    // Avoid multiple checks
    if (hasChecked) {
      return;
    }
    
    // Check authentication
    if (!user) {
      console.log('No user, redirecting to login');
      setIsAuthorized(false);
      setHasChecked(true);
      return;
    }
    
    // Check if user is super admin (bypass all permission checks)
    if (isSuperAdmin()) {
      console.log('User is super admin, granting access');
      setIsAuthorized(true);
      setHasChecked(true);
      return;
    }
    
    // Check specific permission if required
    if (requiredPermission) {
      // For now, only super admins can access admin features
      // This can be expanded later with more granular permissions
      console.log('Required permission but user is not super admin');
      toast.error("Você não tem permissão para acessar esta área");
      setIsAuthorized(false);
      setHasChecked(true);
      return;
    }
    
    // Default to requiring super admin for any admin access
    console.log('Default permission check - requiring super admin');
    toast.error("Você não tem permissão para acessar esta área administrativa");
    setIsAuthorized(false);
    setHasChecked(true);
  }, [user, loading, requiredPermission, isSuperAdmin, hasChecked]);
  
  // Loading state
  if (loading || isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-education-lightgray">
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
