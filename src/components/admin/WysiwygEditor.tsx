
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Image
} from "lucide-react";

interface WysiwygEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const WysiwygEditor: React.FC<WysiwygEditorProps> = ({ 
  initialValue = "", 
  onChange,
  className
}) => {
  const [content, setContent] = useState(initialValue);
  const [showPreview, setShowPreview] = useState(false);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const insertTag = (tag: string) => {
    const textarea = document.getElementById('wysiwyg-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let newContent = '';
    
    switch(tag) {
      case 'b':
        newContent = content.substring(0, start) + `<strong>${selectedText}</strong>` + content.substring(end);
        break;
      case 'i':
        newContent = content.substring(0, start) + `<em>${selectedText}</em>` + content.substring(end);
        break;
      case 'ul':
        newContent = content.substring(0, start) + `\n<ul>\n  <li>${selectedText || 'Item'}</li>\n</ul>\n` + content.substring(end);
        break;
      case 'ol':
        newContent = content.substring(0, start) + `\n<ol>\n  <li>${selectedText || 'Item'}</li>\n</ol>\n` + content.substring(end);
        break;
      case 'center':
        newContent = content.substring(0, start) + `<div class="text-center">${selectedText}</div>` + content.substring(end);
        break;
      case 'right':
        newContent = content.substring(0, start) + `<div class="text-right">${selectedText}</div>` + content.substring(end);
        break;
      case 'link':
        const url = prompt('Digite a URL do link:', 'https://');
        if (url) {
          newContent = content.substring(0, start) + `<a href="${url}" target="_blank" rel="noopener noreferrer">${selectedText || url}</a>` + content.substring(end);
        } else {
          return;
        }
        break;
      case 'image':
        const imgUrl = prompt('Digite a URL da imagem:', 'https://');
        if (imgUrl) {
          const imgAlt = prompt('Digite a descrição da imagem:', 'Descrição');
          newContent = content.substring(0, start) + `<img src="${imgUrl}" alt="${imgAlt || ''}" class="max-w-full my-2" />` + content.substring(end);
        } else {
          return;
        }
        break;
      default:
        return;
    }
    
    setContent(newContent);
    if (onChange) {
      onChange(newContent);
    }
  };

  return (
    <div className={`border rounded-lg overflow-hidden ${className}`}>
      <div className="bg-gray-100 border-b p-2 flex flex-wrap gap-1">
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => insertTag('b')}
          title="Negrito"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => insertTag('i')}
          title="Itálico"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => insertTag('ul')}
          title="Lista com marcadores"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => insertTag('ol')}
          title="Lista numerada"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <div className="h-6 w-[1px] bg-gray-300 mx-1"></div>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => {}}
          title="Alinhar à esquerda"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => insertTag('center')}
          title="Centralizar"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => insertTag('right')}
          title="Alinhar à direita"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <div className="h-6 w-[1px] bg-gray-300 mx-1"></div>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => insertTag('link')}
          title="Inserir link"
        >
          <Link className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => insertTag('image')}
          title="Inserir imagem"
        >
          <Image className="h-4 w-4" />
        </Button>
        <div className="flex-grow"></div>
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => setShowPreview(!showPreview)}
        >
          {showPreview ? 'Editar' : 'Visualizar'}
        </Button>
      </div>
      
      {showPreview ? (
        <div 
          className="p-4 min-h-[200px] max-h-[400px] overflow-y-auto bg-white" 
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <Textarea
          id="wysiwyg-editor"
          value={content}
          onChange={handleContentChange}
          placeholder="Digite seu conteúdo aqui..."
          className="border-0 rounded-none min-h-[200px] focus-visible:ring-0"
        />
      )}
    </div>
  );
};

export default WysiwygEditor;
