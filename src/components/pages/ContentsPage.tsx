import { getContent, getContents } from '../../services/api/apiService';
import React from 'react';
import { useQueries } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import ContentList from '../lists/ContentList';
import ContentsPageHeader from '../headers/ContentsPageHeader';
import Placeholder from '../../components/placeholders/Placeholder';
import { useTelegramContext } from '../../providers/TelegramContext';
import MainPageHeader from '../headers/MainPageHeader';


const ContentsPage: React.FC = () => {
    const { parent_content_id = null, title = null } = useParams();
    const parentContentId: number | null = parent_content_id ? parseInt(parent_content_id) : null
    const { tg } = useTelegramContext();

    const contentsQuery = useQueries({
        queries: [{
            queryKey: ['content-page', 'contents', parentContentId],
            queryFn: () => getContents(tg!.access_token, parentContentId)
        }, {
            queryKey: ['content-page', 'parent', parentContentId],
            queryFn: () => getContent(tg!.access_token, parentContentId)
        }
        ]
    });

    if (!contentsQuery[0].isPending && !contentsQuery[0].isPending &&
        !contentsQuery[1].isError && !contentsQuery[1].isError) {

        return (
            <div className='flex flex-col justify-start items-center m-0 h-full min-h-dvh bg-light-primary text-light-onprimary dark:bg-dark-primary dark:text-dark-onprimary'>
                {parent_content_id ?
                    <ContentsPageHeader title={title ? title : ''} /> :
                    <MainPageHeader />
                }
                <ContentList parent={contentsQuery[1].data ?? null} data={contentsQuery[0].data!!} parent_id={parentContentId}></ContentList>
            </div>
        );
    }
    return <Placeholder />;
}

export default ContentsPage;
