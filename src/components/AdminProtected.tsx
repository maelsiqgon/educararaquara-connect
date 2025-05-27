
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
  const { user, loading, isSuperAdmin, userRoles } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  
  useEffect(() => {
    const checkAuthorization = () => {
      console.log('🛡️ AdminProtected simple check:', { 
        userEmail: user?.email,
        userId: user?.id, 
        loading, 
        userRolesLength: userRoles.length,
        userRoles: userRoles,
        isSuperAdminResult: isSuperAdmin()
      });
      
      if (loading) {
        console.log('⏳ Still loading auth state...');
        return;
      }
      
      if (!user) {
        console.log('❌ No user found, denying access');
        setIsAuthorized(false);
        return;
      }
      
      // Simple check: is the user a super admin?
      const isSuper = isSuperAdmin();
      console.log('🔍 Simple super admin check result:', isSuper);
      
      if (isSuper) {
        console.log('✅ User is super admin, granting access');
        setIsAuthorized(true);
      } else {
        console.log('❌ User is not super admin, denying access');
        console.log('🔍 Available roles:', userRoles);
        toast.error("Você não tem permissão para acessar esta área administrativa");
        setIsAuthorized(false);
      }
    };
    
    checkAuthorization();
  }, [user, loading, isSuperAdmin, userRoles]);
  
  // Loading state
  if (loading || isAuthorized === null) {
    console.log('⏳ Showing loading state');
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
    console.log('❌ Not authorized, redirecting to login');
    return <Navigate to="/admin/login" replace />;
  }
  
  console.log('✅ Access granted, rendering children');
  return <>{children}</>;
};

export default AdminProtected;
