
import React, { createContext, useState, useContext, ReactNode } from "react";
import { mockSocialNetworks } from "@/components/admin/mockData";

// Define types for our context
interface SocialNetwork {
  id: number;
  platform: string;
  name: string;
  url: string;
  followers: string;
  connected: boolean;
  lastPost: string;
  scheduledPosts: number;
}

interface MockDataContextProps {
  socialNetworks: SocialNetwork[];
  updateSocialNetworks: (networks: SocialNetwork[]) => void;
}

// Create the context
const MockDataContext = createContext<MockDataContextProps | undefined>(undefined);

// Provider component
interface MockDataProviderProps {
  children: ReactNode;
}

export const MockDataProvider = ({ children }: MockDataProviderProps) => {
  // Convert followers to string in the initial state
  const [socialNetworks, setSocialNetworks] = useState<SocialNetwork[]>(
    mockSocialNetworks.map(network => ({
      ...network,
      followers: network.followers.toString()
    }))
  );

  const updateSocialNetworks = (networks: SocialNetwork[]) => {
    setSocialNetworks(networks);
  };

  return (
    <MockDataContext.Provider
      value={{
        socialNetworks,
        updateSocialNetworks
      }}
    >
      {children}
    </MockDataContext.Provider>
  );
};

// Custom hook to use the context
export const useMockData = () => {
  const context = useContext(MockDataContext);
  if (context === undefined) {
    throw new Error("useMockData must be used within a MockDataProvider");
  }
  return context;
};
