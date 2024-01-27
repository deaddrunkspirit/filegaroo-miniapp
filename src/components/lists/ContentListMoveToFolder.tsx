import React from "react";
import { ContentType } from '../../types/content'
import ContentCardChooseFolder from "../cards/ContentCardChooseFolder";

type ContentListMoveToFolderProps = {
    folders: ContentType[];
}


const ContentListMoveToFolder: React.FC<ContentListMoveToFolderProps> = ({ folders }) => {
    return <>
        <div className='relative z-10 flex flex-wrap justify-start pb-[20vh] gap-[5vw] w-[83.5vw] h-full list-none'>
            {folders.map((folder) => (
                <ContentCardChooseFolder folder={folder} />
            ))}
        </div>
    </>
}

export default ContentListMoveToFolder;
