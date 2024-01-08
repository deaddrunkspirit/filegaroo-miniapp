import { useNavigate } from "react-router-dom";
import { getIconPath } from "../../services/utils";
import { ContentType } from "../../types/content";
import DropdownMenu from "../DropdownMenu";
import { useDropdown } from '../../providers/DropdownContext';
import { forwardMessage } from "services/api/apiService";

declare const window: any;

interface ContentCardProps {
    content: ContentType;
}
   
const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
    const { openDropdown, closeDropdown, isOpen } = useDropdown(content.id);

    const shortlink = `/${content.title}/${content.id}`
    const navigate = useNavigate();
    
    const handleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation();
        openDropdown();
    }

    const handleFolderClick = () => {
        if (!isOpen) {
            closeDropdown();
            navigate(shortlink);
        }
    }

    const handleMessageClick = () => {
        if (!isOpen) {
            closeDropdown();
            forwardMessage(content.id)

            window.Telegram.WebApp.close()
        }
    }


    return (
        <div onClick={
            content.type === 2 ? 
                handleFolderClick : 
                handleMessageClick} className='relative flex flex-col items-center justify-center px-4 pb-2 gap-2 pt-6 h-fit w-5/12 rounded-3xl shadow-2xl bg-light-secondary text-light-onsecondary dark:bg-dark-secondary dark:text-dark-onsecondary m-0' 
            >
            <div className="flex items-center justify-center h-full">
                <img className='h-full w-full' src={getIconPath(content)} alt="Content Icon" />
            </div>
            <div className="flex items-center justify-center h-8 w-fit">
                <p className=" text-md leading-4 line-clamp-2 text-ellipsis overflow-hidden ...">{content.title}</p>
            </div>
            <div className="absolute w-12 h-12 p-4 top-0 right-0 rounded-md" onClick={handleDropdown}>
                <img src="/icons/dropdown-icon.svg" alt=". . ."/>
            </div>
            {isOpen && <DropdownMenu content={content} />}
        </div> 
      );
};

export default ContentCard
   