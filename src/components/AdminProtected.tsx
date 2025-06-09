
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface AdminProtectedProps {
  children: React.ReactNode;
}

const AdminProtected: React.FC<AdminProtectedProps> = ({ children }) => {
  const { user, profile, loading, isSuperAdmin, isAdmin } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  
  useEffect(() => {
    const checkAuthorization = () => {
      console.log('🛡️ AdminProtected checking authorization:', { 
        userEmail: user?.email,
        userId: user?.id, 
        loading,
        profile,
        isSuperAdminResult: isSuperAdmin(),
        isAdminResult: isAdmin()
      });
      
      if (loading) {
        console.log('⏳ Still loading auth state...');
        return;
      }
      
      if (!user || !profile) {
        console.log('❌ No user or profile found, denying access');
        setIsAuthorized(false);
        return;
      }
      
      const hasAccess = isSuperAdmin() || isAdmin();
      console.log('🔍 Access check result:', hasAccess);
      
      if (hasAccess) {
        console.log('✅ User has admin access, granting access');
        setIsAuthorized(true);
      } else {
        console.log('❌ User does not have admin access, denying access');
        toast.error("Você não tem permissão para acessar esta área administrativa");
        setIsAuthorized(false);
      }
    };
    
    checkAuthorization();
  }, [user, profile, loading, isSuperAdmin, isAdmin]);
  
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
