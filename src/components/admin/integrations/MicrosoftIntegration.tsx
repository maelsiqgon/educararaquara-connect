
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const MicrosoftIntegration = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [syncEnabled, setSyncEnabled] = useState(false);
  const [channelsEnabled, setChannelsEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [meetingsEnabled, setMeetingsEnabled] = useState(false);
  
  const handleConnect = () => {
    // Simular conexão com o Azure AD
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: "Conectando ao Microsoft 365...",
        success: () => {
          setIsConnected(true);
          return "Conectado com sucesso ao Microsoft 365!";
        },
        error: "Erro ao conectar. Tente novamente.",
      }
    );
  };
  
  const handleDisconnect = () => {
    // Simular desconexão
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: "Desconectando...",
        success: () => {
          setIsConnected(false);
          setSyncEnabled(false);
          setChannelsEnabled(false);
          setNotificationsEnabled(false);
          setMeetingsEnabled(false);
          return "Desconectado do Microsoft 365";
        },
        error: "Erro ao desconectar. Tente novamente.",
      }
    );
  };

  return (
    <Card className="shadow-sm border-0">
      <CardHeader>
        <CardTitle className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="mr-2 fill-current text-[#00a4ef]">
            <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
          </svg>
          Microsoft 365 e Teams
        </CardTitle>
        <CardDescription>
          Integração com Microsoft 365 e Teams para login, sincronização e comunicação
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Status da conexão</h3>
            <p className="text-sm text-gray-500">
              {isConnected 
                ? "Conectado ao Microsoft 365" 
                : "Não conectado ao Microsoft 365"}
            </p>
          </div>
          {isConnected ? (
            <Button 
              variant="outline" 
              onClick={handleDisconnect}
              className="border-red-200 text-red-500 hover:bg-red-50"
            >
              Desconectar
            </Button>
          ) : (
            <Button 
              onClick={handleConnect}
              className="bg-[#2f2f2f] hover:bg-[#1f1f1f] text-white"
            >
              Conectar ao Microsoft 365
            </Button>
          )}
        </div>
        
        {isConnected && (
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-medium">Configurações da integração</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sync-toggle" className="font-medium">
                  Sincronização automática
                </Label>
                <p className="text-xs text-gray-500">
                  Sincronizar turmas e perfis com o Microsoft 365
                </p>
              </div>
              <Switch 
                id="sync-toggle" 
                checked={syncEnabled}
                onCheckedChange={setSyncEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="channels-toggle" className="font-medium">
                  Canais do Teams
                </Label>
                <p className="text-xs text-gray-500">
                  Criar canais no Teams automaticamente para cada turma
                </p>
              </div>
              <Switch 
                id="channels-toggle" 
                checked={channelsEnabled}
                onCheckedChange={setChannelsEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifications-toggle" className="font-medium">
                  Notificações integradas
                </Label>
                <p className="text-xs text-gray-500">
                  Enviar notificações do portal para o Teams
                </p>
              </div>
              <Switch 
                id="notifications-toggle" 
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="meetings-toggle" className="font-medium">
                  Suporte a reuniões
                </Label>
                <p className="text-xs text-gray-500">
                  Habilitar aulas e reuniões online via Teams
                </p>
              </div>
              <Switch 
                id="meetings-toggle" 
                checked={meetingsEnabled}
                onCheckedChange={setMeetingsEnabled}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MicrosoftIntegration;
