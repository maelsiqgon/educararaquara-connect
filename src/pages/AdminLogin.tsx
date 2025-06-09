
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import AuthForm from "@/components/admin/auth/AuthForm";

const AdminLogin = () => {
  const [email, setEmail] = useState("admin@araraquara.sp.gov.br");
  const [password, setPassword] = useState("admin123456");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, user, profile, loading, isSuperAdmin } = useAuth();

  useEffect(() => {
    if (!loading && user && profile && isSuperAdmin()) {
      console.log('✅ User already logged in as admin, redirecting');
      navigate("/admin", { replace: true });
    }
  }, [user, profile, loading, isSuperAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('🔑 Admin login attempt:', email);
      const { error } = await signIn(email, password);
      
      if (error) {
        console.error('❌ Login error:', error);
        toast.error("Credenciais inválidas. Verifique email e senha.");
      } else {
        console.log('✅ Login successful');
        toast.success("Login realizado com sucesso!");
      }
    } catch (error) {
      console.error('❌ Login error:', error);
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
          <p>Para acessar, use as credenciais:</p>
          <p><strong>Email:</strong> admin@araraquara.sp.gov.br</p>
          <p><strong>Senha:</strong> admin123456</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
