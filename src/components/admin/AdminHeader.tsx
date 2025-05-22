
import React from 'react';
import { Button } from "@/components/ui/button";
import { getCurrentUser, logout } from "@/components/AdminProtected";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const currentUser = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <header className="bg-education-primary text-white py-4 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Painel Administrativo</h1>
          <div className="flex gap-4 items-center">
            {currentUser && (
              <div className="text-sm text-white mr-4">
                <span className="opacity-80">Logado como: </span>
                <span className="font-medium">{currentUser.name}</span>
                <span className="ml-2 bg-white/20 px-2 py-1 rounded text-xs">
                  {currentUser.role === "super_admin" 
                    ? "Super Admin" 
                    : currentUser.role === "content_editor"
                      ? "Editor de Conteúdo"
                      : "Visualizador"}
                </span>
              </div>
            )}
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              onClick={handleLogout}
            >
              Sair
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <a href="/">Voltar ao Portal</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
