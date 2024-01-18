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
        <>
        <div onClick={content.type === 2 ? handleFolderClick : handleMessageClick} 
                className='relative z-20 flex flex-col gap-[2vw] items-center justify-center w-[39vw] h-[31vw] px-[3.8vw] pb-[2.56vw] pt-[5.475vw] rounded-3xl dark:drop-shadow-xl bg-light-secondary text-light-onsecondary  dark:bg-dark-secondary dark:text-dark-onsecondary m-0 shadow-lg shadow-gray-400 dark:shadow-black' 
            >
            <div className="flex items-center w-[22vw] h-[13.5vw] justify-center">
                <img className='max-w-full max-h-full h-auto' src={getContentImage(content)} alt="Content Icon" />
            </div>
            <p className='flex grow break-all h-[7.2vw] text-sm leading-[3.70vw] line-clamp-2 text-ellipsis overflow-hidden ...'>
                {content.title}
            </p>
            <div className="absolute dark:absolute flex items-center justify-center w-[12vw] h-[7vw] top-0 right-0 rounded-md" onClick={handleDropdown}>
                <img src={getIcon('dropdown', colorScheme!)} alt="..."/>
            </div>
        </div> 

        {isOpen && <DropdownMenu content={content} />}
        </>
      );
};

export default ContentCard
   