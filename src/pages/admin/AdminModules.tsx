
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdvancedNewsManager from '@/components/admin/news/AdvancedNewsManager';
import AgendaManager from '@/components/admin/agenda/AgendaManager';
import CouncilManager from '@/components/admin/councils/CouncilManager';
import ChatbotManager from '@/components/admin/chatbot/ChatbotManager';
import ConnectedReportsSystem from '@/components/admin/reports/ConnectedReportsSystem';
import PageManager from '@/components/admin/PageManager';
import IntegrationTabs from '@/components/admin/integrations/IntegrationTabs';
import SectionsManager from '@/components/admin/SectionsManager';

const AdminModules = () => {
  return (
    <Routes>
      <Route path="news" element={<AdvancedNewsManager />} />
      <Route path="agenda" element={<AgendaManager />} />
      <Route path="councils" element={<CouncilManager />} />
      <Route path="chatbot" element={<ChatbotManager />} />
      <Route path="reports" element={<ConnectedReportsSystem />} />
      <Route path="pages" element={<PageManager />} />
      <Route path="integrations" element={<IntegrationTabs />} />
      <Route path="settings" element={<SectionsManager />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default AdminModules;
