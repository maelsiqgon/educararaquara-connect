
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  initialImage?: string;
  onImageChange?: (imageDataUrl: string | null) => void;
  allowDelete?: boolean;
  placeholderText?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  initialImage,
  onImageChange,
  allowDelete = true,
  placeholderText = "Carregar imagem"
}) => {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Verificar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione um arquivo de imagem válido.');
      return;
    }

    // Verificar tamanho do arquivo (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('A imagem deve ter menos de 5MB.');
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      // Simulando um breve atraso para mostrar o estado de upload
      setTimeout(() => {
        const result = reader.result as string;
        setImage(result);
        if (onImageChange) {
          onImageChange(result);
        }
        setIsUploading(false);
        toast.success('Imagem carregada com sucesso!');
      }, 1000);
    };

    reader.onerror = () => {
      toast.error('Erro ao carregar a imagem.');
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (onImageChange) {
      onImageChange(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('Imagem removida.');
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="image-upload" className="text-sm font-medium">
          Imagem
        </Label>
        {image && allowDelete && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRemoveImage}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <X className="mr-1 h-4 w-4" /> Remover
          </Button>
        )}
      </div>

      <Input
        ref={fileInputRef}
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      {image ? (
        <div className="border rounded-md overflow-hidden">
          <img
            src={image}
            alt="Imagem carregada"
            className="max-h-64 w-full object-contain bg-gray-50"
          />
        </div>
      ) : (
        <div 
          className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={handleButtonClick}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="rounded-full bg-gray-100 p-3">
              <ImageIcon className="h-6 w-6 text-gray-400" />
            </div>
            <div className="text-sm text-gray-600">
              {placeholderText}
            </div>
            <div className="text-xs text-gray-400">
              PNG, JPG ou GIF (máx. 5MB)
            </div>
          </div>
        </div>
      )}

      {!image && (
        <Button
          type="button"
          variant="outline"
          onClick={handleButtonClick}
          disabled={isUploading}
          className="w-full"
        >
          {isUploading ? (
            <>Carregando...</>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" /> Selecionar arquivo
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default ImageUploader;
