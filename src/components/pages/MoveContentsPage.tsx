import { getContent, getContents, moveContents } from '../../services/api/apiService';
import React, { useEffect, useState } from 'react';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ContentType } from '../../types/content';
import Placeholder from '../../components/placeholders/Placeholder';
import { useTelegramContext } from '../../providers/TelegramContext';
import MoveChooseFolderHeader from '../headers/MoveChooseFolderHeader';
import ContentListMoveToFolder from '../lists/ContentListMoveToFolder';
import MoveFooter from '../footers/MoveFooter';
import { useGA } from '../../providers/GAContext';


const MoveContentsPage: React.FC = () => {
    const { parent_content_id = null, title = null } = useParams();
    const navigate = useNavigate();

    // const parentContentId: number | null = parent_content_id ? parseInt(parent_content_id) : null

    const location = useLocation();
    const { state } = location;
    const [folderIdToSave, setFolderIdToSave] = useState<number | null>(null)
    const { tg } = useTelegramContext();
    const { sendGAEvent } = useGA();
    const queryClient = useQueryClient();

    console.log(`params: ${parent_content_id} ${title}`)
    console.log(title)


    useEffect(() => {
        queryClient.invalidateQueries({queryKey: ['move']});
    }, [folderIdToSave])

    const moveMutation = useMutation({
        mutationFn: () => moveContents(tg!.access_token, (state as ContentType[]).map(content => content.id), folderIdToSave),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['content-page', 'contents'] });
            onEnd();
        }
    })

    const moveQuery = useQueries({queries: [
        {
            queryKey: ['move', 'contents-move', folderIdToSave],
            queryFn: async () => getContents(tg!.access_token, folderIdToSave),
        },
        {
            queryKey: ['move', 'parent-move', folderIdToSave],
            queryFn: () => getContent(tg!.access_token, folderIdToSave),
        }
    ]})

    const onEnd = () => {
        navigate(parent_content_id ? `/${title}/${parent_content_id}` : '/')
    }

    const handleMoveConfirm = () => {
        moveMutation.mutate();
        sendGAEvent(tg!!.init_data.user.id, 'WebAppInteraction', `MoveContent`);
    }

    const onFolderChanged = (newId: number | null) => {
        setFolderIdToSave(newId);
    }

    const onHomeClick = () => {
        setFolderIdToSave(null);
    }
    if (moveQuery[0].isPending || moveQuery[0].isPending ||
        moveQuery[1].isError || moveQuery[1].isError || !moveQuery[0].data) {
        return <Placeholder />;
    }

    return (
        <div className='flex flex-col justify-start items-center m-0 h-full min-h-dvh bg-light-primary text-light-onprimary dark:bg-dark-primary dark:text-dark-onprimary'>
            <MoveChooseFolderHeader onClose={onEnd} onHomeClicked={onHomeClick} onFolderChanged={onFolderChanged} parent={moveQuery[1].data ?? null} />
            <div className="flex flex-col items-center justify-start m-0">
                <ContentListMoveToFolder key={folderIdToSave} data={moveQuery[0].data!!} selectedContents={state} onFolderClicked={onFolderChanged} />
            </div>
            <MoveFooter onMove={handleMoveConfirm} />
        </div>
    );
}

export default MoveContentsPage;