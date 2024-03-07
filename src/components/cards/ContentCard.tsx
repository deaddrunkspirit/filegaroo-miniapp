import { useNavigate } from "react-router-dom";
import { getContentImage, getIcon } from "../../services/imageService";
import { ContentType } from "../../types/content";
import DropdownMenu from "../menus/DropdownMenu";
import { useDropdown } from '../../providers/DropdownContext';
import { forwardMessage } from "../../services/api/apiService";
import { useTelegramContext } from "../../providers/TelegramContext";
import getLocalizationString from "../../services/languageService";
import { useGA } from "../../providers/GAContext";

declare const window: any;

type ContentCardProps = {
    content: ContentType;
    parent: ContentType | null;
}
   
const ContentCard: React.FC<ContentCardProps> = ({ content, parent }) => {
    const { openDropdown, closeDropdown, isOpen } = useDropdown(content.id);
    const { tg, colorScheme } = useTelegramContext();
    const { sendGAEvent } = useGA();
    
    const shortlink = `/${content.title}/${content.id}`
    const navigate = useNavigate();
    
    const handleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation();
        openDropdown();
    }

    const handleFolderClick = () => {
        if (!isOpen) {
            closeDropdown();
            navigate(shortlink, {state: content});
        }
    }

    const handleMessageClick = () => {
        if (!isOpen) {
            closeDropdown();
            forwardMessage(tg!.access_token, content.id)
            sendGAEvent(tg!!.init_data.user.id, 'WebAppInteraction', `MessageSendToChat` )
            window.Telegram.WebApp.close()
        }
    }


    return (
        <>
        <div onClick={content.type === 2 ? handleFolderClick : handleMessageClick} 
                className='relative z-20 flex flex-col gap-[2vw] items-center text-center justify-start w-[39vw] h-[32vw] px-[3.8vw] pb-[2.56vw] pt-[5.475vw] rounded-3xl bg-light-secondary text-light-onsecondary  dark:bg-dark-secondary dark:text-dark-onsecondary m-0 dark:drop-shadow-xl shadow-lg shadow-gray-400 dark:shadow-black' 
            >
            <div className="flex items-center w-[22vw] h-[13.5vw] justify-center">
                <img className='max-w-full max-h-full h-auto' src={getContentImage(content)} alt="Content Icon" />
            </div>
            <p className='break-all text-sm line-clamp-2 '>
                {content.title}
            </p>
            <div className="absolute dark:absolute flex items-center justify-center w-[12vw] h-[7vw] top-0 right-0 rounded-md" onClick={handleDropdown}>
                <img src={getIcon('dropdown', colorScheme!)} alt="..."/>
            </div>
        </div> 

        {isOpen && <DropdownMenu currFolderName={parent ? parent.title : getLocalizationString('main-page-name') as string} content={content} />}
        </>
      );
};

export default ContentCard
   