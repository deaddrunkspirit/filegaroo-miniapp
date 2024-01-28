import React from 'react';
import getLocalizationString from '../../services/languageService';
import { useTelegramContext } from '../../providers/TelegramContext';
import { getIcon } from '../../services/imageService';
import { ContentType } from '../../types/content';

type MoveChooseFolderHeaderProps = {
    onClose: () => void;
    parent: ContentType | null;
    onFolderChanged: (newId: number | null) => void;
}

const MoveChooseFolderHeader: React.FC<MoveChooseFolderHeaderProps> = ({onClose, parent, onFolderChanged}) => {
  const { colorScheme } = useTelegramContext();

  return (
    <div className="flex flex-row self-start w-full h-[18.5vw] pl-[8vw] pt-[6.39vw] pr-[7.22vw] pb-[5.56vw] gap-[4.72vw] bg-light-primary text-light-onprimary dark:bg-dark-primary dark:text-dark-onprimary">
      { parent ?
      <button className='h-[6.11vw] w-[6.11vw]' onClick={() => {onFolderChanged((parent ? parent.parent_content_id : null) ?? null)}}>
        <img className="h-full w-full" src={getIcon('back', colorScheme!)} alt="Back" />
      </button> : null
      }
      <h1 className='text-lg text-light-onprimary dark:text-dark-onprimary'>{parent ? parent.title : getLocalizationString('main-page-name') as string}</h1>
      <div className='grow' />
      <div onClick={onClose}>
        <img className="h-[6.11vw] w-[6.11vw] m-0" src={getIcon('close', colorScheme!)} alt="close" />
      </div>
    </div>
  );
}

export default MoveChooseFolderHeader;