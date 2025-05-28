
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Home,
  School,
  Users,
  FileText,
  Settings,
  Image,
  Calendar,
  MessageSquare,
  BarChart3,
  BookOpen,
  Zap,
  UserCheck,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const AdminSidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();

  const menuItems = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: Home,
      exact: true
    },
    {
      title: "Escolas",
      url: "/admin/schools",
      icon: School,
    },
    {
      title: "Usuários",
      url: "/admin/users",
      icon: Users,
    },
    {
      title: "Notícias",
      url: "/admin/modules/news",
      icon: FileText,
    },
    {
      title: "Mídia",
      url: "/admin/media",
      icon: Image,
    },
    {
      title: "Agenda",
      url: "/admin/modules/agenda",
      icon: Calendar,
    },
    {
      title: "Conselhos",
      url: "/admin/modules/councils",
      icon: UserCheck,
    },
    {
      title: "Chatbot",
      url: "/admin/modules/chatbot",
      icon: MessageSquare,
    },
    {
      title: "Relatórios",
      url: "/admin/modules/reports",
      icon: BarChart3,
    },
    {
      title: "Páginas",
      url: "/admin/modules/pages",
      icon: BookOpen,
    },
    {
      title: "Integrações",
      url: "/admin/modules/integrations",
      icon: Zap,
    },
    {
      title: "Configurações",
      url: "/admin/modules/settings",
      icon: Settings,
    }
  ];

  const isActive = (url: string, exact: boolean = false) => {
    if (exact) {
      return location.pathname === url;
    }
    return location.pathname.startsWith(url);
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-4 py-2">
          <School className="h-6 w-6 text-education-primary" />
          <span className="font-bold text-lg">Admin</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url, item.exact)}
                  >
                    <Link to={item.url} className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
