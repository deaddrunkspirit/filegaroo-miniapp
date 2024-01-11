import { useTelegramContext as useThemeContext } from '../../providers/ThemeContext';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

interface ContentsPageHeaderProps {
  title: string;
}

const ContentsPageHeader: React.FC<ContentsPageHeaderProps> = ({title }) => {
  const navigate = useNavigate();
  const { colorScheme } = useThemeContext();

  const handleBackButton = () => {
    navigate(-1);
  }
  return (
    <div className="flex flex-row items-center p-4 gap-4">
      <NavLink className='min-w-6 min-h-6' to="/">
        <img className="w-6 h-6 m-0" src={`/icons/home-icon-${colorScheme}.svg`} alt="Home" />
      </NavLink>
      <button className='min-w-6 min-h-6' onClick={handleBackButton}>
        <img className="w-6 h-6 m-0" src={`/icons/back-icon-${colorScheme}.svg`} alt="Back" />
      </button>
      <h1 className='text-lg text-light-onprimary dark:text-dark-onprimary leading-6 line-clamp-2 text-ellipsis overflow-hidden ...'>{title}</h1>
    </div>
  );
}

export default ContentsPageHeader;