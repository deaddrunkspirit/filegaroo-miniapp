import React, { useState } from "react";
import { ContentType } from "../../types/content";
import ContentListPicker from '../lists/ContentListPicker';
import { useTelegramContext } from "../../providers/TelegramContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteAllContents, getContents } from "../../services/api/apiService";
import SelectHeader from "../headers/SelectHeader";
import Placeholder from "../placeholders/Placeholder";
import SelectButtonsFooter from '../footers/SelectButtonsFooter';
import DeleteAllContentsDialog from '../dialogs/DeleteAllContentsDialog';
import MoveChooseFolderDialog from '../dialogs/MoveChooseFolderDialog';

type SelectContentsDialogProps = {
    content: ContentType;
    currFolderName: string;
    onClose: () => void;
}

const SelectContentsDialog: React.FC<SelectContentsDialogProps> = ({ currFolderName, content, onClose }) => {
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [isMove, setIsMove] = useState<boolean>(false);
    const [selectedContents, setSelectedContents] = useState<ContentType[]>([])
    const parentContentId = content.parent_content_id;
    const { tg } = useTelegramContext();
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: () => deleteAllContents(tg!.access_token, selectedContents.map(content => content.id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contents'] });
            queryClient.invalidateQueries({ queryKey: ['contents', parentContentId] });
        }
    })

    const onDeleteClicked = () => {
        setIsDelete(true);
        document.body.classList.add('overflow-hidden');
    }

    const onMoveClicked = () => { 
        setIsDelete(false);
        setIsMove(true);
        document.body.classList.remove('overflow-hidden');
    }

    const handleDelete = () => {
        deleteMutation.mutate();
        onClose();
        document.body.classList.remove('overflow-hidden');
    }

    const onCancel = () => {
        document.body.classList.remove('overflow-hidden');
        setIsDelete(false)
        setIsMove(false);
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
        queryKey: ['contents', parentContentId],
        queryFn: () => getContents(tg!.access_token, parentContentId)
    }
    );

    if (isPending) return <Placeholder />
    if (isError) return <Placeholder />

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

    return <div className="absolute flex flex-col items-center justify-start ml-[-8.25vw] mt-[-18.5vw] w-dvw h-dvh z-[1000] top-0 left-0 bg-light-primary origin-center">
        <SelectHeader title={currFolderName} onClose={onClose} />
        <div className="flex flex-col items-center justify-start m-0">
            <ContentListPicker updateSelectedContents={updateSelectedCards} contents={sortedData} />
        </div>
        <SelectButtonsFooter onDelete={onDeleteClicked} onMove={onMoveClicked} />
        {isDelete ? <DeleteAllContentsDialog onCancel={onCancel} onDelete={handleDelete} /> : null}
        {isMove ? <MoveChooseFolderDialog onEnd={onClose} selectedContents={selectedContents} parentContentId={content.parent_content_id ?? null} /> : null}
    </div>
}

export default SelectContentsDialog;
