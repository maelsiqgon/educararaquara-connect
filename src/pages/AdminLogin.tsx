
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { AdminUser } from "@/components/AdminProtected";

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
        
        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Login Administrativo</CardTitle>
            <CardDescription className="text-center">
              Entre com suas credenciais para acessar o painel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@educ.araraquara.sp.gov.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white focus-visible:ring-education-primary"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link to="/admin/recuperar-senha" className="text-sm font-medium text-education-primary hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white focus-visible:ring-education-primary"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-education-primary hover:bg-education-dark"
                disabled={isLoading}
              >
                {isLoading ? "Autenticando..." : "Entrar"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="text-education-primary hover:text-education-dark hover:bg-education-light"
            >
              Voltar para o Portal
            </Button>
          </CardFooter>
        </Card>
        
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
