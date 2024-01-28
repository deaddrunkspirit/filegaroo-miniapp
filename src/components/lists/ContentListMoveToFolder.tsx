import React from "react";
import { ContentType } from '../../types/content'
import ContentCardChooseFolder from "../cards/ContentCardChooseFolder";

type ContentListMoveToFolderProps = {
    folders: ContentType[];
    onFolderClicked: (newId: number | null) => void;
}


const ContentListMoveToFolder: React.FC<ContentListMoveToFolderProps> = ({ folders, onFolderClicked }) => {
    return <>
        <div className='relative z-10 flex flex-wrap justify-start pb-[20vh] gap-[5vw] w-[83.5vw] h-full list-none'>
            {folders.map((folder) => (
                <ContentCardChooseFolder key={folder.id} folder={folder} onFolderClick={onFolderClicked} />
            ))}
        </div>
    </>
}

export default ContentListMoveToFolder;
