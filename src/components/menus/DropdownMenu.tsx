import React, { useEffect, useState } from 'react';
import { useDropdown } from '../../providers/DropdownContext';
import { ContentType } from '../../types/content';
import ContentCardNoDropdown from '../cards/ContentCardNoDropdown';
import RenameContentDialog from '../dialogs/RenameContentDialog';
import CardOptionsDialog from '../dialogs/CardOptionsDialog';
import DeleteContentDialog from '../dialogs/DeleteContentDialog';
import SelectContentsDialog from '../dialogs/SelectContentsDialog';

type DropdownMenuProps = {
  content: ContentType;
  currFolderName: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ content, currFolderName }) => {
  const { closeDropdown } = useDropdown(content.id);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [contentTitle, setContentTitile] = useState(content.title)

  const handleEdit = () => {
    setIsEditing(true)
  };

  const handleDelete = () => {
    setIsDeleting(true)
  }

  const handleSelect = () => {
    document.body.classList.remove('overflow-hidden');
    setIsSelecting(true)
  }

  const onSelectionClose = () => { 
    setIsSelecting(false); 
    closeDropdown();
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
    <>
      {isSelecting ? <SelectContentsDialog currFolderName={currFolderName} content={content} onClose={onSelectionClose}/> : (
        <div className=' z-50 dark:fixed fixed w-[125vw] h-[150vh] top-1/3 left-[50vw] origin-center dark:transition transition dark:-translate-x-1/2 -translate-x-1/2 dark:-translate-y-1/2 -translate-y-1/2 flex items-center justify-center flex-col m-0 space-y-[4vw] backdrop-blur-sm backdrop-brightness-50 animate-appear '>
          <ContentCardNoDropdown content={content} title={contentTitle} />

          {isEditing ?
            <RenameContentDialog onEnd={closeDropdown} content={content} onTitleChanged={setContentTitile} />
            : isDeleting ?
              <DeleteContentDialog onEnd={closeDropdown} content={content} />
              :
              <CardOptionsDialog handleSelect={handleSelect} handleDelete={handleDelete} handleEdit={handleEdit} content_id={content.id} />
          }
        </div>)}
    </>

  );
};

export default DropdownMenu;
