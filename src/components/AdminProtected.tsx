
import React from "react";
import { Navigate } from "react-router-dom";

// Mock authentication functionality
// In a real app, this would connect to your authentication system
const isAuthenticated = () => {
  // For demo purposes only - this should check actual auth state
  const authToken = localStorage.getItem("admin_auth_token");
  return !!authToken;
};

// Mock admin check
// In a real app, this would validate admin permissions
const isAdmin = () => {
  // For demo purposes, we'll assume any authenticated user is an admin
  // In a real application, you would check roles/permissions
  return isAuthenticated();
};

interface AdminProtectedProps {
  children: React.ReactNode;
}

const AdminProtected: React.FC<AdminProtectedProps> = ({ children }) => {
  // For demo purposes, let's make this always return true
  // In a real application, you would use isAdmin() instead
  const hasAccess = true; // Using true for demo purposes
  
  if (!hasAccess) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default AdminProtected;
