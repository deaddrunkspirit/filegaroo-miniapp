import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/pages/MainPage';
import FAQPage from './components/pages/FAQPage';
import SettingsPage from './components/pages/SettingsPage';
import ContentsPage from './components/pages/ContentsPage';
import { DropdownProvider } from './providers/DropdownContext';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { TelegramProvider } from './providers/TelegramContext';
import { authUser } from './services/api/apiService';
import { useEffect, useState } from 'react';
import Placeholder from './components/placeholders/Placeholder';

declare const window: any;

function App() {
  const [init_data, setInitData] = useState();
  const webApp = window.Telegram.WebApp;

  const colorScheme = webApp.colorScheme ?? 'dark';
  if (colorScheme === 'dark') {
    document.documentElement.classList.add('dark');
  }

  const queryClient = new QueryClient()
  const DEBUG_MODE = import.meta.env.VITE_DEBUG;
  const MOCKUP_INIT_DATA = import.meta.env.VITE_MOCKUP_INIT_DATA;
  const initData = DEBUG_MODE === 'enabled' ? MOCKUP_INIT_DATA : webApp.initData;
  
  useEffect(() => {
      const doAuth = async () => {
        const res = await authUser(initData); 
        setInitData(res);
      }
    doAuth().catch(console.error)   
  }, [])
  
  if (!init_data) return <Placeholder/>
  window.Telegram.WebApp.ready()

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TelegramProvider colorScheme={colorScheme} tg={init_data} lang='ru' >
          <DropdownProvider>
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/faq' element={<FAQPage />} />
              <Route path='/settings' element={<SettingsPage />} />
              <Route path='/:title/:parent_content_id' element={<ContentsPage />} />
            </Routes>
          </DropdownProvider>
        </TelegramProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
