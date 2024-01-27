import React from 'react';
import getLocalizationString from '../../services/languageService';
import { useTelegramContext } from '../../providers/TelegramContext';
import { getIcon } from '../../services/imageService';

type MoveChooseFolderHeaderProps = {
    onClose: () => void;
}

const MoveChooseFolderHeader: React.FC<MoveChooseFolderHeaderProps> = ({onClose}) => {
  const { colorScheme } = useTelegramContext();

  return (
    <div className="flex flex-row self-start w-full h-[18.5vw] pl-[8vw] pt-[6.39vw] pr-[7.22vw] pb-[5.56vw] gap-[4.72vw] bg-light-primary text-light-onprimary dark:bg-dark-primary dark:text-dark-onprimary">
      <h1 className='text-lg text-light-onprimary dark:text-dark-onprimary'>{getLocalizationString('main-page-name') as string}</h1>
      <div className='grow' />
      <div onClick={onClose}>
        <img className="h-[6.11vw] w-[6.11vw] m-0" src={getIcon('close', colorScheme!)} alt="FAQ" />
      </div>
    </div>
  );
}

export default MoveChooseFolderHeader;