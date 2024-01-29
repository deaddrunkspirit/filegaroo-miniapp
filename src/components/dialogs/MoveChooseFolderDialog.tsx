import { ContentType } from "../../types/content";
import ContentListMoveToFolder from "../lists/ContentListMoveToFolder";
import MoveChooseFolderHeader from '../headers/MoveChooseFolderHeader';
import MoveFooter from '../footers/MoveFooter';
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getContent, getContents, moveContents } from "../../services/api/apiService";
import { useTelegramContext } from "../../providers/TelegramContext";
import { useState } from "react";
import Placeholder from "../placeholders/Placeholder";

type MoveChooseFolderDialogProps = {
    selectedContents: ContentType[];
    parentContentId: number | null;
    onEnd: () => void;
}

const MoveChooseFolderDialog: React.FC<MoveChooseFolderDialogProps> = ({ selectedContents, parentContentId, onEnd }) => {
    const [folderIdToSave, setFolderIdToSave] = useState<number | null>(parentContentId)
    const [folders, setFolders] = useState<ContentType[]>()
    const { tg } = useTelegramContext();
    const queryClient = useQueryClient();

    const moveMutation = useMutation({
        mutationFn: () => moveContents(tg!.access_token, selectedContents.map(content => content.id), folderIdToSave),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contents-move', folderIdToSave] });
            queryClient.invalidateQueries({ queryKey: ['parent-move', folderIdToSave] });
            queryClient.invalidateQueries({ queryKey: ['contents'] });
            queryClient.invalidateQueries({ queryKey: ['parent'] });
            onEnd();
        }
    })

    const foldersQuery = useQuery<ContentType[], Error>({
        queryKey: ['contents-move', folderIdToSave],
        queryFn: async () => {
            const allFolders = (await getContents(tg!.access_token, folderIdToSave)).filter(content => content.type === 2)
            const res = allFolders.filter(folder => folder.type === 2 && !selectedContents.some(selectedContent => selectedContent.id === folder.id));
            setFolders(res)
            return res
        },
    });

    const parentQuery = useQuery<ContentType | null, Error>({
        queryKey: ['parent-move', folderIdToSave],
        queryFn: () => getContent(tg!.access_token, folderIdToSave)
    });


    const handleMoveConfirm = () => {
        moveMutation.mutate();
    }

    const onFolderChanged = (newId: number | null) => {
        console.log(newId);
        setFolderIdToSave(newId);
        foldersQuery.refetch();
        parentQuery.refetch();
    }
    if (!foldersQuery.isPending && !parentQuery.isPending && !parentQuery.isError && !foldersQuery.isError) {
        return (
            <div className="absolute flex flex-col items-center justify-start w-dvw h-[125%] z-[1300] top-0 left-0 bg-light-primary dark:bg-dark-primary origin-center">
                <MoveChooseFolderHeader onClose={onEnd} onFolderChanged={onFolderChanged} parent={parentQuery.data} />
                <div className="flex flex-col items-center justify-start m-0">
                    <ContentListMoveToFolder key={folderIdToSave} folders={folders!!} onFolderClicked={onFolderChanged} />
                </div>
                <MoveFooter onMove={handleMoveConfirm} />
            </div>
        )
    }
    return <Placeholder />
}

export default MoveChooseFolderDialog;
