import React from "react";
import { ContentType } from "../../types/content";
import ContentPickerCard from "../cards/ContentPickerCard";


type ContentListMoveToFolderProps = {
    contents: ContentType[];
    updateSelectedContents: (content: ContentType, add: boolean) => void;
    selected: ContentType;
}

const ContentListPicker: React.FC<ContentListMoveToFolderProps> = ({ contents, selected, updateSelectedContents }) => {
    return <>
        <div className='relative z-10 flex flex-wrap justify-start pb-[20vh] gap-[5vw] w-[83.5vw] h-full list-none'>
            {contents.map((content) => {
                const isSelected = content === selected;
                console.log(isSelected);
                return (
                    <ContentPickerCard key={content.id} isSelected={isSelected} content={content} updateSelectedCards={updateSelectedContents} />
                )
            }
            )}
        </div>
    </>
}

export default ContentListPicker;
