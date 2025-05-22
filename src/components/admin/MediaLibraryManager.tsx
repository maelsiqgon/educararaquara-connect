
import React from 'react';
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import ImageUploader from "./ImageUploader";
import { mockImages } from './mockData';

const MediaLibraryManager = () => {
  return (
    <Card className="border-0 shadow-soft">
      <CardHeader className="bg-education-light rounded-t-lg">
        <CardTitle className="text-education-primary">Biblioteca de Mídias</CardTitle>
        <CardDescription>
          Gerencie todas as imagens e arquivos do portal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Upload de Nova Mídia</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUploader 
              placeholderText="Arraste uma imagem ou clique para selecionar"
            />
            <div className="space-y-4">
              <div>
                <Label htmlFor="media-title">Título</Label>
                <Input
                  id="media-title"
                  placeholder="Digite um título para a mídia"
                  className="border-gray-300 focus-visible:ring-education-primary mt-1"
                />
              </div>
              <div>
                <Label htmlFor="media-alt">Descrição (texto alternativo)</Label>
                <Input
                  id="media-alt"
                  placeholder="Descreva a imagem para acessibilidade"
                  className="border-gray-300 focus-visible:ring-education-primary mt-1"
                />
              </div>
              <Button className="w-full bg-education-primary hover:bg-education-dark">
                Adicionar à Biblioteca
              </Button>
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Mídias Existentes</h3>
            <div className="relative w-64">
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
                className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <Input
                placeholder="Buscar mídia..."
                className="pl-10"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockImages.map((image) => (
              <div key={image.id} className="border rounded-md overflow-hidden">
                <div className="aspect-square relative bg-gray-100">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                    <div className="flex gap-1">
                      <Button size="sm" variant="secondary">
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
                        >
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                        </svg>
                      </Button>
                      <Button size="sm" variant="destructive">
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
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <p className="text-sm font-medium truncate">{image.title}</p>
                  <p className="text-xs text-gray-500">{image.uploadedAt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-gray-500">
          Exibindo 6 de 24 itens
        </div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled>
            Anterior
          </Button>
          <Button variant="outline" size="sm">
            Próximo
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MediaLibraryManager;
