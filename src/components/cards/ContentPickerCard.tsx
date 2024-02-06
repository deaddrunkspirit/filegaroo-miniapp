import React, { useState } from "react";
import { ContentType } from "../../types/content";
import { getContentImage, getIcon } from '../../services/imageService';
import { useTelegramContext } from "../../providers/TelegramContext";


type ContentPickerCardProps = {
    content: ContentType;
    updateSelectedCards: (content: ContentType, add: boolean) => void;
    isSelected: boolean;
}

const ContentPickerCard: React.FC<ContentPickerCardProps> = ({ content, isSelected, updateSelectedCards }) => {
    const [checked, setChecked] = useState<boolean>(isSelected);
    const { colorScheme } = useTelegramContext();

    const onCheckedChange = () => {
        setChecked(!checked)
        updateSelectedCards(content, checked)
    }

    return <>
        <div
            onClick={onCheckedChange}
            className='relative z-20 flex flex-col gap-[2vw] items-center text-center justify-start w-[39vw] h-[32vw] px-[3.8vw] pb-[2.56vw] pt-[5.475vw] rounded-3xl dark:drop-shadow-xl bg-light-secondary text-light-onsecondary  dark:bg-dark-secondary dark:text-dark-onsecondary m-0 shadow-lg shadow-gray-400 dark:shadow-black'
        >
            <div className="flex items-center w-[22vw] h-[13.5vw] justify-center">
                <img className='max-w-full max-h-full h-auto' src={getContentImage(content)} alt="Content Icon" />
            </div>
            <p className='break-all text-sm line-clamp-2 '>
                {content.title}
            </p>
            <div className="absolute dark:absolute mt-[2vw] flex items-center justify-center w-[12vw] h-[7vw] top-0 right-0 rounded-md">
                <div className="w-[5.56vw] h-[5.56vw]">
                    <img src={checked ? getIcon('select-checked', colorScheme!) : getIcon('select-empty', colorScheme!)}/>
                </div>
            </div>
        </div>

    </>
}

export default ContentPickerCard;
