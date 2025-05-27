
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import AuthForm from "@/components/admin/auth/AuthForm";
import CreateAdminButton from "@/components/admin/CreateAdminButton";

const AdminLogin = () => {
  const [email, setEmail] = useState("admin@araraquara.sp.gov.br");
  const [password, setPassword] = useState("admin123456");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, user, loading, isSuperAdmin, refreshUserRoles, userRoles } = useAuth();

  // Check admin access and redirect
  useEffect(() => {
    if (!loading && user) {
      console.log('User already logged in, checking super admin status...', {
        userEmail: user.email,
        userRoles,
        isSuperAdmin: isSuperAdmin()
      });
      
      // Refresh roles and check after a delay
      const checkAdminAccess = async () => {
        try {
          await refreshUserRoles();
          
          setTimeout(() => {
            const isSuper = isSuperAdmin();
            console.log('Admin access check result:', {
              isSuper,
              userRoles,
              userEmail: user.email
            });
            
            if (isSuper) {
              console.log('User is super admin, redirecting to admin');
              navigate("/admin", { replace: true });
            } else {
              console.log('User is not super admin, staying on login page');
              toast.error("Você não tem permissão para acessar a área administrativa");
            }
          }, 1000);
        } catch (error) {
          console.error('Error checking admin access:', error);
        }
      };
      
      checkAdminAccess();
    }
  }, [user, loading, navigate, isSuperAdmin, refreshUserRoles]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Admin login attempt:', email);
      const { error } = await signIn(email, password);
      
      if (error) {
        console.error('Login error:', error);
        toast.error("Credenciais inválidas. Verifique email e senha.");
      } else {
        console.log('Login successful, waiting for role verification...');
        toast.success("Login realizado com sucesso!");
        
        // Wait for roles to be fetched and then redirect
        setTimeout(async () => {
          try {
            await refreshUserRoles();
            
            setTimeout(() => {
              const isSuper = isSuperAdmin();
              console.log('Post-login admin check:', {
                isSuper,
                userRoles,
                userEmail: user?.email
              });
              
              if (isSuper) {
                navigate("/admin", { replace: true });
              } else {
                toast.error("Você não tem permissão para acessar a área administrativa");
              }
            }, 1000);
          } catch (error) {
            console.error('Error in post-login check:', error);
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Erro ao fazer login. Tente novamente.");
    }
    
    setIsLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-education-lightgray">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-education-primary mx-auto"></div>
          <p className="mt-4 text-education-gray">Carregando...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-education-lightgray py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-education-primary">EducAraraquara</h1>
          <p className="mt-2 text-education-gray">Área Administrativa</p>
        </div>
        
        <div className="text-center">
          <CreateAdminButton />
        </div>
        
        <AuthForm
          title="Login Administrativo"
          description="Entre com suas credenciais para acessar o painel"
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
        
        <div className="text-center text-xs text-gray-500">
          <p>Para testar, use o usuário administrador padrão:</p>
          <p><strong>Email:</strong> admin@araraquara.sp.gov.br</p>
          <p><strong>Senha:</strong> admin123456</p>
          <p className="mt-2 text-amber-600">
            <strong>Clique no botão "Criar Usuário Admin" acima se for o primeiro acesso!</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
