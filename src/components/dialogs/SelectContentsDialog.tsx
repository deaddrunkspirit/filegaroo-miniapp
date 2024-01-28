import React, { useState } from "react";
import { ContentType } from "../../types/content";
import ContentListPicker from '../lists/ContentListPicker';
import { useTelegramContext } from "../../providers/TelegramContext";
import { useQuery } from "@tanstack/react-query";
import { getContents } from "../../services/api/apiService";
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

    const onDeleteClicked = () => { 
        setIsDelete(true); 
        document.body.classList.add('overflow-hidden');  
    }
    const onMoveClicked = () => { setIsMove(true) }

    const handleDelete = () => {
        // TODO delete all selected contents
        onClose()
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

    return <div className="absolute flex flex-col items-center justify-start ml-[-8.25vw] mt-[-18.5vw] w-dvw h-dvh z-[1000] top-0 left-0 bg-light-primary origin-center">
        <SelectHeader title={currFolderName} onClose={onClose} />
        <div className="flex flex-col items-center justify-start m-0">
            <ContentListPicker updateSelectedContents={updateSelectedCards} contents={data} />
        </div>
        <SelectButtonsFooter onDelete={onDeleteClicked} onMove={onMoveClicked} />
        {isDelete ? <DeleteAllContentsDialog onCancel={onCancel} onDelete={handleDelete}  /> : null}
        {isMove ? <MoveChooseFolderDialog onCancel={onCancel} onEnd={onClose} selectedContents={selectedContents} parentContentId={content.parent_content_id ?? null} /> : null}
    </div>
}

export default SelectContentsDialog;
