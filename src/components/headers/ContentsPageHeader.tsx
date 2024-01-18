import { useTelegramContext as useThemeContext } from '../../providers/TelegramContext';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { getIcon } from '../../services/imageService';

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
    <div className="flex flex-row justify-center items-center pt-[3.61vw] pb-[2.9vw] px-[8vw] h-[18.5vw] gap-[5.56vw]">
      <NavLink className='h-[6.11vw] w-[6.11vw]' to="/">
        <img className="h-full w-full" src={getIcon('home', colorScheme!)} alt="Home" />
      </NavLink>
      <button className='h-[6.11vw] w-[6.11vw]' onClick={handleBackButton}>
        <img className="h-full w-full" src={getIcon('back', colorScheme!)} alt="Back" />
      </button>
      <h1 className='text-lg w-[59.72vw] text-light-onprimary dark:text-dark-onprimary line-clamp-2'>
        {title}</h1>
    </div>
  );
}

export default ContentsPageHeader;