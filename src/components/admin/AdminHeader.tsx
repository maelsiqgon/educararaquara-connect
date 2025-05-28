
import React from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
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
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <div className="flex flex-1 items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Painel Administrativo</h1>
        </div>
        <div className="flex gap-4 items-center">
          {user && (
            <div className="text-sm text-muted-foreground">
              <span>Logado como: </span>
              <span className="font-medium">{user.email}</span>
            </div>
          )}
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleLogout}
          >
            Sair
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            asChild
          >
            <a href="/">Voltar ao Portal</a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
