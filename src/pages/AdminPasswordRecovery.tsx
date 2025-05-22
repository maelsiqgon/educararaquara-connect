
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Schema para validação do formulário
const formSchema = z.object({
  email: z
    .string()
    .email("Digite um email válido")
    .endsWith("@educ.araraquara.sp.gov.br", {
      message: "O email deve ser um email oficial (@educ.araraquara.sp.gov.br)"
    })
});

const AdminPasswordRecovery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Mock de processo de recuperação de senha
    setTimeout(() => {
      toast.success(`Link de recuperação enviado para ${values.email}`);
      setEmailSent(true);
      setIsLoading(false);
    }, 1500);
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
            <CardTitle className="text-2xl text-center">Recuperação de Senha</CardTitle>
            <CardDescription className="text-center">
              {!emailSent 
                ? "Digite seu email para recuperar sua senha"
                : "Verifique sua caixa de entrada para redefinir sua senha"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!emailSent ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="admin@educ.araraquara.sp.gov.br"
                            {...field}
                            className="bg-white focus-visible:ring-education-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-education-primary hover:bg-education-dark"
                    disabled={isLoading}
                  >
                    {isLoading ? "Enviando..." : "Enviar link de recuperação"}
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="space-y-4 text-center">
                <div className="p-4 bg-green-50 text-green-700 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mx-auto mb-2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <p>Email enviado com sucesso!</p>
                </div>
                <p>Siga as instruções no email enviado para redefinir sua senha.</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/admin/login")}
              className="text-education-primary hover:text-education-dark hover:bg-education-light"
            >
              Voltar para o Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminPasswordRecovery;
