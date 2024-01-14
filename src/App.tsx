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

declare const window: any;

function App() {
  const [init_data, setInitData] = useState();
  const webApp = window.Telegram.WebApp;

  const colorScheme = webApp.colorScheme ?? 'dark';
  if (colorScheme === 'dark') {
    document.documentElement.classList.add('dark');
  }

  const queryClient = new QueryClient()

  useEffect(
    () => {

      queryClient.fetchQuery({ 
        queryKey: ['initData'], 
        queryFn: async () => { 
          const res = await authUser(webApp.initData) 
          setInitData(res)
          return res
        } 
      })
      
    }, []
  )
  
  window.Telegram.WebApp.ready()


  return (
    <BrowserRouter>
      <TelegramProvider colorScheme={colorScheme} tg={init_data} >
        <QueryClientProvider client={queryClient}>
          <DropdownProvider>
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/faq' element={<FAQPage />} />
              <Route path='/settings' element={<SettingsPage />} />
              <Route path='/:title/:parent_content_id' element={<ContentsPage />} />
            </Routes>
          </DropdownProvider>
        </QueryClientProvider>
      </TelegramProvider>
    </BrowserRouter>
  );
}

export default App;
