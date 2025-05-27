
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Image,
  Table,
  Eye,
  Edit
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <div className="bg-gray-100 border-b p-2 flex flex-wrap gap-1 items-center">
      <TooltipProvider>
        <div className="flex items-center space-x-1 mr-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => onInsertTag('p')}
              >
                <span className="font-bold">P</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Parágrafo</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => onInsertTag('h2')}
              >
                <Heading2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Título</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => onInsertTag('h3')}
              >
                <Heading3 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Subtítulo</TooltipContent>
          </Tooltip>
        </div>

        <div className="h-6 w-[1px] bg-gray-300 mx-1"></div>

        <div className="flex items-center space-x-1 mr-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => onInsertTag('b')}
              >
                <Bold className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Negrito</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => onInsertTag('i')}
              >
                <Italic className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Itálico</TooltipContent>
          </Tooltip>
        </div>

        <div className="h-6 w-[1px] bg-gray-300 mx-1"></div>

        <div className="flex items-center space-x-1 mr-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => onInsertTag('ul')}
              >
                <List className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Lista com marcadores</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => onInsertTag('ol')}
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Lista numerada</TooltipContent>
          </Tooltip>
        </div>

        <div className="h-6 w-[1px] bg-gray-300 mx-1"></div>

        <div className="flex items-center space-x-1 mr-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => onInsertTag('center')}
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Centralizar</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => onInsertTag('right')}
              >
                <AlignRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Alinhar à direita</TooltipContent>
          </Tooltip>
        </div>

        <div className="h-6 w-[1px] bg-gray-300 mx-1"></div>

        <div className="flex items-center space-x-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => onInsertTag('link')}
              >
                <Link className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Inserir link</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => onInsertTag('image')}
              >
                <Image className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Inserir imagem</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => onInsertTag('table')}
              >
                <Table className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Inserir tabela</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      
      <div className="flex-grow"></div>
      
      <Button 
        type="button" 
        variant="outline" 
        size="sm"
        onClick={() => setShowPreview(!showPreview)}
        className="ml-2"
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
  );
};

export default EditorToolbar;
