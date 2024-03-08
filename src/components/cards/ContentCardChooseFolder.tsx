import React from "react";
import { ContentType } from "../../types/content";
import { getContentImage } from '../../services/imageService';


type ContentCardChooseFolderProps = {
    folder: ContentType;
    onFolderClick: (newId: number | null) => void;
}

const ContentCardChooseFolder: React.FC<ContentCardChooseFolderProps> = ({ folder, onFolderClick }) => {

    const handleCardClicked = () => {
        console.log(folder.id);
        onFolderClick(folder.id);
    }

    return (
        <>
            <div onClick={handleCardClicked}
                className='relative z-20 flex flex-col gap-[2vw] items-center text-center justify-start w-[39vw] h-[32vw] px-[3.8vw] pb-[2.56vw] pt-[5.475vw] rounded-3xl dark:drop-shadow-xl bg-light-secondary text-light-onsecondary  dark:bg-dark-secondary dark:text-dark-onsecondary m-0 shadow-lg shadow-gray-400 dark:shadow-black'
            >
                <div className="flex items-center w-[22vw] h-[13.5vw] justify-center">
                    <img className='max-w-full max-h-full h-auto' src={getContentImage(folder)} alt="Content Icon" />
                </div>
                <p className='break-all text-sm line-clamp-2 '>
                    {folder.title}
                </p>
            </div>
        </>
    );
}

export default ContentCardChooseFolder;
