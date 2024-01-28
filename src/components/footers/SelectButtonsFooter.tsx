import React from 'react';
import { useTelegramContext } from '../../providers/TelegramContext';
import { getIcon } from '../../services/imageService';


type SelectButtonsFooterProps = {
    onDelete: () => void;
    onMove: () => void;
}

const SelectButtonsFooter: React.FC<SelectButtonsFooterProps> = ({onMove, onDelete}) => {
  const { colorScheme } = useTelegramContext();

  return (
    <div className="fixed z-[1002] bottom-[10vw] left-0 flex flex-row justify-between w-full h-[18.5vw] pl-[8vw] pt-[6.39vw] pr-[7.22vw] pb-[5.56vw] gap-[4.72vw] text-light-onprimary dark:text-dark-onprimary">
      <div onClick={onDelete} className='flex items-center justify-center bg-opacity-80 dark:bg-opacity-80 bg-light-primary dark:bg-dark-primary h-[19.45vw] w-[19.45vw] rounded-full dark:drop-shadow-xl shadow-lg shadow-gray-400 dark:shadow-black'>
        <img className="h-[6.11vw] w-[6.11vw] m-0" src={getIcon('delete-primary', colorScheme!)} alt="FAQ" />
      </div>
      <div onClick={onMove} className='flex items-center justify-center bg-opacity-80 dark:bg-opacity-80 bg-light-primary dark:bg-dark-primary h-[19.45vw] w-[19.45vw] rounded-full dark:drop-shadow-xl shadow-lg shadow-gray-400 dark:shadow-black'>
        <img className="h-[6.11vw] w-[6.11vw] m-0" src={getIcon('move', colorScheme!)} alt="FAQ" />
      </div>
    </div>
  );
}

export default SelectButtonsFooter;