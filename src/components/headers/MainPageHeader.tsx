import React from 'react';
import getLocalizationString from '../../services/languageService';
import { useTelegramContext } from '../../providers/TelegramContext';
// import { getIcon } from '../../services/imageService';
// import { NavLink } from 'react-router-dom';

const MainPageHeader: React.FC = () => {
  const { lang } = useTelegramContext();

  return (
    <div className="flex flex-row self-start h-[18.5vw] pl-[8vw] pt-[6.39vw] pr-[7.22vw] pb-[5.56vw] gap-[4.72vw]">
      <h1 className='text-lg text-light-onprimary dark:text-dark-onprimary'>{getLocalizationString(lang!, 'main-page-name')}</h1>
      <div className='grow' />
      {/* <NavLink to="/settings" end>
        <img className="w-6 h-6 m-0" src={getIcon('settings', colorScheme!)} alt="Settings" />
      </NavLink>
      <NavLink to="/faq" end>
        <img className="w-6 h-6 m-0" src={getIcon('faq', colorScheme!)} alt="FAQ" />
      </NavLink> */}
    </div>
  );
}

export default MainPageHeader;