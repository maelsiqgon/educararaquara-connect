
import React, { useState } from 'react';
import { toast } from "sonner";
import { mockPages } from './mockData';
import PageForm from './page/PageForm';
import PageList from './page/PageList';

interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  status: 'published' | 'draft';
  featured: boolean;
  image?: string;
  category: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  metaDescription?: string;
  tags: string[];
}

const PageManager = () => {
  const [pages, setPages] = useState<Page[]>(
    mockPages.map(page => ({
      ...page,
      status: page.status as 'published' | 'draft',
      category: 'Geral',
      author: 'Administrador',
      metaDescription: page.content.substring(0, 150) + '...',
      tags: ['educação', 'araraquara']
    }))
  );
  
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = ['Geral', 'Institucional', 'Educação', 'Eventos', 'Projetos'];

  const handleCreatePage = () => {
    setEditingPage({
      id: 0,
      title: "",
      slug: "",
      content: "",
      status: 'draft',
      featured: false,
      category: 'Geral',
      author: 'Administrador',
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
      metaDescription: "",
      tags: []
    });
    setIsCreating(true);
  };

  const handleSavePage = () => {
    if (!editingPage) return;

    if (!editingPage.title.trim()) {
      toast.error("O título da página é obrigatório!");
      return;
    }

    const now = new Date().toISOString().slice(0, 10);

    if (isCreating) {
      const newPage = {
        ...editingPage,
        id: Math.max(...pages.map(p => p.id), 0) + 1,
        createdAt: now,
        updatedAt: now
      };
      setPages([...pages, newPage]);
      toast.success("Página criada com sucesso!");
    } else {
      setPages(pages.map(p => p.id === editingPage.id ? {...editingPage, updatedAt: now} : p));
      toast.success("Página atualizada com sucesso!");
    }

    setEditingPage(null);
    setIsCreating(false);
  };

  const handleDeletePage = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta página?")) {
      setPages(pages.filter(p => p.id !== id));
      toast.success("Página removida com sucesso!");
    }
  };

  const handleToggleStatus = (id: number) => {
    setPages(pages.map(p => 
      p.id === id ? { ...p, status: p.status === 'published' ? 'draft' : 'published' } : p
    ));
    toast.success("Status da página atualizado!");
  };

  const handleToggleFeatured = (id: number) => {
    setPages(pages.map(p => 
      p.id === id ? {...p, featured: !p.featured} : p
    ));
    toast.success("Status de destaque atualizado!");
  };

  const handlePreview = (page: Page) => {
    toast.info(`Visualizando página: ${page.title}`);
  };

  if (editingPage) {
    return (
      <PageForm
        page={editingPage}
        isCreating={isCreating}
        categories={categories}
        onSave={handleSavePage}
        onCancel={() => {
          setEditingPage(null);
          setIsCreating(false);
        }}
        onPageChange={setEditingPage}
      />
    );
  }

  return (
    <PageList
      pages={pages}
      searchTerm={searchTerm}
      statusFilter={statusFilter}
      categoryFilter={categoryFilter}
      categories={categories}
      onSearchChange={setSearchTerm}
      onStatusFilterChange={setStatusFilter}
      onCategoryFilterChange={setCategoryFilter}
      onCreatePage={handleCreatePage}
      onEditPage={setEditingPage}
      onDeletePage={handleDeletePage}
      onToggleStatus={handleToggleStatus}
      onToggleFeatured={handleToggleFeatured}
      onPreview={handlePreview}
    />
  );
};

export default PageManager;
