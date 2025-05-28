
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminHome from './AdminHome';
import AdminSchools from './AdminSchools';
import AdminUsers from './AdminUsers';
import AdminMedia from './AdminMedia';
import AdminSchoolCreate from './AdminSchoolCreate';
import AdminSchoolEdit from './AdminSchoolEdit';
import AdminUserCreate from './AdminUserCreate';
import AdminUserEdit from './AdminUserEdit';

const AdminCore = () => {
  return (
    <Routes>
      <Route index element={<AdminHome />} />
      <Route path="schools" element={<AdminSchools />} />
      <Route path="schools/create" element={<AdminSchoolCreate />} />
      <Route path="schools/:id/edit" element={<AdminSchoolEdit />} />
      <Route path="users" element={<AdminUsers />} />
      <Route path="users/create" element={<AdminUserCreate />} />
      <Route path="users/:id/edit" element={<AdminUserEdit />} />
      <Route path="media" element={<AdminMedia />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default AdminCore;
