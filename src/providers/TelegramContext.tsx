import React, { createContext, useContext } from 'react';
import InitData from '../types/initData';

interface TelegramContextProps {
  colorScheme?: string; 
  tg?: { 
    access_token: string, 
    token_type: string,
    init_data: InitData
  };
  lang?: string,
  children?: React.ReactNode;
}

const TelegramContext = createContext<TelegramContextProps | undefined>(undefined);

export const TelegramProvider: React.FC<TelegramContextProps> = ({ colorScheme, tg, lang, children }) => (
  <TelegramContext.Provider value={{ colorScheme, tg, lang }}>{children}</TelegramContext.Provider>
);

export const useTelegramContext = () => {
  const context = useContext(TelegramContext);
  if (!context) {
    throw new Error('useTelegramContext must be used within an AppProvider');
  }
  return context;
};
