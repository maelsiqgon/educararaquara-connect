
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminWelcome from "@/components/admin/AdminWelcome";
import SectionsManager from "@/components/admin/SectionsManager";
import NewsManager from "@/components/admin/NewsManager";
import BannerEditor from "@/components/admin/BannerEditor";
import MenuManager from "@/components/admin/MenuManager";
import MediaLibraryManager from "@/components/admin/MediaLibraryManager";
import DashboardStats from "@/components/admin/DashboardStats";
import UserProfilesTabs from "@/components/admin/UserProfilesTabs";

const Admin = () => {
  return (
    <div className="min-h-screen bg-education-lightgray">
      <AdminHeader />

      <main className="container mx-auto px-4 py-8">
        <AdminWelcome />
        
        {/* Dashboard Estatísticas */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-education-primary mb-6">Dashboard</h2>
          <DashboardStats />
        </div>

        <Tabs defaultValue="sections" className="space-y-6">
          <TabsList className="bg-white shadow-sm border-0 p-1 rounded-lg">
            <TabsTrigger value="sections" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
              Seções
            </TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
              Notícias
            </TabsTrigger>
            <TabsTrigger value="banner" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
              Banner Principal
            </TabsTrigger>
            <TabsTrigger value="menu" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
              Menu
            </TabsTrigger>
            <TabsTrigger value="media" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
              Biblioteca de Mídias
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sections" className="space-y-4">
            <SectionsManager />
          </TabsContent>

          <TabsContent value="news" className="space-y-4">
            <NewsManager />
          </TabsContent>

          <TabsContent value="banner" className="space-y-4">
            <BannerEditor />
          </TabsContent>

          <TabsContent value="menu" className="space-y-4">
            <MenuManager />
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            <MediaLibraryManager />
          </TabsContent>
        </Tabs>

        {/* Seção de Perfis de Usuário */}
        <UserProfilesTabs />
      </main>
    </div>
  );
};

export default Admin;
