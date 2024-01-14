import { useNavigate } from "react-router-dom";
import { getContentImage, getIcon } from "../../services/imageService";
import { ContentType } from "../../types/content";
import DropdownMenu from "../DropdownMenu";
import { useDropdown } from '../../providers/DropdownContext';
import { forwardMessage } from "../../services/api/apiService";
import { useTelegramContext } from "../../providers/TelegramContext";

declare const window: any;

interface ContentCardProps {
    content: ContentType;
}
   
const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
    const { openDropdown, closeDropdown, isOpen } = useDropdown(content.id);
    const { tg, colorScheme } = useTelegramContext();
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
            forwardMessage(tg!.access_token, content.id)

            window.Telegram.WebApp.close()
        }
    }


    return (
        <div onClick={content.type === 2 ? handleFolderClick : handleMessageClick} 
                className='relative flex flex-col items-center justify-start pt-3 pb-2 px-4 gap-2 w-[40vw] max-w-40 h-28 rounded-3xl shadow-2xl bg-light-secondary text-light-onsecondary  dark:bg-dark-secondary dark:text-dark-onsecondary m-0' 
            >
            <div className="flex items-center min-h-18 justify-center">
                <img className='' src={getContentImage(content)} alt="Content Icon" />
            </div>
            <p className="grow break-all text-md leading-4 line-clamp-2 text-ellipsis overflow-hidden ...">{content.title}</p>
            <div className="absolute w-12 h-12 p-4 top-0 right-0 rounded-md" onClick={handleDropdown}>
                <img src={getIcon('dropdown', colorScheme!)} alt=". . ."/>
            </div>
            {isOpen && <DropdownMenu content={content} />}
        </div> 
      );
};

export default ContentCard
   