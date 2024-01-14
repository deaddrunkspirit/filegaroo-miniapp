import React from 'react';
import MainPageHeader from '../headers/MainPageHeader';
import ContentList from '../ContentList';
import { ContentType } from '../../types/content';
import { getContents } from '../../services/api/apiService';
import { useQuery } from '@tanstack/react-query';
import Placeholder from '../../components/placeholders/Placeholder';
import { useTelegramContext } from '../../providers/TelegramContext';


const MainPage: React.FC = () => {
  const { tg } = useTelegramContext();
  console.log(tg)
  const { data, isError } = useQuery<ContentType[], Error>({ 
      queryKey: ['contents'], 
      queryFn: () => getContents(tg!.access_token) 
    });
  console.log(data)
  if (data) {
    return (
      <div className='relative flex flex-col justify-start h-full min-h-dvh gap-4 m-0 p-4 bg-light-primary text-light-onprimary dark:bg-dark-primary dark:text-dark-onprimary'>
        <MainPageHeader />
        <ContentList data={data} parent_id={null} />
      </div>
    );
  }

  if (isError) return <Placeholder text='Error fetching data' />
  return <Placeholder text='Loading . . .' />
}

export default MainPage;