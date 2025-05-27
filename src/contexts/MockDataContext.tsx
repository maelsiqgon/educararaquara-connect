
import React, { createContext, useContext, ReactNode } from 'react';
import { mockSchools, mockSocialNetworks } from '@/components/admin/mockData';

interface MockDataContextType {
  schools: typeof mockSchools;
  socialNetworks: typeof mockSocialNetworks;
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export const MockDataProvider = ({ children }: { children: ReactNode }) => {
  return (
    <MockDataContext.Provider value={{
      schools: mockSchools,
      socialNetworks: mockSocialNetworks
    }}>
      {children}
    </MockDataContext.Provider>
  );
};

export const useMockData = () => {
  const context = useContext(MockDataContext);
  if (!context) {
    throw new Error('useMockData must be used within a MockDataProvider');
  }
  return context;
};
