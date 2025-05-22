
import React, { useState } from 'react';
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { initialNews } from './mockData';
import WysiwygEditor from "./WysiwygEditor";
import ImageUploader from "./ImageUploader";

const NewsManager = () => {
  const [news, setNews] = useState(initialNews);
  const [editingNewsId, setEditingNewsId] = useState<number | null>(null);
  const [editingNewsData, setEditingNewsData] = useState<any>(null);

  // News management functions
  const toggleNewsFeatured = (id: number) => {
    setNews(
      news.map((item) =>
        item.id === id ? { ...item, featured: !item.featured } : item
      )
    );
    toast.success("Status da notícia atualizado");
  };

  const deleteNews = (id: number) => {
    setNews(news.filter((item) => item.id !== id));
    toast.success("Notícia removida com sucesso");
  };
  
  const editNews = (id: number) => {
    const newsItem = news.find(item => item.id === id);
    if (newsItem) {
      setEditingNewsId(id);
      setEditingNewsData({ ...newsItem });
    }
  };
  
  const updateNews = () => {
    if (editingNewsId && editingNewsData) {
      setNews(
        news.map(item => 
          item.id === editingNewsId ? { ...editingNewsData } : item
        )
      );
      setEditingNewsId(null);
      setEditingNewsData(null);
      toast.success("Notícia atualizada com sucesso");
    }
  };

  if (editingNewsId) {
    return (
      <Card className="border-0 shadow-soft">
        <CardHeader className="bg-education-light rounded-t-lg">
          <CardTitle className="text-education-primary">Editar Notícia</CardTitle>
          <CardDescription>
            Modifique os detalhes da notícia selecionada
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="news-title">Título</Label>
            <Input
              id="news-title"
              value={editingNewsData?.title || ""}
              onChange={(e) => setEditingNewsData({ ...editingNewsData, title: e.target.value })}
              className="border-gray-300 focus-visible:ring-education-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Imagem de Capa</Label>
            <ImageUploader
              initialImage={editingNewsData?.image}
              onImageChange={(imageUrl) => setEditingNewsData({ ...editingNewsData, image: imageUrl })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="news-date">Data</Label>
              <Input
                id="news-date"
                value={editingNewsData?.date || ""}
                onChange={(e) => setEditingNewsData({ ...editingNewsData, date: e.target.value })}
                className="border-gray-300 focus-visible:ring-education-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="news-category">Categoria</Label>
              <Input
                id="news-category"
                value={editingNewsData?.category || ""}
                onChange={(e) => setEditingNewsData({ ...editingNewsData, category: e.target.value })}
                className="border-gray-300 focus-visible:ring-education-primary"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="news-description">Descrição</Label>
            <WysiwygEditor
              initialValue={editingNewsData?.description || ""}
              onChange={(value) => setEditingNewsData({ ...editingNewsData, description: value })}
            />
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            <Switch
              id="news-featured"
              checked={editingNewsData?.featured || false}
              onCheckedChange={(checked) => setEditingNewsData({ ...editingNewsData, featured: checked })}
            />
            <Label htmlFor="news-featured">Destacar na página inicial</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4 pt-4">
          <Button
            variant="outline"
            onClick={() => {
              setEditingNewsId(null);
              setEditingNewsData(null);
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={updateNews}
            className="bg-education-primary hover:bg-education-dark"
          >
            Salvar Alterações
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader className="bg-education-light rounded-t-lg">
        <CardTitle className="text-education-primary">Gerenciamento de Notícias</CardTitle>
        <CardDescription>
          Adicione, edite ou remova notícias do portal
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
            Nova Notícia
          </Button>
        </div>
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Destaque</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium max-w-xs truncate">{item.title}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-education-light text-education-primary">
                    {item.category}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id={`news-${item.id}`} 
                      checked={item.featured} 
                      onCheckedChange={() => toggleNewsFeatured(item.id)} 
                    />
                    <Label htmlFor={`news-${item.id}`}>
                      {item.featured ? "Sim" : "Não"}
                    </Label>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-education-primary hover:text-education-dark hover:bg-education-light"
                      onClick={() => editNews(item.id)}
                    >
                      Editar
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => deleteNews(item.id)}
                    >
                      Excluir
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between bg-gray-50 rounded-b-lg">
        <div className="text-sm text-gray-500">
          Total: {news.length} notícias
        </div>
        <Button 
          className="bg-education-primary hover:bg-education-dark"
          onClick={() => toast.success("Notícias atualizadas com sucesso!")}
        >
          Salvar Alterações
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsManager;
