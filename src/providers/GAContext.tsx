import React, { createContext, useContext, ReactNode } from 'react';

declare global {
    interface Window {
      gtag?: (...args: any[]) => void;
    }
}

type GAContextType = {
  sendGAEvent: (telegramId: number, eventGroup: string, eventName: string) => void;
};

const GAContext = createContext<GAContextType | undefined>(undefined);

type GAProviderProps = {
  children: ReactNode;
};

export const GAProvider: React.FC<GAProviderProps> = ({ children }) => {
  const sendGAEvent = (telegramId: number, eventGroup: string, eventName: string): void => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', eventName, {
          event_category: eventGroup,
          user_id: telegramId.toString(),
          client_id: telegramId.toString()
        });
      } else {
        console.error('Google Analytics gtag function not available.');
      }
    console.log(`Sending GA event: ${eventName}`);
  };

  return <GAContext.Provider value={{ sendGAEvent }}>{children}</GAContext.Provider>;
};

export const useGA = (): GAContextType => {
  const context = useContext(GAContext);
  if (!context) {
    throw new Error('useGA must be used within a GAProvider');
  }
  return context;
};
