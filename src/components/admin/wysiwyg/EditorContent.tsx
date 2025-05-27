
import React, { forwardRef } from "react";
import { Textarea } from "@/components/ui/textarea";

interface EditorContentProps {
  content: string;
  showPreview: boolean;
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  placeholder?: string;
}

const EditorContent: React.FC<EditorContentProps> = ({
  content,
  showPreview,
  handleContentChange,
  textareaRef,
  placeholder
}) => {
  return (
    <>
      {showPreview ? (
        <div 
          className="p-4 min-h-[300px] max-h-[600px] overflow-y-auto bg-white prose prose-sm max-w-none" 
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <Textarea
          ref={textareaRef}
          id="wysiwyg-editor"
          value={content}
          onChange={handleContentChange}
          placeholder={placeholder}
          className="border-0 rounded-none min-h-[300px] focus-visible:ring-0 font-mono text-sm resize-none p-4"
        />
      )}
    </>
  );
};

export default EditorContent;
