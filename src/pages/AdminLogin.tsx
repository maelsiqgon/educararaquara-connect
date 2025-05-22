
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

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
      // For demo purposes - in a real app, validate credentials against a backend
      if (email === "admin@educ.araraquara.sp.gov.br" && password === "admin123") {
        // Set mock auth token
        localStorage.setItem("admin_auth_token", "demo-token-123");
        toast.success("Login bem-sucedido!");
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
                  <a href="#" className="text-sm font-medium text-education-primary hover:underline">
                    Esqueceu a senha?
                  </a>
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
          <p>Nota: Para fins de demonstração, use:</p>
          <p>Email: admin@educ.araraquara.sp.gov.br</p>
          <p>Senha: admin123</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
