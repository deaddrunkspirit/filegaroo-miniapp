import React, { createContext, useContext } from 'react';

interface TelegramContextProps {
  colorScheme?: string; 
  children?: React.ReactNode;
}

const TelegramContext = createContext<TelegramContextProps | undefined>(undefined);

export const TelegramProvider: React.FC<TelegramContextProps> = ({ colorScheme, children }) => (
  <TelegramContext.Provider value={{ colorScheme }}>{children}</TelegramContext.Provider>
);

export const useTelegramContext = () => {
  const context = useContext(TelegramContext);
  if (!context) {
    throw new Error('useTelegramContext must be used within an AppProvider');
  }
  return context;
};
