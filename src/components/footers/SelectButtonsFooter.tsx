import React, { useState } from 'react';
import { useTelegramContext } from '../../providers/TelegramContext';
import DeleteAllContentsDialog from '../dialogs/DeleteAllContentsDialog';
import { getIcon } from '../../services/imageService';


type SelectButtonsFooterProps = {
    onDelete: () => void;
    onMove: () => void;
}

const SelectButtonsFooter: React.FC<SelectButtonsFooterProps> = ({ onMove, onDelete }) => {
    const { colorScheme } = useTelegramContext();
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    return (
        <>
            <div className="fixed z-[1002] bottom-[10vw] left-0 flex flex-row justify-between w-full h-[18.5vw] px-[8vw] gap-[4.72vw] text-light-onprimary dark:text-dark-onprimary">
                <div onClick={() => setIsDeleting(true)} className='flex items-center justify-center bg-opacity-80 dark:bg-opacity-80 bg-light-primary dark:bg-dark-primary h-[19.45vw] w-[19.45vw] rounded-full dark:drop-shadow-xl shadow-lg shadow-gray-400 dark:shadow-black'>
                    <img className="h-[6.11vw] w-[6.11vw] m-0" src={getIcon('delete-primary', colorScheme!)} alt="FAQ" />
                </div>
                <div onClick={onMove} className='flex items-center justify-center bg-opacity-80 dark:bg-opacity-80 bg-light-primary dark:bg-dark-primary h-[19.45vw] w-[19.45vw] rounded-full dark:drop-shadow-xl shadow-lg shadow-gray-400 dark:shadow-black'>
                    <img className="h-[6.11vw] w-[6.11vw] m-0" src={getIcon('move', colorScheme!)} alt="FAQ" />
                </div>
            </div>
            {isDeleting ? <DeleteAllContentsDialog onDelete={() => {setIsDeleting(false); onDelete();}} onCancel={() => setIsDeleting(false)} /> : null}
        </>

    );
}

export default SelectButtonsFooter;