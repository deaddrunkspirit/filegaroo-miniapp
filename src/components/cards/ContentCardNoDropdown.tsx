import { getContentImage } from "../../services/imageService";
import { ContentType } from "../../types/content";

interface ContentCardNoDropdownProps {
    content: ContentType;
}
   
const ContentCardNoDropdown: React.FC<ContentCardNoDropdownProps> = ({ content }) => {    
    return (
        <div className="flex flex-col items-center justify-center p-4 gap-2 h-fit w-1/2 rounded-3xl shadow-2xl bg-light-secondary text-light-onsecondary dark:bg-dark-secondary dark:text-dark-onsecondary" >
            <img className=" h-20" src={getContentImage(content)} alt="Content Icon" />
            <p className=" text-md leading-4 line-clamp-2 text-ellipsis overflow-hidden ...">{content.title}</p>
        </div>
      );
};

export default ContentCardNoDropdown
   