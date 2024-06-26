
import { deleteContent } from "../../services/api/apiService";
import { ContentType } from "../../types/content";
import { useTelegramContext } from "../../providers/TelegramContext";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from "react";
import getLocalizationString from "../../services/languageService";
import { useGA } from "../../providers/GAContext";

type DeleteContentDialogProps = {
    onEnd: () => void;
    content: ContentType;
}


const DeleteContentDialog: React.FC<DeleteContentDialogProps> = ({ onEnd, content }) => {
    const { tg } = useTelegramContext();
    const { sendGAEvent } = useGA();
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: () => deleteContent(tg!.access_token, content.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['content-page'] });
            onEnd();
        }
    })

    const handleDelete = () => {
        deleteMutation.mutate();
        sendGAEvent(tg!!.init_data.user.id, 'WebAppInteraction', `DeleteOneContent`);
    }

    const handleCancel = () => {
        onEnd();
    }

    return (
        <div className='z-[1000] relative flex flex-col justify-around w-[49.44vw] h-[29.17] py-[4vw] ml-[25vw] space-y-[2vw] items-stretch bg-color_input dark:bg-dark-secondary bg-opacity-80 dark:bg-opacity-80 rounded-3xl shadow-2xl'>
            <div className='flex flex-row items-center px-[4vw] gap-[4vw] justify-center'>
                <p className="flex text-center text-sm text-light-onprimary dark:text-dark-onsecondary">
                    {content.type == 2 ? getLocalizationString('ensure-delete-folder') as string
                        : getLocalizationString('ensure-delete-message') as string}
                </p>
            </div>
            <div className='w-full h-[2px] opacity-20 bg-light-onprimary dark:bg-dark-onsecondary' />
            <div className="flex flex-row justify-center gap-[4vw]">
                <div className='flex flex-row items-center justify-center' onClick={handleCancel}>
                    <p className="flex text-md text-light-onprimary dark:text-dark-onsecondary">{getLocalizationString('cancel') as string}</p>
                </div>
                <div className='flex flex-row items-center justify-center' onClick={handleDelete}>
                    <p className="flex text-md text-color_alert">{getLocalizationString('delete') as string}</p>
                </div>
            </div>
        </div>
    );
};

export default DeleteContentDialog;
