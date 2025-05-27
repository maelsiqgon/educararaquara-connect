
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { checkIsSuperAdminRPC } from "@/hooks/auth/userRoleService";

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
      console.log('🛡️ AdminProtected authorization check started:', { 
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
      
      setIsChecking(true);
      
      // Check authentication
      if (!user) {
        console.log('❌ No user found, redirecting to login');
        setIsAuthorized(false);
        setIsChecking(false);
        return;
      }
      
      console.log('👤 User found, checking admin access...');
      
      try {
        // Check current isSuperAdmin status first
        const currentSuperAdminStatus = isSuperAdmin();
        console.log('🔍 Current super admin status from context:', currentSuperAdminStatus);
        
        if (currentSuperAdminStatus) {
          console.log('✅ User is super admin via context, granting access');
          setIsAuthorized(true);
          setIsChecking(false);
          return;
        }
        
        // Try RPC function as backup
        console.log('🔍 Checking super admin via RPC...');
        const isSuperViaRPC = await checkIsSuperAdminRPC(user.id);
        
        if (isSuperViaRPC) {
          console.log('✅ User is super admin via RPC, granting access');
          setIsAuthorized(true);
          setIsChecking(false);
          return;
        }
        
        // Final fallback: refresh roles and check again
        console.log('🔄 Both checks failed, refreshing roles...');
        const refreshedRoles = await refreshUserRoles();
        console.log('✅ Roles refreshed:', refreshedRoles);
        
        // Check super admin status with refreshed roles
        const isSuper = refreshedRoles.some(role => role.role === 'super_admin');
        console.log('🔍 Super admin check with refreshed roles:', {
          isSuper,
          refreshedRoles,
          userEmail: user.email,
          requiredPermission
        });
        
        if (isSuper) {
          console.log('✅ User is super admin after refresh, granting access');
          setIsAuthorized(true);
        } else {
          console.log('❌ User is not super admin, denying access');
          console.log('🔍 Final debug info:', {
            userRoles: refreshedRoles,
            rolesLength: refreshedRoles.length,
            rolesData: refreshedRoles.map(r => ({ role: r.role, active: r.active }))
          });
          toast.error("Você não tem permissão para acessar esta área administrativa");
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error('❌ Error during authorization check:', error);
        setIsAuthorized(false);
      }
      
      setIsChecking(false);
    };
    
    checkAuthorization();
  }, [user, loading, requiredPermission, refreshUserRoles, isSuperAdmin, userRoles]);
  
  // Loading state
  if (loading || isChecking || isAuthorized === null) {
    console.log('⏳ Showing loading state, details:', { loading, isChecking, isAuthorized });
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
