// import { useTelegramContext } from 'providers/TelegramContext';
import React from 'react';
// import { getIcon } from '../../services/imageService';
// import { NavLink } from 'react-router-dom';

const MainPageHeader: React.FC = () => {
  // const { colorScheme } = useTelegramContext();

  return (
    <div className="flex flex-row items-center self-start p-2 gap-2">
      <h1 className=' text-lg h-10 text-light-onprimary dark:text-dark-onprimary'>Главная</h1>
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