
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFileUpload } from '@/hooks/useFileUpload';
import { Upload, X, Loader2, Image as ImageIcon, FileText } from 'lucide-react';

interface FileUploadProps {
  bucket: string;
  folder?: string;
  allowedTypes?: string[];
  maxSize?: number;
  onUploadSuccess?: (result: { url: string; path: string }) => void;
  onUploadError?: (error: string) => void;
  accept?: string;
  label?: string;
  description?: string;
  initialPreview?: string;
  allowDelete?: boolean;
}

const FileUploadComponent: React.FC<FileUploadProps> = ({
  bucket,
  folder,
  allowedTypes = ['image/*'],
  maxSize = 5,
  onUploadSuccess,
  onUploadError,
  accept = 'image/*',
  label = 'Arquivo',
  description = 'Selecione um arquivo',
  initialPreview,
  allowDelete = true
}) => {
  const [preview, setPreview] = useState<string | null>(initialPreview || null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFile, deleteFile, isUploading } = useFileUpload();

  const handleFileSelect = async (file: File) => {
    try {
      const result = await uploadFile(file, bucket, folder);
      
      if (result) {
        setPreview(result.url);
        onUploadSuccess?.(result);
      } else {
        onUploadError?.('Erro ao fazer upload do arquivo');
      }
    } catch (error) {
      console.error('File upload error:', error);
      onUploadError?.('Erro ao fazer upload do arquivo');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemoveFile = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onUploadSuccess?.({ url: '', path: '' });
  };

  const isImage = accept.includes('image');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        {preview && allowDelete && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRemoveFile}
            className="text-red-500 hover:text-red-700"
          >
            <X className="mr-1 h-4 w-4" /> Remover
          </Button>
        )}
      </div>

      <Input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        disabled={isUploading}
      />

      {preview ? (
        <div className="border rounded-md overflow-hidden">
          {isImage ? (
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 w-full object-contain bg-gray-50"
            />
          ) : (
            <div className="p-4 flex items-center space-x-2">
              <FileText className="h-8 w-8 text-gray-400" />
              <span className="text-sm text-gray-600">Arquivo carregado</span>
            </div>
          )}
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
            dragOver
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 hover:bg-gray-50'
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="rounded-full bg-gray-100 p-3">
              {isImage ? (
                <ImageIcon className="h-6 w-6 text-gray-400" />
              ) : (
                <FileText className="h-6 w-6 text-gray-400" />
              )}
            </div>
            <div className="text-sm text-gray-600">{description}</div>
            <div className="text-xs text-gray-400">
              Arraste e solte ou clique para selecionar (máx. {maxSize}MB)
            </div>
          </div>
        </div>
      )}

      {!preview && (
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Selecionar arquivo
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default FileUploadComponent;
