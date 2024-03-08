import React from "react";
import { ContentType } from '../../types/content'
import ContentCardChooseFolder from "../cards/ContentCardChooseFolder";

type ContentListMoveToFolderProps = {
    data: ContentType[];
    selectedContents: ContentType[];
    onFolderClicked: (newId: number | null) => void;
}

const ContentListMoveToFolder: React.FC<ContentListMoveToFolderProps> = ({ data, selectedContents, onFolderClicked }) => {
    const folders = data.filter(content => content.type === 2)
        .filter(folder => folder.type === 2 &&
            !selectedContents.some(selectedContent =>
                selectedContent.id === folder.id)
        );

    return (
        <>
            <div id='move-content-list' className='relative z-10 flex flex-wrap justify-start pb-[20vh] gap-[5vw] w-[83.5vw] h-full list-none'>
                {folders.map((folder) => (
                    <ContentCardChooseFolder key={folder.id} folder={folder} onFolderClick={onFolderClicked} />
                ))}
            </div>
        </>
    );
}

export default ContentListMoveToFolder;
