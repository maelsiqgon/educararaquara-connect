
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

const AdminWelcome = () => {
  const { user, isSuperAdmin } = useAuth();

  return (
    <Card className="mb-8 border-0 shadow-soft">
      <CardHeader className="bg-education-light rounded-t-lg">
        <CardTitle className="text-education-primary text-xl">Bem-vindo ao Painel Administrativo</CardTitle>
        <CardDescription>
          Gerenciamento de conteúdo do Portal EducAraraquara
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {user && (
          <div className="mb-4 p-4 bg-education-light/50 rounded-lg">
            <h3 className="font-medium text-education-primary mb-2">Suas Permissões:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-600"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>{isSuperAdmin() ? "Super Administrador" : "Usuário"}</span>
              </div>
            </div>
          </div>
        )}
        <p className="text-education-gray">
          Neste painel, você pode gerenciar as seções, notícias e outros elementos da página inicial.
          Utilize as abas abaixo para navegar entre as diferentes opções de gerenciamento.
        </p>
      </CardContent>
    </Card>
  );
};

export default AdminWelcome;
