import { ContentType } from '../../types/content';
import { getContents } from '../../services/api/apiService';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import ContentList from '../ContentList';
import ContentsPageHeader from '../headers/ContentsPageHeader';
import Placeholder from 'components/placeholders/Placeholder';


const ContentsPage: React.FC = () => {
    const { parent_content_id, title } = useParams();
    const parentContentId: number | null = parent_content_id ? parseInt(parent_content_id) : null
    console.log(`params: ${ parent_content_id} ${title}`)
    console.log(title)
    const userString = sessionStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const {data, isError, isPending} = useQuery<ContentType[], Error>({queryKey: ['contents', user.id, parentContentId], queryFn: () => getContents(user.id, parentContentId)});
    console.log(data)

    if (isPending) return <Placeholder text='Loading . . .'/>
    if (isError) return <Placeholder text='Error fetching data'/>

    return (
        <div className='relative flex flex-col justify-start gap-4 m-0 p-4 h-full min-h-dvh bg-light-primary text-light-onprimary dark:bg-dark-primary dark:text-dark-onprimary'>
            <ContentsPageHeader title={title ? title : ''} />
            <ContentList data={data!!} parent_id={parentContentId}></ContentList>
        </div>
    );
}

export default ContentsPage;