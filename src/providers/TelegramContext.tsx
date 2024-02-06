import React, { createContext, useContext } from 'react';
import InitData from '../types/initData';

type TelegramContextProps = {
  colorScheme?: string; 
  tg?: { 
    access_token: string, 
    token_type: string,
    init_data: InitData
  };
  children?: React.ReactNode;
}

const TelegramContext = createContext<TelegramContextProps | undefined>(undefined);

export const TelegramProvider: React.FC<TelegramContextProps> = ({ colorScheme, tg, children }) => (
  <TelegramContext.Provider value={{ colorScheme, tg }}>{children}</TelegramContext.Provider>
);

export const useTelegramContext = () => {
  const context = useContext(TelegramContext);
  if (!context) {
    throw new Error('useTelegramContext must be used within an AppProvider');
  }
  return context;
};
