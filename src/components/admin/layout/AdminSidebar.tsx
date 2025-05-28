
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
import { useAuth } from '@/hooks/auth/authContext';

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

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
      url: "/admin/news",
      icon: FileText,
    },
    {
      title: "Mídia",
      url: "/admin/media",
      icon: Image,
    },
    {
      title: "Agenda",
      url: "/admin/agenda",
      icon: Calendar,
    },
    {
      title: "Conselhos",
      url: "/admin/councils",
      icon: UserCheck,
    },
    {
      title: "Chatbot",
      url: "/admin/chatbot",
      icon: MessageSquare,
    },
    {
      title: "Relatórios",
      url: "/admin/reports",
      icon: BarChart3,
    },
    {
      title: "Páginas",
      url: "/admin/pages",
      icon: BookOpen,
    },
    {
      title: "Integrações",
      url: "/admin/integrations",
      icon: Zap,
    },
    {
      title: "Configurações",
      url: "/admin/settings",
      icon: Settings,
    }
  ];

  const isActive = (url: string, exact: boolean = false) => {
    if (exact) {
      return location.pathname === url;
    }
    return location.pathname.startsWith(url);
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
            <SidebarMenuButton onClick={logout}>
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
