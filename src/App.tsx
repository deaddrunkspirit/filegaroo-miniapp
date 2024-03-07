import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FAQPage from './components/pages/FAQPage';
import SettingsPage from './components/pages/SettingsPage';
import ContentsPage from './components/pages/ContentsPage';
import SelectContentsPage from './components/pages/SelectContentsPage';
import MoveContentsPage from './components/pages/MoveContentsPage';
import { DropdownProvider } from './providers/DropdownContext';
import { GAProvider } from './providers/GAContext';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { TelegramProvider } from './providers/TelegramContext';
import { authUser } from './services/api/apiService';
import { useEffect, useState } from 'react';
import Placeholder from './components/placeholders/Placeholder';
import { setLocalizationMap } from './services/languageService';
import { preloadAllImages } from './services/imageService';

declare const window: any;

function App() {
  const [init_data, setInitData] = useState();
  const [isLocalizationLoaded, setIsLocalizationLoaded] = useState<boolean>(false)
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
      await preloadAllImages();
      const res = await authUser(initData);
      setInitData(res);
      await setLocalizationMap(res!.init_data!.user.language_code);
      setIsLocalizationLoaded(true);
    }
    doAuth().catch(console.error)
  }, [])

  if (!window.Telegram.WebApp.isExpanded) {
    window.Telegram.WebApp.expand();
  }

  if (!init_data || !isLocalizationLoaded) {
    return <Placeholder />
  }

  window.Telegram.WebApp.ready()

  return (
    <BrowserRouter>
      <GAProvider>
        <QueryClientProvider client={queryClient}>
          <TelegramProvider colorScheme={colorScheme} tg={init_data} >
            <DropdownProvider>
              <Routes>
                <Route path='/faq' element={<FAQPage />} />
                <Route path='/settings' element={<SettingsPage />} />
                <Route path='/' element={<ContentsPage />} />
                <Route path='/select' element={<SelectContentsPage />} />
                <Route path='/move' element={<MoveContentsPage />} />
                <Route path='/:title/:parent_content_id/' element={<ContentsPage />} />
                <Route path='/:title/:parent_content_id/select' element={<SelectContentsPage />} />
                <Route path='/:title/:parent_content_id/move' element={<MoveContentsPage />} />
              </Routes>
            </DropdownProvider>
          </TelegramProvider>
        </QueryClientProvider>
      </GAProvider>
    </BrowserRouter>
  );
}

export default App;
