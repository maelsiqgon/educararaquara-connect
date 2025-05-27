
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
  const { user, loading, isSuperAdmin, refreshUserRoles, userRoles } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  
  useEffect(() => {
    const checkAuthorization = async () => {
      console.log('AdminProtected check started:', { 
        userEmail: user?.email, 
        loading, 
        userRolesLength: userRoles.length,
        isSuperAdmin: isSuperAdmin() 
      });
      
      if (loading) {
        return;
      }
      
      setIsChecking(true);
      
      // Check authentication
      if (!user) {
        console.log('No user, redirecting to login');
        setIsAuthorized(false);
        setIsChecking(false);
        return;
      }
      
      // Ensure we have fresh roles
      console.log('Refreshing user roles before authorization check...');
      try {
        await refreshUserRoles();
      } catch (error) {
        console.error('Error refreshing user roles:', error);
      }
      
      // Wait a moment for roles to be updated
      setTimeout(() => {
        const isSuper = isSuperAdmin();
        console.log('Final authorization check:', {
          isSuper,
          userRoles,
          userEmail: user.email,
          requiredPermission
        });
        
        if (isSuper) {
          console.log('User is super admin, granting access');
          setIsAuthorized(true);
        } else {
          console.log('User is not super admin, denying access');
          toast.error("Você não tem permissão para acessar esta área administrativa");
          setIsAuthorized(false);
        }
        
        setIsChecking(false);
      }, 1500); // Give more time for roles to be fetched and processed
    };
    
    checkAuthorization();
  }, [user, loading, requiredPermission, userRoles.length]);
  
  // Loading state
  if (loading || isChecking || isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-education-lightgray">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-education-primary mx-auto"></div>
          <p className="mt-4 text-education-gray">Verificando permissões...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthorized) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

export default AdminProtected;
