
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { user, signIn, signUp, resetPassword } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (activeTab === "login") {
      if (!email.trim()) newErrors.email = "Email é obrigatório";
      if (!password) newErrors.password = "Senha é obrigatória";
    } else if (activeTab === "register") {
      if (!name.trim()) newErrors.name = "Nome é obrigatório";
      if (!email.trim()) newErrors.email = "Email é obrigatório";
      else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Email inválido";
      if (!password) newErrors.password = "Senha é obrigatória";
      else if (password.length < 6) newErrors.password = "Senha deve ter no mínimo 6 caracteres";
      if (password !== confirmPassword) newErrors.confirmPassword = "As senhas não coincidem";
    } else if (showResetForm) {
      if (!resetEmail.trim()) newErrors.resetEmail = "Email é obrigatório";
      else if (!/^\S+@\S+\.\S+$/.test(resetEmail)) newErrors.resetEmail = "Email inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      if (showResetForm) {
        await handleResetPassword();
      } else if (activeTab === "login") {
        await handleSignIn();
      } else {
        await handleSignUp();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    const { error } = await signIn(email, password);
    if (error) {
      setErrors({ form: error.message });
    } else {
      navigate("/");
    }
  };

  const handleSignUp = async () => {
    const { error } = await signUp(email, password, name);
    if (error) {
      setErrors({ form: error.message });
    } else {
      setActiveTab("login");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setName("");
    }
  };

  const handleResetPassword = async () => {
    const { error } = await resetPassword(resetEmail);
    if (error) {
      setErrors({ resetEmail: error.message });
    } else {
      setShowResetForm(false);
      setResetEmail("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-education-primary">
            Portal da Educação
          </h1>
          <p className="mt-2 text-gray-600">
            Acesso ao sistema administrativo
          </p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              {showResetForm ? "Recuperar Senha" : "Acesso ao Sistema"}
            </CardTitle>
            <CardDescription>
              {showResetForm
                ? "Informe seu email para receber instruções de recuperação de senha."
                : "Entre com suas credenciais para acessar o sistema."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {showResetForm ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="resetEmail">Email</Label>
                  <Input
                    id="resetEmail"
                    type="email"
                    placeholder="seu@email.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                  />
                  {errors.resetEmail && (
                    <p className="text-xs text-red-500">{errors.resetEmail}</p>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowResetForm(false);
                      setErrors({});
                    }}
                  >
                    Voltar
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar Instruções"
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Cadastro</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Senha</Label>
                        <button
                          type="button"
                          className="text-xs text-education-primary hover:underline"
                          onClick={() => {
                            setShowResetForm(true);
                            setErrors({});
                          }}
                        >
                          Esqueceu a senha?
                        </button>
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-700"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-xs text-red-500">{errors.password}</p>
                      )}
                    </div>

                    {errors.form && (
                      <div className="bg-red-50 text-red-800 p-3 rounded-md text-sm">
                        {errors.form}
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-education-primary hover:bg-education-dark"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Entrando...
                        </>
                      ) : (
                        "Entrar"
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Seu Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="registerEmail">Email</Label>
                      <Input
                        id="registerEmail"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="registerPassword">Senha</Label>
                      <div className="relative">
                        <Input
                          id="registerPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-700"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-xs text-red-500">{errors.password}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      {errors.confirmPassword && (
                        <p className="text-xs text-red-500">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>

                    {errors.form && (
                      <div className="bg-red-50 text-red-800 p-3 rounded-md text-sm">
                        {errors.form}
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-education-primary hover:bg-education-dark"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Cadastrando...
                        </>
                      ) : (
                        "Cadastrar"
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
