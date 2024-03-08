import React from "react";
import { getFolderImage } from "../../services/imageService";

type ContentCardEmptyProps = {
    name: string | null;
}

const ContentCardEmpty: React.FC<ContentCardEmptyProps> = ({ name }) => {
    return (
        <div className="relative z-[1000] flex flex-col items-center text-center justify-center h-[35vw] w-[45.56vw] gap-[2vw] px-[6.67vw] py-[3.35vw] rounded-3xl   bg-light-secondary text-light-onsecondary dark:bg-dark-secondary dark:text-dark-onsecondary" >
            <div className="flex items-center justify-center w-[29.72vw] h-[18.06vw]">
                <img className="max-w-full max-h-full h-auto" src={getFolderImage()} alt="Content Icon" />
            </div>
            <p className="h-[8.06vw] w-[32.22vw] break-all text-sm  line-clamp-2">{name}</p>
        </div>
    );
};

export default ContentCardEmpty;
