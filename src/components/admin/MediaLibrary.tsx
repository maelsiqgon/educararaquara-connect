
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Upload, Image as ImageIcon } from "lucide-react";
import ImageUploader from "./ImageUploader";
import { toast } from "sonner";

// Mock de imagens para a biblioteca
const mockImages = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    title: "Laptop computer",
    type: "image/jpeg",
    uploadedAt: "2025-05-10",
    size: "345 KB"
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    title: "Programming",
    type: "image/jpeg",
    uploadedAt: "2025-05-12",
    size: "512 KB"
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    title: "Woman using laptop",
    type: "image/jpeg",
    uploadedAt: "2025-05-15",
    size: "723 KB"
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    title: "Code on screen",
    type: "image/jpeg",
    uploadedAt: "2025-05-18",
    size: "489 KB"
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    title: "Colorful code",
    type: "image/jpeg",
    uploadedAt: "2025-05-20",
    size: "634 KB"
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    title: "Video screens",
    type: "image/jpeg",
    uploadedAt: "2025-05-21",
    size: "528 KB"
  }
];

interface MediaLibraryProps {
  onSelect?: (imageUrl: string) => void;
  buttonLabel?: string;
}

const MediaLibrary: React.FC<MediaLibraryProps> = ({
  onSelect,
  buttonLabel = "Selecionar imagem"
}) => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState(mockImages);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [newUploadedImage, setNewUploadedImage] = useState<string | null>(null);

  const filteredImages = images.filter(
    img => img.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleConfirmSelection = () => {
    if (selectedImage && onSelect) {
      onSelect(selectedImage);
      setOpen(false);
      toast.success("Imagem selecionada com sucesso!");
    }
  };

  const handleAddNewImage = () => {
    if (newUploadedImage) {
      // Criar um novo item de imagem
      const newImage = {
        id: String(images.length + 1),
        url: newUploadedImage,
        title: "Nova imagem",
        type: "image/jpeg",
        uploadedAt: new Date().toISOString().slice(0, 10),
        size: "0 KB"
      };

      // Adicionar à biblioteca
      setImages([newImage, ...images]);
      setNewUploadedImage(null);
      toast.success("Imagem adicionada à biblioteca!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <ImageIcon className="mr-2 h-4 w-4" />
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Biblioteca de Mídias</DialogTitle>
          <DialogDescription>
            Selecione uma imagem da biblioteca ou faça upload de uma nova.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="biblioteca" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="mx-auto">
            <TabsTrigger value="biblioteca">Biblioteca</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="biblioteca" className="flex-1 overflow-hidden flex flex-col">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar imagens..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="overflow-y-auto flex-1 pb-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredImages.map((image) => (
                  <div
                    key={image.id}
                    className={`border rounded-md overflow-hidden cursor-pointer transition-all ${
                      selectedImage === image.url ? "ring-2 ring-education-primary" : ""
                    }`}
                    onClick={() => handleSelectImage(image.url)}
                  >
                    <div className="aspect-square relative bg-gray-100">
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2 bg-white">
                      <p className="text-sm font-medium truncate">{image.title}</p>
                      <p className="text-xs text-gray-500">{image.uploadedAt}</p>
                    </div>
                  </div>
                ))}
              </div>

              {filteredImages.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-gray-500">Nenhuma imagem encontrada.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="upload" className="flex-1 overflow-auto">
            <div className="px-4">
              <ImageUploader 
                initialImage={newUploadedImage || undefined}
                onImageChange={(imageDataUrl) => setNewUploadedImage(imageDataUrl)}
                placeholderText="Solte sua imagem aqui ou clique para selecionar"
              />
              
              <div className="mt-4">
                <Button
                  className="w-full bg-education-primary hover:bg-education-dark"
                  disabled={!newUploadedImage}
                  onClick={handleAddNewImage}
                >
                  <Upload className="mr-2 h-4 w-4" /> Adicionar à biblioteca
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="border-t pt-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmSelection}
            disabled={!selectedImage}
            className="bg-education-primary hover:bg-education-dark"
          >
            Selecionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MediaLibrary;
