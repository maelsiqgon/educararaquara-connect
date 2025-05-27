
import React from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <header className="bg-education-primary text-white py-4 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Painel Administrativo</h1>
          <div className="flex gap-4 items-center">
            {user && (
              <div className="text-sm text-white mr-4">
                <span className="opacity-80">Logado como: </span>
                <span className="font-medium">{user.email}</span>
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
