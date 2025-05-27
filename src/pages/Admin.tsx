
import React, { useState } from "react";
import AdminProtected from "@/components/AdminProtected";
import AdminHeader from "@/components/admin/AdminHeader";
import DashboardStats from "@/components/admin/DashboardStats";
import AdminWelcome from "@/components/admin/AdminWelcome";
import ContentManager from "@/components/admin/ContentManager";
import NewsManager from "@/components/admin/NewsManager";
import AdvancedNewsManager from "@/components/admin/news/AdvancedNewsManager";
import PageManager from "@/components/admin/PageManager";
import BannerEditor from "@/components/admin/BannerEditor";
import MenuManager from "@/components/admin/MenuManager";
import MediaLibraryManager from "@/components/admin/MediaLibraryManager";
import SchoolContentManager from "@/components/admin/SchoolContentManager";
import SchoolPagination from "@/components/admin/schools/SchoolPagination";
import SchoolUserManager from "@/components/admin/SchoolUserManager";
import AdvancedUserManager from "@/components/admin/user-management/AdvancedUserManager";
import SectionsManager from "@/components/admin/SectionsManager";
import SecretaryAgenda from "@/components/admin/SecretaryAgenda";
import SecretarySchedule from "@/components/admin/secretary/SecretarySchedule";
import CouncilManager from "@/components/admin/councils/CouncilManager";
import IntegrationTabs from "@/components/admin/integrations/IntegrationTabs";
import ChatInterface from "@/components/admin/chat/ChatInterface";
import ReportsModule from "@/components/admin/reports/ReportsModule";
import EventsManagement from "@/components/admin/events/EventsManagement";
import DigitalBulletin from "@/components/admin/bulletin/DigitalBulletin";
import DevelopmentRoadmap from "@/components/admin/DevelopmentRoadmap";

const Admin = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "content", label: "Gestão de Conteúdo", icon: "📝" },
    { id: "news", label: "Notícias Básicas", icon: "📰" },
    { id: "advanced-news", label: "Sistema de Notícias Avançado", icon: "📰" },
    { id: "pages", label: "Páginas", icon: "📄" },
    { id: "banner", label: "Banner Principal", icon: "🖼️" },
    { id: "menu", label: "Menu de Navegação", icon: "🔗" },
    { id: "sections", label: "Seções da Home", icon: "🏠" },
    { id: "media", label: "Biblioteca de Mídias", icon: "🖼️" },
    { id: "schools", label: "Gestão de Escolas", icon: "🏫" },
    { id: "school-pagination", label: "Escolas - Paginação", icon: "🏫" },
    { id: "users", label: "Usuários Básico", icon: "👥" },
    { id: "advanced-users", label: "Sistema de Usuários Avançado", icon: "👥" },
    { id: "secretary-agenda", label: "Agenda Básica", icon: "📅" },
    { id: "secretary-schedule", label: "Agenda Avançada do Secretário", icon: "📅" },
    { id: "councils", label: "Sistema de Conselhos", icon: "🏛️" },
    { id: "integrations", label: "Integrações Técnicas", icon: "🔌" },
    { id: "chat", label: "Chat e Atendimento", icon: "💬" },
    { id: "reports", label: "Relatórios", icon: "📈" },
    { id: "events", label: "Eventos", icon: "🎉" },
    { id: "bulletin", label: "Boletim Digital", icon: "📋" },
    { id: "roadmap", label: "Roadmap de Desenvolvimento", icon: "🗺️" }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-8">
            <AdminWelcome />
            <DashboardStats />
          </div>
        );
      case "content":
        return <ContentManager />;
      case "news":
        return <NewsManager />;
      case "advanced-news":
        return <AdvancedNewsManager />;
      case "pages":
        return <PageManager />;
      case "banner":
        return <BannerEditor />;
      case "menu":
        return <MenuManager />;
      case "sections":
        return <SectionsManager />;
      case "media":
        return <MediaLibraryManager />;
      case "schools":
        return <SchoolContentManager />;
      case "school-pagination":
        return <SchoolPagination />;
      case "users":
        return <SchoolUserManager />;
      case "advanced-users":
        return <AdvancedUserManager />;
      case "secretary-agenda":
        return <SecretaryAgenda />;
      case "secretary-schedule":
        return <SecretarySchedule />;
      case "councils":
        return <CouncilManager />;
      case "integrations":
        return <IntegrationTabs />;
      case "chat":
        return <ChatInterface />;
      case "reports":
        return <ReportsModule />;
      case "events":
        return <EventsManagement />;
      case "bulletin":
        return <DigitalBulletin />;
      case "roadmap":
        return <DevelopmentRoadmap />;
      default:
        return (
          <div className="space-y-8">
            <AdminWelcome />
            <DashboardStats />
          </div>
        );
    }
  };

  return (
    <AdminProtected>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-sm border-r min-h-screen">
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Menu Principal</h2>
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeSection === item.id
                        ? "bg-education-primary text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </AdminProtected>
  );
};

export default Admin;
