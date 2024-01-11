import React, { createContext, useContext, useState } from 'react';

interface DropdownContextProps {
  openDropdown: (id: number) => void;
  closeDropdown: () => void;
  isOpen: (id: number) => boolean;
}

const DropdownContext = createContext<DropdownContextProps | undefined>(undefined);

export const DropdownProvider: React.FC<any> = ({ children }) => {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const openDropdown = (id: number) => {
    setOpenDropdownId(id);
    document.body.classList.add('overflow-hidden');
  };

  const closeDropdown = () => {
    setOpenDropdownId(null);
    document.body.classList.remove('overflow-hidden');
  };

  const isOpen = (id: number) => {
    return openDropdownId === id;
  };

  return (
    <DropdownContext.Provider value={{ openDropdown, closeDropdown, isOpen }}>
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = (id: number) => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('useDropdown must be used within a DropdownProvider');
  }
  return {
    openDropdown: () => context.openDropdown(id),
    closeDropdown: context.closeDropdown,
    isOpen: context.isOpen(id),
  };
};
