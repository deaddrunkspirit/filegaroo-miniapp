import React, { useEffect, useState } from 'react';
import { useDropdown } from '../providers/DropdownContext';
import { ContentType } from '../types/content';
import ContentCardNoDropdown from './cards/ContentCardNoDropdown';
import RenameContentDialog from './dialogs/RenameContentDialog';
import CardOptionsDialog from './dialogs/CardOptionsDialog';
import DeleteContentDialog from './dialogs/DeleteContentDialog';

interface DropdownMenuProps {
  content: ContentType;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ content }) => {
  const { closeDropdown } = useDropdown(content.id);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  

  const handleEdit = () => {
    setIsEditing(true)
  };

  const handleDelete = () => {
    setIsDeleting(true)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {

      const dropdownMenu = document.getElementById(`dropdown-${content.id}`);

      if (dropdownMenu && !dropdownMenu.contains(e.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [closeDropdown, content.id]);

  return (
    <div className='fixed w-full h-[135%] top-1/3 left-1/2 origin-center transition -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col m-0 space-y-4 z-10 backdrop-blur-sm backdrop-brightness-50 animate-appear'>
      <ContentCardNoDropdown content={content} />

      {isEditing ? 
        <RenameContentDialog onEnd={closeDropdown} content={content} /> 
        : isDeleting ?
          <DeleteContentDialog onEnd={closeDropdown} content={content}/> 
          :
          <CardOptionsDialog handleDelete={handleDelete} handleEdit={handleEdit} content_id={content.id}/>
      }
    </div>

  );
};

export default DropdownMenu;
