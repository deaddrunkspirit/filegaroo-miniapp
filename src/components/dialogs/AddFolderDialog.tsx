import { addFolder } from "../../services/api/apiService";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTelegramContext } from "../../providers/TelegramContext";
import getLocalizationString from "../../services/languageService";
import React from "react";
import { useGA } from "../../providers/GAContext";

type AddFolderDialogProps = {
    onEnd: () => void;
    setName: (e: any) => void;
    name: string;
    parent_content_id: number | null | undefined;
}

const AddFolderDialog: React.FC<AddFolderDialogProps> = ({ onEnd, parent_content_id, setName, name }) => {
    const queryClient = useQueryClient();
    const { tg } = useTelegramContext();
    const { sendGAEvent } = useGA();

    const mutation = useMutation({
        mutationFn: () => addFolder(tg!.access_token, name, tg!.init_data.user.id, parent_content_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['content-page', 'contents'] });
        },
    });

    const handleSave = () => {
        if (!name || name == '') {
            name = getLocalizationString('folder-name-placeholder') as string;
        }

        mutation.mutate();
        onEnd();
        setName('');

        sendGAEvent(tg!!.init_data.user.id, 'WebAppInteraction', `FolderCreated`);
    }

    const handleCancel = () => {
        onEnd();
    }

    return (
        <div className="z-[1000] relative m-0 flex-col items-center justify-center w-[55vw] h-[30vw] p-[4vw] ml-[25vw] space-y-[2vw] rounded-3xl bg-color_input dark:bg-dark-secondary bg-opacity-80 dark:bg-opacity-80">
            <div className=" relative h-11 w-full">
                <input placeholder={getLocalizationString('folder-name-placeholder') as string} value={name} onChange={(e) => setName(e.target.value)}
                    className="border-color_input text-light-onprimary dark:text-dark-onprimary dark:placeholder-shown:border-dark-onsecondary dark:disabled:bg-dark-primary 
                                    placeholder-shown:border-light-onsecondary disabled:bg-light-primary 
                                    peer h-full w-full border-b bg-transparent pb-1.5 pt-4 font-sans text-sm font-normal outline outline-0 transition-all 
                                    placeholder:opacity-0 focus:border-dark-primary focus:outline-0 focus:placeholder:opacity-100 disabled:border-0" autoFocus={true} />
                <label className="after:content[''] 
                                peer-placeholder-shown:text-light-onprimary peer-disabled:peer-placeholder-shown:text-light-onprimary
                                dark:peer-placeholder-shown:text-dark-onprimary dark:peer-disabled:peer-placeholder-shown:text-light-onprimary
                                pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible 
                                truncate text-sm font-normal leading-tight transition-all after:absolute 
                                text-light-onprimary text-opacity-50 dark:text-opacity-50 dark:text-dark-onsecondary
                                after:border-light-primary dark:after:border-dark-primary 
                                after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 
                                after:transition-transform after:duration-300 peer-placeholder-shown:text-md peer-placeholder-shown:leading-[4.25] 
                                peer-focus:text-md peer-focus:leading-tight peer-focus:after:scale-x-100 peer-disabled:text-transparent
                                peer-focus:text-light-onprimary dark:peer-focus:text-dark-onsecondary 
                                peer-focus:after:border-light-500 dark:peer-focus:after:border-dark-primary">{getLocalizationString('name') as string}</label>
            </div>
            <div className="flex w-full justify-between m-0">
                <p className='text-md font-bold text-light-onprimary dark:text-dark-onsecondary' onClick={handleSave}>{getLocalizationString('save') as string}</p>
                <p className='text-md text-light-onprimary dark:text-dark-onsecondary' onClick={handleCancel}>{getLocalizationString('cancel') as string}</p>
            </div>
        </div>
    );
};

export default AddFolderDialog;
