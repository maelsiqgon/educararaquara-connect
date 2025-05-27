
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
  const { user, loading, isSuperAdmin, refreshUserRoles } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  
  useEffect(() => {
    const checkAuthorization = async () => {
      console.log('AdminProtected check:', { 
        userEmail: user?.email, 
        loading, 
        hasChecked,
        isSuperAdmin: isSuperAdmin() 
      });
      
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
      
      // Refresh roles to ensure we have the latest data
      try {
        await refreshUserRoles();
      } catch (error) {
        console.error('Error refreshing user roles:', error);
      }
      
      // Small delay to ensure roles are loaded
      setTimeout(() => {
        // Check if user is super admin
        if (isSuperAdmin()) {
          console.log('User is super admin, granting access');
          setIsAuthorized(true);
          setHasChecked(true);
          return;
        }
        
        // Check specific permission if required
        if (requiredPermission) {
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
      }, 1000); // Give more time for roles to be fetched
    };
    
    checkAuthorization();
  }, [user, loading, requiredPermission, isSuperAdmin, hasChecked, refreshUserRoles]);
  
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
