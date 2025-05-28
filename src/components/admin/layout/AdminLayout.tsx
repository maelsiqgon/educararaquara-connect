
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from '../AdminHeader';
import AdminBreadcrumb from '../navigation/AdminBreadcrumb';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AdminLayoutProps {
  children?: React.ReactNode;
  breadcrumbItems?: BreadcrumbItem[];
  showBackButton?: boolean;
  backButtonTo?: string;
  backButtonLabel?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  breadcrumbItems,
  showBackButton = false,
  backButtonTo,
  backButtonLabel
}) => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <AdminHeader />
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <AdminBreadcrumb items={breadcrumbItems} />
          {children || <Outlet />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
