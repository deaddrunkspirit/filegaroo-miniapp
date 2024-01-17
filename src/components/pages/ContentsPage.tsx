import { ContentType } from '../../types/content';
import { getContents } from '../../services/api/apiService';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import ContentList from '../ContentList';
import ContentsPageHeader from '../headers/ContentsPageHeader';
import Placeholder from '../../components/placeholders/Placeholder';
import { useTelegramContext } from '../../providers/TelegramContext';


const ContentsPage: React.FC = () => {
    const { parent_content_id, title } = useParams();
    const parentContentId: number | null = parent_content_id ? parseInt(parent_content_id) : null
    console.log(`params: ${ parent_content_id} ${title}`)
    console.log(title)
    const { tg } = useTelegramContext();

    const {data, isError, isPending} = useQuery<ContentType[], Error>({
            queryKey: ['contents', parentContentId], 
            queryFn: () => getContents(tg!.access_token, parentContentId)
        });
    console.log(data)

    if (isPending) return <Placeholder />
    if (isError) return <Placeholder />

    return (
        <div className='relative flex flex-col justify-start items-center m-0 h-full min-h-dvh bg-light-primary text-light-onprimary dark:bg-dark-primary dark:text-dark-onprimary'>
            <ContentsPageHeader title={title ? title : ''} />
            <ContentList data={data!!} parent_id={parentContentId}></ContentList>
        </div>
    );
}

export default ContentsPage;