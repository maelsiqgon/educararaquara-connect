
import React from 'react';
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { initialMenuItems } from './mockData';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const MenuManager = () => {
  return (
    <Card className="border-0 shadow-soft">
      <CardHeader className="bg-education-light rounded-t-lg">
        <CardTitle className="text-education-primary">Gerenciar Menu de Navegação</CardTitle>
        <CardDescription>
          Adicione, edite ou remova itens do menu principal
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4 border-b">
          <Button className="bg-education-primary hover:bg-education-dark">
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
              className="mr-1"
            >
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
            Novo Item
          </Button>
        </div>
        <DragDropContext onDragEnd={() => toast.success("Menu reordenado")}>
          <Droppable droppableId="menu-items">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Ordem</TableHead>
                      <TableHead>Visível</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {initialMenuItems.map((item, index) => (
                      <Draggable 
                        key={item.id} 
                        draggableId={`menu-${item.id}`} 
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
                                {item.name}
                              </div>
                            </TableCell>
                            <TableCell>{item.url}</TableCell>
                            <TableCell>{item.order}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Switch id={`menu-${item.id}`} defaultChecked={item.visible} />
                                <Label htmlFor={`menu-${item.id}`}>
                                  {item.visible ? "Sim" : "Não"}
                                </Label>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="text-education-primary hover:text-education-dark hover:bg-education-light"
                                >
                                  Editar
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  disabled={item.id === 1} // Não pode remover o item inicial
                                >
                                  Excluir
                                </Button>
                              </div>
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
          Total: {initialMenuItems.length} itens
        </div>
        <Button 
          className="bg-education-primary hover:bg-education-dark"
          onClick={() => toast.success("Menu atualizado com sucesso!")}
        >
          Salvar Alterações
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuManager;
