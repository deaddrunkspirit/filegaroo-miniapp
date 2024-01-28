import { ContentType } from "../../types/content";
import ContentListMoveToFolder from "../lists/ContentListMoveToFolder";
import MoveChooseFolderHeader from '../headers/MoveChooseFolderHeader';
import MoveFooter from '../footers/MoveFooter';
import { useQuery } from "@tanstack/react-query";
import { getContent, getContents } from "../../services/api/apiService";
import { useTelegramContext } from "../../providers/TelegramContext";
import { useEffect, useState } from "react";
import Placeholder from "../placeholders/Placeholder";

type MoveChooseFolderDialogProps = {
    selectedContents: ContentType[];
    parentContentId: number | null;
    onCancel: () => void;
    onEnd: () => void;
}

const MoveChooseFolderDialog: React.FC<MoveChooseFolderDialogProps> = ({ selectedContents, parentContentId, onCancel, onEnd }) => {
    const [folderIdToSave, setFolderIdToSave] = useState<number | null>(parentContentId)
    const [folders, setFolders] = useState<ContentType[]>()
    const { tg } = useTelegramContext();

    const foldersQuery = useQuery<ContentType[], Error>({
        queryKey: ['contents', folderIdToSave],
        queryFn: async () => {
            const res = (await getContents(tg!.access_token, folderIdToSave)).filter(content => content.type === 2)
            setFolders(res)
            return res
        },
    });

    const { data: parent, isPending: parentPending, isError: parentError } = useQuery<ContentType | null, Error>({
        queryKey: ['parent', folderIdToSave],
        queryFn: () => getContent(tg!.access_token, folderIdToSave)
    });

    if (foldersQuery.isPending || foldersQuery.isError || parentPending || parentError || !folders) {
        return <Placeholder/>
    }

    const handleMoveConfirm = () => {
        // TODO Api request to move selectedContents to folderIdToSave
        onEnd();
    }

    const onFolderChanged = (newId: number | null) => {
        setFolderIdToSave(newId)
        foldersQuery.refetch();
    }
    return (
        <div className="absolute flex flex-col items-center justify-start w-dvw h-dvh z-[1100] top-0 left-0 bg-light-primary origin-center">
            <MoveChooseFolderHeader onClose={onCancel} onFolderChanged={onFolderChanged} parent={parent} />
            <div className="flex flex-col items-center justify-start m-0">
                <ContentListMoveToFolder key={folderIdToSave} folders={folders!!} onFolderClicked={onFolderChanged} />
            </div>
            <MoveFooter onMove={handleMoveConfirm} />
        </div>
    )
}

export default MoveChooseFolderDialog;
