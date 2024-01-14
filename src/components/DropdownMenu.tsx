import React, { useEffect, useState } from 'react';
import { useDropdown } from '../providers/DropdownContext';
import { ContentType } from '../types/content';
import ContentCardNoDropdown from './cards/ContentCardNoDropdown';
import RenameContentDialog from './dialogs/RenameContentDialog';
import { deleteContent } from '../services/api/apiService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CardOptionsDialog from './dialogs/CardOptionsDialog';
import { useTelegramContext } from '../providers/TelegramContext';

interface DropdownMenuProps {
  content: ContentType;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ content }) => {
  const { closeDropdown } = useDropdown(content.id);
  const [isEditing, setIsEditing] = useState(false);
  const { tg } = useTelegramContext();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: () => deleteContent(tg!.access_token, content.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents', content.user_id] })
      closeDropdown()
    }
  })

  const handleEdit = () => {
    setIsEditing(true)
  };

  const handleDelete = () => {
    deleteMutation.mutate();
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
    <div className='fixed w-full h-full top-1/2 left-1/2 origin-center transition -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col m-0 space-y-4 z-10 backdrop-blur-sm backdrop-brightness-50 animate-appear'>
      <ContentCardNoDropdown content={content} />

      {isEditing ? 
        <RenameContentDialog onEnd={closeDropdown} content={content} /> 
        :
        <CardOptionsDialog handleDelete={handleDelete} handleEdit={handleEdit} content_id={content.id}/>
      }
    </div>

  );
};

export default DropdownMenu;
