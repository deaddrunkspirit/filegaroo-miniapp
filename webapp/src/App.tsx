import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './components/pages/MainPage';
import FAQPage from './components/pages/FAQPage';
import SettingsPage from './components/pages/SettingsPage';
import ContentsPage from './components/pages/ContentsPage';
import { DropdownProvider } from './providers/DropdownContext';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { TelegramProvider } from 'providers/TelegramContext';
import { getOrCreateUser } from 'services/api/apiService';
import { useEffect, useState } from 'react';
import { User } from 'types/user';

declare const window: any;

function App() {
  const [user, setUser] = useState<User | null>(null);
  const getUser = () => {
    return {
      'user': {
        id: 355308090
      }
    }
  }

  const webApp = window.Telegram.WebApp;

  console.log(webApp.initDataUnsafe)

  const debugMode = false;
  const initData = webApp.initDataUnsafe;
  const colorScheme = debugMode ? 'dark' : webApp.colorScheme;
  if (colorScheme === 'dark') {
    document.documentElement.classList.add('dark');
  }
  console.log(initData.user.id)

  const queryClient = new QueryClient()

  useEffect(
    () => {

      queryClient.fetchQuery({ 
        queryKey: ['user', initData.user.id], 
        queryFn: async () => { 
          const res = await getOrCreateUser(initData.user.id) 
          console.log(res)
          setUser(res)
        } 
      })
      
    }, []
  )
  // initData.user
  console.log(user)
  console.log(initData.user)
  if (user === null || initData.user.id !== user.telegram_id) return null

  sessionStorage.setItem('user', JSON.stringify(initData.user));

  // const userString = sessionStorage.getItem('user');
  // setUser(userString ? JSON.parse(userString) : null);
  console.log(user)
  window.Telegram.WebApp.ready()


  return (
    <BrowserRouter>
      <TelegramProvider initData={initData} colorScheme={colorScheme}>
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
