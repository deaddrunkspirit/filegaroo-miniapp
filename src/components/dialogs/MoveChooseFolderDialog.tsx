import { ContentType } from "../../types/content";
import ContentListMoveToFolder from "../lists/ContentListMoveToFolder";
import MoveChooseFolderHeader from '../headers/MoveChooseFolderHeader';
import MoveFooter from '../footers/MoveFooter';
import { useQueryClient, useMutation, useQueries } from "@tanstack/react-query";
import { getContent, getContents, moveContents } from "../../services/api/apiService";
import { useTelegramContext } from "../../providers/TelegramContext";
import { useEffect, useState } from "react";
import Placeholder from "../placeholders/Placeholder";

type MoveChooseFolderDialogProps = {
    selectedContents: ContentType[];
    onEnd: () => void;
}

const MoveChooseFolderDialog: React.FC<MoveChooseFolderDialogProps> = ({ selectedContents, onEnd }) => {
    const [folderIdToSave, setFolderIdToSave] = useState<number | null>(null)
    const { tg } = useTelegramContext();
    const queryClient = useQueryClient();

    useEffect(() => {
        queryClient.invalidateQueries({queryKey: ['move']});
    }, [folderIdToSave])

    const moveMutation = useMutation({
        mutationFn: () => moveContents(tg!.access_token, selectedContents.map(content => content.id), folderIdToSave),
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

    // const foldersQuery = useQuery<ContentType[], Error>({
    //     queryKey: ['contents-move', folderIdToSave],
    //     queryFn: async () => {
    //         const allFolders = (await getContents(tg!.access_token, folderIdToSave)).filter(content => content.type === 2)
    //         const res = allFolders.filter(folder => folder.type === 2 && !selectedContents.some(selectedContent => selectedContent.id === folder.id));
    //         setFolders(res)
    //         return res
    //     },
    // });

    // const parentQuery = useQuery<ContentType | null, Error>({
    //     queryKey: ['parent-move', folderIdToSave],
    //     queryFn: () => getContent(tg!.access_token, folderIdToSave)
    // });


    const handleMoveConfirm = () => {
        moveMutation.mutate();
    }

    const onFolderChanged = (newId: number | null) => {
        setFolderIdToSave(newId);
    }

    const onHomeClick = () => {
        setFolderIdToSave(null);
    }

    if (!moveQuery[0].isPending && !moveQuery[1].isPending && !moveQuery[1].isError && !moveQuery[0].isError) {
        return (
            <div className="absolute flex flex-col items-center justify-start w-dvw h-[125%] z-[1300] top-0 left-0 bg-light-primary dark:bg-dark-primary origin-center">
                <MoveChooseFolderHeader onClose={onEnd} onHomeClicked={onHomeClick} onFolderChanged={onFolderChanged} parent={moveQuery[1].data} />
                <div className="flex flex-col items-center justify-start m-0">
                    <ContentListMoveToFolder key={folderIdToSave} data={moveQuery[0].data} selectedContents={selectedContents} onFolderClicked={onFolderChanged} />
                </div>
                <MoveFooter onMove={handleMoveConfirm} />
            </div>
        )
    }
    return <Placeholder />
}

export default MoveChooseFolderDialog;
