
import React, { useState } from 'react';
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { initialSections } from './mockData';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const SectionsManager = () => {
  const [sections, setSections] = useState(initialSections);

  // Section management functions
  const toggleSectionActive = (id: number) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, active: !section.active } : section
      )
    );
    toast.success("Status da seção atualizado");
  };

  const updateSectionOrder = (id: number, newOrder: number) => {
    if (newOrder < 1 || newOrder > sections.length) {
      toast.error("Ordem inválida");
      return;
    }
    
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, order: newOrder } : section
      ).sort((a, b) => a.order - b.order)
    );
    toast.success("Ordem da seção atualizada");
  };

  // Drag and drop handler for sections
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Update order numbers
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1
    }));
    
    setSections(updatedItems);
    toast.success("Ordem das seções atualizada");
  };

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader className="bg-education-light rounded-t-lg">
        <CardTitle className="text-education-primary">Gerenciamento de Seções</CardTitle>
        <CardDescription>
          Ative, desative e reorganize as seções da página inicial
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sections">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Ordem</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sections
                      .sort((a, b) => a.order - b.order)
                      .map((section, index) => (
                        <Draggable 
                          key={section.id} 
                          draggableId={`section-${section.id}`} 
                          index={index}
                        >
                          {(provided) => (
                            <TableRow 
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <TableCell className="font-medium">
                                <div {...provided.dragHandleProps} className="flex items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2 text-gray-400 cursor-grab"
                                  >
                                    <path d="M5 9h14M5 15h14" />
                                  </svg>
                                  {section.name}
                                </div>
                              </TableCell>
                              <TableCell>{section.order}</TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <Switch 
                                    id={`section-${section.id}`} 
                                    checked={section.active} 
                                    onCheckedChange={() => toggleSectionActive(section.id)} 
                                  />
                                  <Label htmlFor={`section-${section.id}`}>
                                    {section.active ? "Ativa" : "Inativa"}
                                  </Label>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="text-education-primary hover:text-education-dark hover:bg-education-light"
                                >
                                  Editar
                                </Button>
                              </TableCell>
                            </TableRow>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </TableBody>
                </Table>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </CardContent>
      <CardFooter className="flex justify-between bg-gray-50 rounded-b-lg">
        <div className="text-sm text-gray-500">
          Total: {sections.length} seções
        </div>
        <Button 
          className="bg-education-primary hover:bg-education-dark"
          onClick={() => toast.success("Alterações salvas com sucesso!")}
        >
          Salvar Alterações
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SectionsManager;
