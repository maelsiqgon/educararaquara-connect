
import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface EditorContentProps {
  content: string;
  showPreview: boolean;
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const EditorContent: React.FC<EditorContentProps> = ({
  content,
  showPreview,
  handleContentChange
}) => {
  return (
    <>
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
    </>
  );
};

export default EditorContent;
