
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Login simulado",
      description: "Em um ambiente de produção, você seria redirecionado para o Microsoft Azure AD.",
    });
  };

  const handleRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Recuperação de senha",
      description: `Um link de recuperação foi enviado para ${recoveryEmail}`,
    });
    setRecoveryEmail("");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="border-t-4 border-t-education-primary">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-education-primary rounded-full mx-auto flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 8V7a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <path d="M10 8H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="16" cy="15" r="5"></circle>
                    <path d="M22 22a1.5 1.5 0 0 0-3 0"></path>
                    <path d="M13 22a1.5 1.5 0 0 0-3 0"></path>
                  </svg>
                </div>
                <CardTitle className="text-2xl">Portal EducAraraquara</CardTitle>
                <CardDescription>Acesse sua conta para continuar</CardDescription>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="recovery">Recuperar Senha</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          E-mail institucional
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="seu.email@educararaquara.sp.gov.br"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label htmlFor="password" className="text-sm font-medium">
                            Senha
                          </label>
                        </div>
                        <Input
                          id="password"
                          type="password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="Digite sua senha"
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        Entrar
                      </Button>
                    </form>

                    <div className="mt-4">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-white px-2 text-muted-foreground">
                            Ou continue com
                          </span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Button
                          variant="outline"
                          className="w-full border-2 flex items-center justify-center gap-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                          </svg>
                          Microsoft 365
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="recovery">
                    <form onSubmit={handleRecovery} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="recovery-email" className="text-sm font-medium">
                          E-mail institucional
                        </label>
                        <Input
                          id="recovery-email"
                          type="email"
                          value={recoveryEmail}
                          onChange={(e) => setRecoveryEmail(e.target.value)}
                          placeholder="seu.email@educararaquara.sp.gov.br"
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        Recuperar Senha
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4 pt-0">
                <div className="text-center text-sm text-gray-500">
                  <p>
                    Problemas para acessar?{" "}
                    <Link to="/contato" className="text-education-primary hover:underline">
                      Entre em contato
                    </Link>
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
