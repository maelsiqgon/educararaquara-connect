
// Hook removido - não é mais necessário com a estrutura simplificada
export const useUserContacts = () => {
  return {
    contacts: [],
    loading: false,
    fetchContacts: async () => {},
    saveContacts: async () => {}
  };
};
