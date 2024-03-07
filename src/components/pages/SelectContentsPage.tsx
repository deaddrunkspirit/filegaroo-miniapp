import { deleteAllContents, getContent, getContents } from '../../services/api/apiService';
import React, { useState } from 'react';
import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ContentList from '../lists/ContentList';
import ContentsPageHeader from '../headers/ContentsPageHeader';
import Placeholder from '../../components/placeholders/Placeholder';
import { useTelegramContext } from '../../providers/TelegramContext';
import { ContentType } from '../../types/content';
import { useGA } from '../../providers/GAContext';
import SelectHeader from '../headers/SelectHeader';
import getLocalizationString from '../../services/languageService';
import ContentListPicker from '../lists/ContentListPicker';
import SelectButtonsFooter from '../footers/SelectButtonsFooter';


const SelectContentsPage: React.FC = () => {
    const { parent_content_id = null, title = null } = useParams();
    const parentContentId: number | null = parent_content_id ? parseInt(parent_content_id) : null;
    const location = useLocation();
    const { state } = location;

    console.log(`params: ${parent_content_id} ${title}`)
    console.log(title)
    const { tg } = useTelegramContext();
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [isMove, setIsMove] = useState<boolean>(false);
    const [isSelecting, setIsSelecting] = useState<boolean>(true);
    const [selectedContents, setSelectedContents] = useState<ContentType[]>([state.content])
    const navigate = useNavigate();

    const { sendGAEvent } = useGA();
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: () => deleteAllContents(tg!.access_token, selectedContents.map(content => content.id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['content-page'] })
        }
    })

    const onDeleteClicked = () => {
        if (selectedContents.length < 1) {
            return;
        }
        setIsSelecting(false);
        setIsDelete(true);
        setIsMove(false);
        document.body.classList.add('overflow-hidden');
    }

    const onMoveClicked = () => {
        if (selectedContents.length < 1) {
            return;
        }
        setIsSelecting(false);
        setIsDelete(false);
        setIsMove(true);
        // document.body.classList.remove('overflow-hidden');
        navigate(parent_content_id ? `/${title}/${parent_content_id}/move`: '/move', {state: selectedContents})
    }

    const handleDelete = () => {
        deleteMutation.mutate();
        navigate(-2);
        document.body.classList.remove('overflow-hidden');
        sendGAEvent(tg!!.init_data.user.id, 'WebAppInteraction', `DeleteMultipleContents`);
    }

    const onCancel = () => {
        document.body.classList.remove('overflow-hidden');
        setIsDelete(false)
        setIsMove(false);
        setIsSelecting(true);
    }

    const updateSelectedCards = (content: ContentType, add: boolean) => {
        if (!add) {
            if (!selectedContents.some(item => item.id === content.id)) {
                setSelectedContents(prevState => [...prevState, content]);
            }
        } else {
            setSelectedContents(prevState => prevState.filter(item => item.id !== content.id));
        }
    }

    const { data, isError, isPending } = useQuery<ContentType[], Error>({
        queryKey: ['select', 'contents', parentContentId],
        queryFn: () => getContents(tg!.access_token, parentContentId)
    }
    );


    if (!isPending && !isError) {
        const sortedData = data.sort((a, b) => {
            // First, prioritize type=2 (folders)
            if (a.type === 2 && b.type !== 2) {
                return -1; // Move a to the front
            } else if (b.type === 2 && a.type !== 2) {
                return 1; // Move b to the front
            } else {
                // If types are the same or both are not type=2, maintain original order
                return 0;
            }
        });

        return (
            <div className='flex flex-col justify-start items-center m-0 h-full min-h-dvh bg-light-primary text-light-onprimary dark:bg-dark-primary dark:text-dark-onprimary'>
                <SelectHeader title={getLocalizationString('main-page-name') as string} onClose={() => navigate(-1)} />
                <div className="flex flex-col items-center justify-start m-0">
                    <ContentListPicker updateSelectedContents={updateSelectedCards} contents={sortedData} selected={selectedContents} />
                </div>
                <SelectButtonsFooter onDelete={onDeleteClicked} onMove={onMoveClicked} />
                {/* <ContentsPageHeader title={title ? title : ''} />
            <ContentList parent={contentsQuery[1].data ?? null} data={contentsQuery[0].data!!} parent_id={parentContentId}></ContentList> */}
            </div>
        );
    }
}

export default SelectContentsPage;