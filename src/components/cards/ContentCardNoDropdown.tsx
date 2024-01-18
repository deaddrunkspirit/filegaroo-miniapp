import { getContentImage } from "../../services/imageService";
import { ContentType } from "../../types/content";

interface ContentCardNoDropdownProps {
    content: ContentType;
}
   
const ContentCardNoDropdown: React.FC<ContentCardNoDropdownProps> = ({ content }) => {    
    return (
        <div className="relative z-[1000] flex flex-col items-center justify-center h-[35vw] w-[45.56vw] gap-[2vw] px-[6.67vw] py-[3.35vw] rounded-3xl   bg-light-secondary text-light-onsecondary dark:bg-dark-secondary dark:text-dark-onsecondary" >
            <div className="w-[29.72vw] h-[18.06vw]">
                <img className="h-full w-full" src={getContentImage(content)} alt="Content Icon" />
            </div>
            <p className="flex items-center justify-center h-[8.06vw] w-[32.22vw] break-all text-sm leading-[4vw] line-clamp-2 text-ellipsis overflow-hidden ...">{content.title}</p>
        </div>
      );
};

export default ContentCardNoDropdown
   