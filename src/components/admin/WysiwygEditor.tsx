
import React, { useState } from "react";
import EditorToolbar from "./wysiwyg/EditorToolbar";
import EditorContent from "./wysiwyg/EditorContent";

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
      <EditorToolbar 
        onInsertTag={insertTag} 
        showPreview={showPreview} 
        setShowPreview={setShowPreview} 
      />
      
      <EditorContent 
        content={content}
        showPreview={showPreview}
        handleContentChange={handleContentChange}
      />
    </div>
  );
};

export default WysiwygEditor;
