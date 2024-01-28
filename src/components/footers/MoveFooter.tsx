import React from 'react';
import getLocalizationString from '../../services/languageService';


type MoveFooterProps = {
    onMove: () => void;
}

const MoveFooter: React.FC<MoveFooterProps> = ({onMove}) => {
  return (
    <div className="fixed z-[1105] bottom-[10vw] left-0 flex flex-row justify-center w-full h-[18.5vw] pl-[8vw] pt-[6.39vw] pr-[7.22vw] pb-[5.56vw] gap-[4.72vw] text-light-onprimary dark:text-dark-onprimary">
      <div onClick={onMove} className='flex items-center justify-center bg-opacity-80 dark:bg-opacity-80 bg-light-primary dark:bg-dark-primary h-[10vw] w-[50vw] rounded-3xl dark:drop-shadow-xl shadow-lg shadow-gray-400 dark:shadow-black'>
        <p>{getLocalizationString('move') as string}</p>
      </div>
    </div>
  );
}

export default MoveFooter;