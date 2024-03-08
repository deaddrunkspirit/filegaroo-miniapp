import React from 'react';
import { useTelegramContext } from '../../providers/TelegramContext';
import { getIcon } from '../../services/imageService';

type SelectHeaderProps = {
    onClose: () => void;
    title: string;
}

const SelectHeader: React.FC<SelectHeaderProps> = ({ onClose, title }) => {
    const { colorScheme } = useTelegramContext();

    return (
        <div className="flex flex-row self-start items-center w-full h-[18.5vw] pl-[8vw] pt-[6.39vw] pr-[7.22vw] pb-[5.56vw] gap-[4.72vw] bg-light-primary text-light-onprimary dark:bg-dark-primary dark:text-dark-onprimary">
            <h1 className='text-lg w-[59.72vw] line-clamp-2 text-light-onprimary dark:text-dark-onprimary'>{title}</h1>
            <div className='grow' />
            <div onClick={onClose}>
                <img className="h-[5vw] w-[5vw] m-0" src={getIcon('close-page', colorScheme!)} alt="close" />
            </div>
        </div>
    );
}

export default SelectHeader;