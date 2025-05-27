
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Upload, Search, RefreshCcw } from "lucide-react";
import { useMediaLibrary, MediaFile } from "@/hooks/useMediaLibrary";

interface MediaSelectorProps {
  media: MediaFile[];
  loading: boolean;
  onSelect: (url: string, altText: string) => void;
  onClose: () => void;
  onRefresh: () => Promise<void>;
}

const MediaSelector: React.FC<MediaSelectorProps> = ({
  media,
  loading,
  onSelect,
  onClose,
  onRefresh
}) => {
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null);
  const [altText, setAltText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [uploading, setUploading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { uploadFile } = useMediaLibrary();

  const filteredMedia = media.filter(
    (item) =>
      item.original_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.alt_text && item.alt_text.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setUploading(true);
    
    try {
      const uploadedMedia = await uploadFile(file);
      if (uploadedMedia) {
        setSelectedMedia(uploadedMedia);
        setAltText(uploadedMedia.alt_text || "");
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Selecionar Mídia</DialogTitle>
        </DialogHeader>

        <div className="flex justify-between items-center mb-4">
          <div className="relative flex-1 mr-2">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar mídias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              {refreshing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCcw className="h-4 w-4" />
              )}
            </Button>
            <Button variant="outline" className="relative">
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileUpload}
                accept="image/*"
              />
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? "Nenhuma mídia encontrada" : "Nenhuma mídia disponível"}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className={`border rounded-md overflow-hidden cursor-pointer transition-all ${
                    selectedMedia?.id === item.id
                      ? "ring-2 ring-primary ring-offset-2"
                      : "hover:border-gray-400"
                  }`}
                  onClick={() => {
                    setSelectedMedia(item);
                    setAltText(item.alt_text || "");
                  }}
                >
                  {item.mime_type?.startsWith("image/") ? (
                    <div className="aspect-square bg-gray-100 relative">
                      <img
                        src={item.file_path}
                        alt={item.alt_text || item.original_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                      <div className="text-4xl text-gray-400">📄</div>
                    </div>
                  )}
                  <div className="p-2 text-xs truncate" title={item.original_name}>
                    {item.original_name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4">
          <Input
            placeholder="Texto alternativo da imagem"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            disabled={!selectedMedia}
            className="mb-4"
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={() => selectedMedia && onSelect(selectedMedia.file_path, altText)}
            disabled={!selectedMedia || uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Inserir Mídia"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MediaSelector;
