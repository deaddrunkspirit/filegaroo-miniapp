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
  };

  export default sendGAEvent;