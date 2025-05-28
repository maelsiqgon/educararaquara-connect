
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered, Link, Image, Table, Quote, Code,
  Heading1, Heading2, Heading3, Eye, Edit, Upload, X
} from "lucide-react";
import { useMediaLibrary } from "@/hooks/useMediaLibrary";
import { toast } from "sonner";
import MediaSelector from "./MediaSelector";

interface EnhancedWysiwygEditorProps {
  initialContent?: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

const EnhancedWysiwygEditor: React.FC<EnhancedWysiwygEditorProps> = ({
  initialContent = "",
  onChange,
  placeholder = "Digite seu conteúdo aqui...",
  className = ""
}) => {
  const [content, setContent] = useState(initialContent);
  const [showPreview, setShowPreview] = useState(false);
  const [showMediaSelector, setShowMediaSelector] = useState(false);
  const [showLinkEditor, setShowLinkEditor] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  
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
        insertAtCursor('<blockquote>', '</blockquote>', 'Citação');
        break;
      case 'code':
        insertAtCursor('<code>', '</code>', 'código');
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
          '      <th class="border border-gray-300 p-2 bg-gray-100">Cabeçalho 1</th>\n' +
          '      <th class="border border-gray-300 p-2 bg-gray-100">Cabeçalho 2</th>\n' +
          '    </tr>\n' +
          '  </thead>\n' +
          '  <tbody>\n' +
          '    <tr>\n' +
          '      <td class="border border-gray-300 p-2">Célula 1</td>\n' +
          '      <td class="border border-gray-300 p-2">Célula 2</td>\n' +
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
        insertAtCursor(`<img src="${uploadedMedia.file_path}" alt="${uploadedMedia.alt_text || ''}" class="max-w-full h-auto my-2" />`);
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
      insertAtCursor(`<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>`);
      setLinkUrl("");
      setLinkText("");
      setShowLinkEditor(false);
      toast.success('Link inserido com sucesso!');
    }
  };

  const handleSelectMedia = (url: string, altText: string) => {
    insertAtCursor(`<img src="${url}" alt="${altText}" class="max-w-full h-auto my-2" />`);
    setShowMediaSelector(false);
    toast.success('Imagem inserida com sucesso!');
  };

  return (
    <div className={`border rounded-lg overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="bg-gray-50 border-b p-2 flex flex-wrap gap-1 items-center">
        {/* Formatting buttons */}
        <div className="flex items-center space-x-1 mr-2">
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('h1')}>
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('h2')}>
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('h3')}>
            <Heading3 className="h-4 w-4" />
          </Button>
        </div>

        <div className="h-6 w-[1px] bg-gray-300 mx-1"></div>

        <div className="flex items-center space-x-1 mr-2">
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('bold')}>
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('italic')}>
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('underline')}>
            <Underline className="h-4 w-4" />
          </Button>
        </div>

        <div className="h-6 w-[1px] bg-gray-300 mx-1"></div>

        <div className="flex items-center space-x-1 mr-2">
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('ul')}>
            <List className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('ol')}>
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>

        <div className="h-6 w-[1px] bg-gray-300 mx-1"></div>

        <div className="flex items-center space-x-1 mr-2">
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('center')}>
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('right')}>
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="h-6 w-[1px] bg-gray-300 mx-1"></div>

        <div className="flex items-center space-x-1 mr-2">
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('link')}>
            <Link className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('image')}>
            <Image className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('upload')}>
            <Upload className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleFormatting('table')}>
            <Table className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-grow"></div>

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
            className="p-4 prose prose-sm max-w-none" 
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={handleContentChange}
            placeholder={placeholder}
            className="border-0 rounded-none min-h-[400px] focus-visible:ring-0 font-mono text-sm resize-none"
          />
        )}
      </div>

      {/* Media Selector Modal */}
      {showMediaSelector && (
        <MediaSelector
          media={media}
          loading={loading}
          onSelect={handleSelectMedia}
          onClose={() => setShowMediaSelector(false)}
          onRefresh={fetchMedia}
        />
      )}

      {/* Link Editor Modal */}
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

      {/* Inline Upload Modal */}
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

export default EnhancedWysiwygEditor;
