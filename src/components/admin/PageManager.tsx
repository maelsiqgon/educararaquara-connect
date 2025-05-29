
import React, { useState } from 'react';
import { usePages } from '@/hooks/usePages';
import { toast } from "sonner";
import PageForm from './page/PageForm';
import PageList from './page/PageList';

const PageManager = () => {
  const { pages, loading, createPage, updatePage, deletePage } = usePages();
  const [editingPage, setEditingPage] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = ['Geral', 'Institucional', 'Educação', 'Eventos', 'Projetos'];

  const handleCreatePage = () => {
    setEditingPage({
      id: '',
      title: "",
      slug: "",
      content: "",
      status: 'draft',
      featured: false,
      category: 'Geral',
      author_id: '',
      meta_title: "",
      meta_description: "",
      tags: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
    setIsCreating(true);
  };

  const handleSavePage = async () => {
    if (!editingPage) return;

    if (!editingPage.title.trim()) {
      toast.error("O título da página é obrigatório!");
      return;
    }

    try {
      if (isCreating) {
        await createPage(editingPage);
      } else {
        await updatePage(editingPage.id, editingPage);
      }

      setEditingPage(null);
      setIsCreating(false);
    } catch (error) {
      console.error('Erro ao salvar página:', error);
    }
  };

  const handleDeletePage = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta página?")) {
      await deletePage(id);
    }
  };

  const handleToggleStatus = async (id: string) => {
    const page = pages.find(p => p.id === id);
    if (page) {
      await updatePage(id, { 
        status: page.status === 'published' ? 'draft' : 'published' 
      });
    }
  };

  const handleToggleFeatured = async (id: string) => {
    const page = pages.find(p => p.id === id);
    if (page) {
      await updatePage(id, { featured: !page.featured });
    }
  };

  const handlePreview = (page: any) => {
    toast.info(`Visualizando página: ${page.title}`);
  };

  if (loading) {
    return <div>Carregando páginas...</div>;
  }

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
