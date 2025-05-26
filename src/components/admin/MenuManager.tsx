
import React, { useState } from 'react';
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { initialMenuItems } from './mockData';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Plus, Edit, Trash2, Palette, Settings, Eye } from "lucide-react";

interface MenuItem {
  id: number;
  name: string;
  url: string;
  order: number;
  visible: boolean;
  color?: string;
  icon?: string;
  target?: '_blank' | '_self';
  children?: MenuItem[];
}

interface HomeButton {
  id: string;
  name: string;
  color: string;
  position: string;
  visible: boolean;
  text: string;
}

const MenuManager = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState<'menu' | 'buttons'>('menu');
  
  const [homeButtons, setHomeButtons] = useState<HomeButton[]>([
    { id: 'schools', name: 'Escolas', color: 'bg-education-primary', position: 'top-left', visible: true, text: 'Nossas Escolas' },
    { id: 'news', name: 'Notícias', color: 'bg-blue-600', position: 'top-right', visible: true, text: 'Últimas Notícias' },
    { id: 'events', name: 'Eventos', color: 'bg-green-600', position: 'bottom-left', visible: true, text: 'Próximos Eventos' },
    { id: 'contact', name: 'Contato', color: 'bg-purple-600', position: 'bottom-right', visible: true, text: 'Fale Conosco' }
  ]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(menuItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1
    }));

    setMenuItems(updatedItems);
    toast.success("Menu reordenado com sucesso!");
  };

  const handleCreateItem = () => {
    setEditingItem({
      id: 0,
      name: "",
      url: "",
      order: menuItems.length + 1,
      visible: true,
      color: "#3B82F6",
      target: '_self'
    });
    setIsCreating(true);
  };

  const handleSaveItem = () => {
    if (!editingItem) return;

    if (!editingItem.name.trim() || !editingItem.url.trim()) {
      toast.error("Nome e URL são obrigatórios!");
      return;
    }

    if (isCreating) {
      const newItem = {
        ...editingItem,
        id: Math.max(...menuItems.map(i => i.id)) + 1
      };
      setMenuItems([...menuItems, newItem]);
      toast.success("Item de menu criado com sucesso!");
    } else {
      setMenuItems(menuItems.map(i => i.id === editingItem.id ? editingItem : i));
      toast.success("Item de menu atualizado com sucesso!");
    }

    setEditingItem(null);
    setIsCreating(false);
  };

  const handleDeleteItem = (id: number) => {
    if (id === 1) {
      toast.error("Não é possível remover o item principal!");
      return;
    }
    
    setMenuItems(menuItems.filter(i => i.id !== id));
    toast.success("Item removido com sucesso!");
  };

  const toggleItemVisibility = (id: number) => {
    setMenuItems(menuItems.map(i => 
      i.id === id ? { ...i, visible: !i.visible } : i
    ));
    toast.success("Visibilidade atualizada!");
  };

  const updateHomeButton = (id: string, updates: Partial<HomeButton>) => {
    setHomeButtons(homeButtons.map(button => 
      button.id === id ? { ...button, ...updates } : button
    ));
    toast.success("Botão atualizado com sucesso!");
  };

  if (editingItem) {
    return (
      <Card className="border-0 shadow-soft">
        <CardHeader className="bg-education-light rounded-t-lg">
          <CardTitle className="text-education-primary">
            {isCreating ? "Criar Item de Menu" : "Editar Item de Menu"}
          </CardTitle>
          <CardDescription>
            Configure as propriedades do item de menu
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="item-name">Nome do Item *</Label>
                <Input
                  id="item-name"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                  placeholder="Ex: Sobre Nós"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="item-url">URL *</Label>
                <Input
                  id="item-url"
                  value={editingItem.url}
                  onChange={(e) => setEditingItem({...editingItem, url: e.target.value})}
                  placeholder="Ex: /sobre"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="item-color">Cor</Label>
                <Input
                  id="item-color"
                  type="color"
                  value={editingItem.color || "#3B82F6"}
                  onChange={(e) => setEditingItem({...editingItem, color: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="item-target">Destino</Label>
                <Select 
                  value={editingItem.target || '_self'} 
                  onValueChange={(value) => setEditingItem({...editingItem, target: value as '_blank' | '_self'})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_self">Mesma janela</SelectItem>
                    <SelectItem value="_blank">Nova janela</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="item-icon">Ícone (opcional)</Label>
                <Input
                  id="item-icon"
                  value={editingItem.icon || ""}
                  onChange={(e) => setEditingItem({...editingItem, icon: e.target.value})}
                  placeholder="Ex: home, user"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingItem(null);
                  setIsCreating(false);
                }}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={handleSaveItem}
                className="bg-education-primary hover:bg-education-dark"
              >
                {isCreating ? "Criar Item" : "Salvar Alterações"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('menu')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'menu'
                ? 'border-education-primary text-education-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Menu de Navegação
          </button>
          <button
            onClick={() => setActiveTab('buttons')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'buttons'
                ? 'border-education-primary text-education-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Botões da Home
          </button>
        </nav>
      </div>

      {activeTab === 'menu' && (
        <Card className="border-0 shadow-soft">
          <CardHeader className="bg-education-light rounded-t-lg">
            <CardTitle className="text-education-primary">Gerenciar Menu de Navegação</CardTitle>
            <CardDescription>
              Adicione, edite ou remova itens do menu principal
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <Button onClick={handleCreateItem} className="bg-education-primary hover:bg-education-dark">
                <Plus className="h-4 w-4 mr-2" />
                Novo Item
              </Button>
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="menu-items">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <Table>
                      <TableHeader className="bg-gray-50">
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>URL</TableHead>
                          <TableHead>Cor</TableHead>
                          <TableHead>Ordem</TableHead>
                          <TableHead>Visível</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {menuItems.map((item, index) => (
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
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <div 
                                      className="w-4 h-4 rounded"
                                      style={{ backgroundColor: item.color || '#3B82F6' }}
                                    />
                                    <span className="text-sm text-gray-600">{item.color}</span>
                                  </div>
                                </TableCell>
                                <TableCell>{item.order}</TableCell>
                                <TableCell>
                                  <Switch 
                                    checked={item.visible} 
                                    onCheckedChange={() => toggleItemVisibility(item.id)}
                                  />
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => setEditingItem(item)}
                                      className="text-education-primary hover:text-education-dark"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleDeleteItem(item.id)}
                                      className="text-red-500 hover:text-red-700"
                                      disabled={item.id === 1}
                                    >
                                      <Trash2 className="h-4 w-4" />
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
              Total: {menuItems.length} itens
            </div>
            <Button 
              className="bg-education-primary hover:bg-education-dark"
              onClick={() => toast.success("Menu atualizado com sucesso!")}
            >
              Salvar Alterações
            </Button>
          </CardFooter>
        </Card>
      )}

      {activeTab === 'buttons' && (
        <Card className="border-0 shadow-soft">
          <CardHeader className="bg-education-light rounded-t-lg">
            <CardTitle className="text-education-primary">Personalizar Botões da Home</CardTitle>
            <CardDescription>
              Configure cores, posições e textos dos botões principais
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {homeButtons.map((button) => (
                <Card key={button.id} className="border border-gray-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{button.name}</CardTitle>
                      <Switch
                        checked={button.visible}
                        onCheckedChange={(checked) => updateHomeButton(button.id, { visible: checked })}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Texto do Botão</Label>
                      <Input
                        value={button.text}
                        onChange={(e) => updateHomeButton(button.id, { text: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Cor</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="color"
                          value={button.color.replace('bg-', '#')}
                          onChange={(e) => updateHomeButton(button.id, { color: e.target.value })}
                          className="w-16 h-10"
                        />
                        <div className={`px-3 py-2 rounded text-white text-sm ${button.color}`}>
                          Preview
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Posição</Label>
                      <Select 
                        value={button.position} 
                        onValueChange={(value) => updateHomeButton(button.id, { position: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="top-left">Superior Esquerda</SelectItem>
                          <SelectItem value="top-right">Superior Direita</SelectItem>
                          <SelectItem value="bottom-left">Inferior Esquerda</SelectItem>
                          <SelectItem value="bottom-right">Inferior Direita</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 rounded-b-lg">
            <Button 
              className="bg-education-primary hover:bg-education-dark"
              onClick={() => toast.success("Configurações dos botões salvas!")}
            >
              <Palette className="h-4 w-4 mr-2" />
              Salvar Configurações
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default MenuManager;
