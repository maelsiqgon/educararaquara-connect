
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered, Link, Image, Table, Quote, Code,
  Heading1, Heading2, Heading3, Eye, Edit, Upload, X, Save
} from "lucide-react";
import { useMediaLibrary } from "@/hooks/useMediaLibrary";
import { toast } from "sonner";

interface CompletedWysiwygEditorProps {
  initialContent?: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  onSave?: (content: string) => void;
}

const CompletedWysiwygEditor: React.FC<CompletedWysiwygEditorProps> = ({
  initialContent = "",
  onChange,
  placeholder = "Digite seu conteúdo aqui...",
  className = "",
  onSave
}) => {
  const [content, setContent] = useState(initialContent);
  const [showPreview, setShowPreview] = useState(false);
  const [showMediaSelector, setShowMediaSelector] = useState(false);
  const [showLinkEditor, setShowLinkEditor] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  
  const { media, loading, fetchMedia, uploadFile } = useMediaLibrary();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    onChange(newContent);
    setIsDirty(true);
  };

  const insertAtCursor = (before: string, after: string = "", defaultText: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const insertText = selectedText || defaultText;
    
    const newContent = 
      content.substring(0, start) + 
      before + insertText + after + 
      content.substring(end);
    
    setContent(newContent);
    onChange(newContent);
    setIsDirty(true);

    setTimeout(() => {
      textarea.focus();
      const newPos = start + before.length + insertText.length + after.length;
      textarea.setSelectionRange(newPos, newPos);
    }, 0);
  };

  const handleFormatting = (format: string) => {
    switch (format) {
      case 'bold':
        insertAtCursor('<strong>', '</strong>', 'texto em negrito');
        break;
      case 'italic':
        insertAtCursor('<em>', '</em>', 'texto em itálico');
        break;
      case 'underline':
        insertAtCursor('<u>', '</u>', 'texto sublinhado');
        break;
      case 'h1':
        insertAtCursor('<h1>', '</h1>', 'Título Principal');
        break;
      case 'h2':
        insertAtCursor('<h2>', '</h2>', 'Título Secundário');
        break;
      case 'h3':
        insertAtCursor('<h3>', '</h3>', 'Subtítulo');
        break;
      case 'ul':
        insertAtCursor('<ul>\n  <li>', '</li>\n</ul>', 'Item da lista');
        break;
      case 'ol':
        insertAtCursor('<ol>\n  <li>', '</li>\n</ol>', 'Item numerado');
        break;
      case 'quote':
        insertAtCursor('<blockquote class="border-l-4 border-gray-300 pl-4 italic">', '</blockquote>', 'Citação importante');
        break;
      case 'code':
        insertAtCursor('<code class="bg-gray-100 px-2 py-1 rounded">', '</code>', 'código');
        break;
      case 'center':
        insertAtCursor('<div class="text-center">', '</div>', 'texto centralizado');
        break;
      case 'right':
        insertAtCursor('<div class="text-right">', '</div>', 'texto à direita');
        break;
      case 'table':
        insertAtCursor(
          '<table class="border-collapse border border-gray-300 w-full my-4">\n' +
          '  <thead>\n' +
          '    <tr>\n' +
          '      <th class="border border-gray-300 p-3 bg-gray-100 font-semibold">Cabeçalho 1</th>\n' +
          '      <th class="border border-gray-300 p-3 bg-gray-100 font-semibold">Cabeçalho 2</th>\n' +
          '    </tr>\n' +
          '  </thead>\n' +
          '  <tbody>\n' +
          '    <tr>\n' +
          '      <td class="border border-gray-300 p-3">Célula 1</td>\n' +
          '      <td class="border border-gray-300 p-3">Célula 2</td>\n' +
          '    </tr>\n' +
          '  </tbody>\n' +
          '</table>'
        );
        break;
      case 'link':
        setShowLinkEditor(true);
        break;
      case 'image':
        setShowMediaSelector(true);
        break;
      case 'upload':
        setShowImageUpload(true);
        break;
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(content);
      setIsDirty(false);
      toast.success('Conteúdo salvo com sucesso!');
    }
  };

  const handleInlineImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione apenas arquivos de imagem.');
      return;
    }

    setUploadingImage(true);
    try {
      const uploadedMedia = await uploadFile(file, 'wysiwyg-uploads');
      if (uploadedMedia) {
        insertAtCursor(`<img src="${uploadedMedia.file_path}" alt="${uploadedMedia.alt_text || ''}" class="max-w-full h-auto my-2 rounded shadow" />`);
        toast.success('Imagem inserida com sucesso!');
      }
    } catch (error) {
      toast.error('Erro ao fazer upload da imagem');
    } finally {
      setUploadingImage(false);
      setShowImageUpload(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleInsertLink = () => {
    if (linkUrl && linkText) {
      insertAtCursor(`<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">${linkText}</a>`);
      setLinkUrl("");
      setLinkText("");
      setShowLinkEditor(false);
      toast.success('Link inserido com sucesso!');
    }
  };

  const handleSelectMedia = (url: string, altText: string) => {
    insertAtCursor(`<img src="${url}" alt="${altText}" class="max-w-full h-auto my-2 rounded shadow" />`);
    setShowMediaSelector(false);
    toast.success('Imagem inserida com sucesso!');
  };

  return (
    <div className={`border rounded-lg overflow-hidden bg-white ${className}`}>
      {/* Toolbar */}
      <div className="bg-gray-50 border-b p-3 flex flex-wrap gap-2 items-center">
        {/* Text formatting */}
        <div className="flex items-center space-x-1 border-r pr-2">
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('h1')} title="Título H1">
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('h2')} title="Título H2">
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('h3')} title="Título H3">
            <Heading3 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-1 border-r pr-2">
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('bold')} title="Negrito">
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('italic')} title="Itálico">
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('underline')} title="Sublinhado">
            <Underline className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-1 border-r pr-2">
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('ul')} title="Lista">
            <List className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('ol')} title="Lista Numerada">
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-1 border-r pr-2">
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('center')} title="Centralizar">
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('right')} title="Alinhar à direita">
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-1 border-r pr-2">
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('link')} title="Inserir Link">
            <Link className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('image')} title="Galeria de Mídia">
            <Image className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('upload')} title="Upload Imagem">
            <Upload className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('table')} title="Inserir Tabela">
            <Table className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('quote')} title="Citação">
            <Quote className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('code')} title="Código">
            <Code className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-grow"></div>

        {onSave && (
          <Button 
            variant={isDirty ? "default" : "outline"} 
            size="sm"
            onClick={handleSave}
            disabled={!isDirty}
          >
            <Save className="h-4 w-4 mr-1" />
            Salvar
          </Button>
        )}

        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowPreview(!showPreview)}
        >
          {showPreview ? (
            <>
              <Edit className="h-4 w-4 mr-1" />
              Editar
            </>
          ) : (
            <>
              <Eye className="h-4 w-4 mr-1" />
              Visualizar
            </>
          )}
        </Button>
      </div>

      {/* Editor Content */}
      <div className="min-h-[400px] max-h-[600px] overflow-auto">
        {showPreview ? (
          <div 
            className="p-6 prose prose-sm max-w-none leading-relaxed" 
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={handleContentChange}
            placeholder={placeholder}
            className="border-0 rounded-none min-h-[400px] focus-visible:ring-0 font-mono text-sm resize-none p-6"
          />
        )}
      </div>

      {/* Modals */}
      {showMediaSelector && (
        <Dialog open={showMediaSelector} onOpenChange={setShowMediaSelector}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Biblioteca de Mídia</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-4 p-4">
              {media.map((item) => (
                <div 
                  key={item.id} 
                  className="cursor-pointer border rounded-lg p-2 hover:bg-gray-50"
                  onClick={() => handleSelectMedia(item.file_path, item.alt_text || '')}
                >
                  <img src={item.file_path} alt={item.alt_text || ''} className="w-full h-32 object-cover rounded" />
                  <p className="text-sm mt-2 truncate">{item.original_name}</p>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {showLinkEditor && (
        <Dialog open={showLinkEditor} onOpenChange={setShowLinkEditor}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Inserir Link</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="link-url">URL</Label>
                <Input
                  id="link-url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://exemplo.com"
                />
              </div>
              <div>
                <Label htmlFor="link-text">Texto do Link</Label>
                <Input
                  id="link-text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Texto que aparecerá como link"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowLinkEditor(false)}>
                Cancelar
              </Button>
              <Button onClick={handleInsertLink} disabled={!linkUrl || !linkText}>
                Inserir Link
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {showImageUpload && (
        <Dialog open={showImageUpload} onOpenChange={setShowImageUpload}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload de Imagem</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Selecione uma imagem para upload</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleInlineImageUpload}
                  className="hidden"
                />
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                >
                  {uploadingImage ? "Enviando..." : "Selecionar Arquivo"}
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowImageUpload(false)}>
                Cancelar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CompletedWysiwygEditor;
