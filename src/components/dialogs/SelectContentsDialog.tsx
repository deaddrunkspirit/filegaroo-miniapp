import React from "react";
import { ContentType } from "../../types/content";
import ContentListPicker from '../lists/ContentListPicker';
import { useTelegramContext } from "../../providers/TelegramContext";
import { useQuery } from "@tanstack/react-query";
import { getContents } from "../../services/api/apiService";
import SelectHeader from "../headers/SelectHeader";
import Placeholder from "../placeholders/Placeholder";
import SelectButtonsFooter from '../footers/SelectButtonsFooter';

type SelectContentsDialogProps = {
    content: ContentType;
    currFolderName: string;
    onClose: () => void;
}

const SelectContentsDialog: React.FC<SelectContentsDialogProps> = ({currFolderName, content, onClose}) => {
    const parentContentId = content.parent_content_id;
    const { tg } = useTelegramContext();

    const {data, isError, isPending} = useQuery<ContentType[], Error>({
            queryKey: ['contents', parentContentId], 
            queryFn: () => getContents(tg!.access_token, parentContentId)
        }
    );

    if (isPending) return <Placeholder />
    if (isError) return <Placeholder />
    

    return <div className="absolute flex flex-col items-center justify-start ml-[-8.25vw] mt-[-18.5vw] w-dvw h-dvh z-[1000] top-0 left-0 bg-light-primary origin-center">
        <SelectHeader title={currFolderName} onClose={onClose}/>
        <div className="flex flex-col items-center justify-start m-0">
            <ContentListPicker contents={data}/>
        </div>
        <SelectButtonsFooter/>
    </div>
}

export default SelectContentsDialog;
