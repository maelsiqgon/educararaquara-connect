
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import AdminHome from './admin/AdminHome';
import AdminSchools from './admin/AdminSchools';
import AdminUsers from './admin/AdminUsers';
import AdminMedia from './admin/AdminMedia';
import AdminSchoolCreate from './admin/AdminSchoolCreate';
import AdminSchoolEdit from './admin/AdminSchoolEdit';
import AdminUserCreate from './admin/AdminUserCreate';
import AdminUserEdit from './admin/AdminUserEdit';
import AdvancedNewsManager from '@/components/admin/news/AdvancedNewsManager';
import AgendaManager from '@/components/admin/agenda/AgendaManager';
import CouncilManager from '@/components/admin/councils/CouncilManager';
import ChatbotManager from '@/components/admin/chatbot/ChatbotManager';
import AdvancedReportsSystem from '@/components/admin/reports/AdvancedReportsSystem';
import PageManager from '@/components/admin/PageManager';
import IntegrationTabs from '@/components/admin/integrations/IntegrationTabs';
import SectionsManager from '@/components/admin/SectionsManager';

const Admin = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminHome />} />
        <Route path="schools" element={<AdminSchools />} />
        <Route path="schools/create" element={<AdminSchoolCreate />} />
        <Route path="schools/:id/edit" element={<AdminSchoolEdit />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="users/create" element={<AdminUserCreate />} />
        <Route path="users/:id/edit" element={<AdminUserEdit />} />
        <Route path="news" element={<AdvancedNewsManager />} />
        <Route path="media" element={<AdminMedia />} />
        <Route path="agenda" element={<AgendaManager />} />
        <Route path="councils" element={<CouncilManager />} />
        <Route path="chatbot" element={<ChatbotManager />} />
        <Route path="reports" element={<AdvancedReportsSystem />} />
        <Route path="pages" element={<PageManager />} />
        <Route path="integrations" element={<IntegrationTabs />} />
        <Route path="settings" element={<SectionsManager />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;
