import React from "react";
import { ContentType } from "../../types/content";
import ContentPickerCard from "../cards/ContentPickerCard";


type ContentListMoveToFolderProps = {
    contents: ContentType[];
    updateSelectedContents: (content: ContentType, add: boolean) => void;
}

const ContentListPicker: React.FC<ContentListMoveToFolderProps> = ({contents, updateSelectedContents}) => {
    return <>
        <div className='relative z-10 flex flex-wrap justify-start pb-[20vh] gap-[5vw] w-[83.5vw] h-full list-none'>
            {contents.map((content) => (
                <ContentPickerCard key={content.id} content={content} updateSelectedCards={updateSelectedContents} />
            ))}
        </div>
    </>
}

export default ContentListPicker;
