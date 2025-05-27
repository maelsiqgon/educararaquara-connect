
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import EditorToolbar from "./EditorToolbar";
import EditorContent from "./EditorContent";
import MediaSelector from "./MediaSelector";
import LinkEditor from "./LinkEditor";
import { useMediaLibrary } from "@/hooks/useMediaLibrary";
import { toast } from "sonner";

interface WysiwygEditorProps {
  initialContent: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const WysiwygEditor: React.FC<WysiwygEditorProps> = ({
  initialContent = "",
  onChange,
  placeholder = "Digite seu conteúdo aqui..."
}) => {
  const [content, setContent] = useState(initialContent);
  const [showPreview, setShowPreview] = useState(false);
  const [showMediaSelector, setShowMediaSelector] = useState(false);
  const [showLinkEditor, setShowLinkEditor] = useState(false);
  const { media, loading, fetchMedia } = useMediaLibrary();
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const selectionStart = useRef<number>(0);
  const selectionEnd = useRef<number>(0);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    onChange(newContent);
    
    // Store current selection
    selectionStart.current = e.target.selectionStart;
    selectionEnd.current = e.target.selectionEnd;
  };

  const insertTag = (tag: string) => {
    let startTag = "";
    let endTag = "";
    let defaultText = "";
    
    switch(tag) {
      case 'b':
        startTag = '<strong>';
        endTag = '</strong>';
        defaultText = 'texto em negrito';
        break;
      case 'i':
        startTag = '<em>';
        endTag = '</em>';
        defaultText = 'texto em itálico';
        break;
      case 'ul':
        startTag = '<ul>\n  <li>';
        endTag = '</li>\n</ul>';
        defaultText = 'item da lista';
        break;
      case 'ol':
        startTag = '<ol>\n  <li>';
        endTag = '</li>\n</ol>';
        defaultText = 'item numerado';
        break;
      case 'h2':
        startTag = '<h2>';
        endTag = '</h2>';
        defaultText = 'Título';
        break;
      case 'h3':
        startTag = '<h3>';
        endTag = '</h3>';
        defaultText = 'Subtítulo';
        break;
      case 'p':
        startTag = '<p>';
        endTag = '</p>';
        defaultText = 'parágrafo';
        break;
      case 'center':
        startTag = '<div class="text-center">';
        endTag = '</div>';
        defaultText = 'texto centralizado';
        break;
      case 'right':
        startTag = '<div class="text-right">';
        endTag = '</div>';
        defaultText = 'texto à direita';
        break;
      case 'link':
        setShowLinkEditor(true);
        return;
      case 'image':
        setShowMediaSelector(true);
        return;
      case 'table':
        startTag = '<table class="border-collapse border border-gray-300 w-full">\n  <thead>\n    <tr>\n      <th class="border border-gray-300 p-2">Cabeçalho 1</th>\n      <th class="border border-gray-300 p-2">Cabeçalho 2</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td class="border border-gray-300 p-2">Célula 1</td>\n      <td class="border border-gray-300 p-2">Célula 2</td>\n    </tr>\n    <tr>\n      <td class="border border-gray-300 p-2">Célula 3</td>\n      <td class="border border-gray-300 p-2">Célula 4</td>\n    </tr>\n  </tbody>\n</table>';
        endTag = '';
        defaultText = '';
        break;
    }

    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = selectionStart.current;
    const end = selectionEnd.current;
    const selectedText = content.substring(start, end);
    const newText = selectedText ? selectedText : defaultText;
    
    const newContent = 
      content.substring(0, start) + 
      startTag + 
      newText + 
      endTag + 
      content.substring(end);
    
    setContent(newContent);
    onChange(newContent);

    // Reset focus after React re-renders
    setTimeout(() => {
      if (textarea) {
        textarea.focus();
        const newCursorPos = start + startTag.length + newText.length + endTag.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        
        // Update refs
        selectionStart.current = newCursorPos;
        selectionEnd.current = newCursorPos;
      }
    }, 0);
  };

  const insertMedia = (url: string, altText: string = "") => {
    const imgTag = `<img src="${url}" alt="${altText}" class="max-w-full h-auto my-2" />`;
    
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = selectionStart.current;
    
    const newContent = 
      content.substring(0, start) + 
      imgTag + 
      content.substring(start);
    
    setContent(newContent);
    onChange(newContent);
    setShowMediaSelector(false);
    
    toast.success("Imagem inserida com sucesso!");
  };

  const insertLink = (url: string, text: string, newTab: boolean = false) => {
    const targetAttr = newTab ? ' target="_blank" rel="noopener noreferrer"' : '';
    const linkTag = `<a href="${url}"${targetAttr}>${text}</a>`;
    
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = selectionStart.current;
    const end = selectionEnd.current;
    
    const newContent = 
      content.substring(0, start) + 
      linkTag + 
      content.substring(end);
    
    setContent(newContent);
    onChange(newContent);
    setShowLinkEditor(false);
    
    toast.success("Link inserido com sucesso!");
  };

  return (
    <div className="border rounded-md overflow-hidden">
      {/* Editor Toolbar */}
      <EditorToolbar 
        onInsertTag={insertTag}
        showPreview={showPreview}
        setShowPreview={setShowPreview}
      />
      
      {/* Editor Content */}
      <div className="min-h-[300px] max-h-[600px] overflow-auto">
        <EditorContent
          content={content}
          showPreview={showPreview}
          handleContentChange={handleContentChange}
          textareaRef={textareaRef}
          placeholder={placeholder}
        />
      </div>
      
      {/* Media Selector Modal */}
      {showMediaSelector && (
        <MediaSelector
          media={media}
          loading={loading}
          onSelect={insertMedia}
          onClose={() => setShowMediaSelector(false)}
          onRefresh={fetchMedia}
        />
      )}
      
      {/* Link Editor Modal */}
      {showLinkEditor && (
        <LinkEditor
          onInsert={insertLink}
          onClose={() => setShowLinkEditor(false)}
          initialText={content.substring(selectionStart.current, selectionEnd.current)}
        />
      )}
    </div>
  );
};

export default WysiwygEditor;
