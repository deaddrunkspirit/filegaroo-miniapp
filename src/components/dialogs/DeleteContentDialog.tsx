
import { deleteContent } from "../../services/api/apiService";
import { ContentType } from "../../types/content";
import { useTelegramContext } from "../../providers/TelegramContext";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from "react";

interface DeleteContentDialogProps {
    onEnd: () => void;
    content: ContentType;
}


const DeleteContentDialog: React.FC<DeleteContentDialogProps> = ({onEnd, content}) => {
    const { tg } = useTelegramContext();
    const queryClient = useQueryClient();
  
    const deleteMutation = useMutation({
        mutationFn: () => deleteContent(tg!.access_token, content.id),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['contents'] });
          onEnd();
        }
      })

    const handleDelete = () => {
        deleteMutation.mutate();
    }

    const handleCancel = () => {
        onEnd();
    }
    
    return (
        <div className='flex flex-col w-48 h-28 space-y-2 justify-around py-3 ml-16 items-stretch bg-color_input dark:bg-dark-secondary bg-opacity-80 dark:bg-opacity-80 rounded-2xl shadow-2xl'>
          <div className='flex flex-row items-center px-4 gap-4 justify-between' onClick={handleDelete}>
            <p className="flex text-lg text-color_alert">Удалить</p>
          </div>
          <div className='w-full h-[2px] opacity-20 bg-light-onprimary dark:bg-dark-onsecondary' />
          <div className='flex flex-row items-center px-4 gap-4 justify-between' onClick={handleCancel}>
            <p className="flex text-lg text-light-onprimary dark:text-dark-onsecondary">Отменить</p>
          </div>
        </div>
    );
};

export default DeleteContentDialog;
