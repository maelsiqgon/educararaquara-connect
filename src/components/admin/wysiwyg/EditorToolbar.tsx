
import React from "react";
import { Button } from "@/components/ui/button";
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

interface EditorToolbarProps {
  onInsertTag: (tag: string) => void;
  showPreview: boolean;
  setShowPreview: (show: boolean) => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onInsertTag,
  showPreview,
  setShowPreview
}) => {
  return (
    <div className="bg-gray-100 border-b p-2 flex flex-wrap gap-1">
      <Button 
        type="button" 
        variant="ghost" 
        size="sm" 
        onClick={() => onInsertTag('b')}
        title="Negrito"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        variant="ghost" 
        size="sm" 
        onClick={() => onInsertTag('i')}
        title="Itálico"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        variant="ghost" 
        size="sm" 
        onClick={() => onInsertTag('ul')}
        title="Lista com marcadores"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        variant="ghost" 
        size="sm" 
        onClick={() => onInsertTag('ol')}
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
        onClick={() => onInsertTag('center')}
        title="Centralizar"
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        variant="ghost" 
        size="sm" 
        onClick={() => onInsertTag('right')}
        title="Alinhar à direita"
      >
        <AlignRight className="h-4 w-4" />
      </Button>
      <div className="h-6 w-[1px] bg-gray-300 mx-1"></div>
      <Button 
        type="button" 
        variant="ghost" 
        size="sm" 
        onClick={() => onInsertTag('link')}
        title="Inserir link"
      >
        <Link className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        variant="ghost" 
        size="sm" 
        onClick={() => onInsertTag('image')}
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
  );
};

export default EditorToolbar;
