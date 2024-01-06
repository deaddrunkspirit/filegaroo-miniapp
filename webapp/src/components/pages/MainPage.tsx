import React from 'react';
import MainPageHeader from '../headers/MainPageHeader';
import ContentList from '../ContentList';
import { ContentType } from '../../types/content';
import { getContents } from '../../services/api/apiService';
import { useQuery } from '@tanstack/react-query';
import Placeholder from 'components/placeholders/Placeholder';


const MainPage: React.FC = () => {
  const userString = sessionStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const { data, isError } = useQuery<ContentType[], Error>({ queryKey: ['contents', user.id], queryFn: () => getContents(user.id) });
  
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