
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthForm from "@/components/admin/auth/AuthForm";

// Mock de credenciais válidas para login administrativo
const validCredentials = [
  {
    email: "admin@educ.araraquara.sp.gov.br",
    password: "admin123",
    role: "super_admin"
  },
  {
    email: "editor@educ.araraquara.sp.gov.br",
    password: "editor123",
    role: "content_editor"
  },
  {
    email: "viewer@educ.araraquara.sp.gov.br",
    password: "viewer123",
    role: "viewer"
  }
];

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock login process
    setTimeout(() => {
      // Verificar credenciais
      const credential = validCredentials.find(
        cred => cred.email === email && cred.password === password
      );
      
      if (credential) {
        // Salvar dados de autenticação no localStorage
        localStorage.setItem("admin_auth_token", "mock-jwt-token-" + Date.now());
        localStorage.setItem("admin_user_email", credential.email);
        localStorage.setItem("admin_user_role", credential.role);
        
        toast.success("Login bem-sucedido como " + credential.role.replace('_', ' '));
        navigate("/admin");
      } else {
        toast.error("Credenciais inválidas. Tente novamente.");
      }
      setIsLoading(false);
    }, 1000);
  };
  
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
          <p>Para fins de demonstração, use:</p>
          <p>Super Admin: admin@educ.araraquara.sp.gov.br / admin123</p>
          <p>Editor: editor@educ.araraquara.sp.gov.br / editor123</p>
          <p>Visualizador: viewer@educ.araraquara.sp.gov.br / viewer123</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
