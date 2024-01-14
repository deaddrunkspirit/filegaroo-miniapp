import { useState } from "react";
import { renameContent } from "../../services/api/apiService";
import { ContentType } from "../../types/content";
import { useTelegramContext } from "../../providers/TelegramContext";

interface RenameContentDialogProps {
    onEnd: () => void;
    content: ContentType;
}


const RenameContentDialog: React.FC<RenameContentDialogProps> = ({onEnd, content}) => {
    const [newName, setNewName] = useState<string>('');
    const { tg } = useTelegramContext();

    const handleSave = () => {
        renameContent(tg!.access_token, content, newName)
        onEnd()
    }

    const handleCancel = () => {
        onEnd()
    }
    
    return (
        <div className="m-0 flex w-52 flex-col items-center justify-center space-y-4 rounded-3xl bg-light-primary dark:bg-dark-secondary p-4">
            <div className=" relative h-11 w-full">
                <input placeholder="Новое название" value={newName} onChange={(e) => setNewName(e.target.value)} 
                        className="border-color_input text-light-onprimary dark:text-dark-onprimary dark:placeholder-shown:border-dark-onsecondary dark:disabled:bg-dark-primary 
                                    placeholder-shown:border-light-onsecondary disabled:bg-light-primary 
                                    peer h-full w-full border-b bg-transparent pb-1.5 pt-4 font-sans text-md font-normal outline outline-0 transition-all 
                                    placeholder:opacity-0 focus:border-dark-primary focus:outline-0 focus:placeholder:opacity-100 disabled:border-0" />
                <label className="after:content[''] 
                                peer-placeholder-shown:text-light-onprimary peer-disabled:peer-placeholder-shown:text-light-onprimary
                                dark:peer-placeholder-shown:text-dark-onprimary dark:peer-disabled:peer-placeholder-shown:text-light-onprimary
                                pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible 
                                truncate text-md font-normal leading-tight transition-all after:absolute 
                                text-light-onprimary text-opacity-50 dark:text-opacity-50 dark:text-dark-onsecondary
                                after:border-light-primary dark:after:border-dark-primary 
                                after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 
                                after:transition-transform after:duration-300 peer-placeholder-shown:text-md peer-placeholder-shown:leading-[4.25] 
                                peer-focus:text-md peer-focus:leading-tight peer-focus:after:scale-x-100 peer-disabled:text-transparent
                                peer-focus:text-light-onprimary dark:peer-focus:text-dark-onsecondary 
                                peer-focus:after:border-light-500 dark:peer-focus:after:border-dark-primary"> Переименовать </label>
            </div>
            <div className="flex w-full justify-between m-0">
                <p className='text-lg text-light-onprimary dark:text-dark-onsecondary' onClick={handleSave}>Сохранить</p>
                <p className='text-lg text-light-onprimary dark:text-dark-onsecondary' onClick={handleCancel}>Отменить</p>
            </div>
        </div>
    );
};

export default RenameContentDialog
