import React from "react";
import getLocalizationString from "../../services/languageService";

type DeleteAllContentsDialogProps = {
    onDelete: () => void;
    onCancel: () => void;
}

const DeleteAllContensDialog: React.FC<DeleteAllContentsDialogProps> = ({ onDelete, onCancel }) => {
    return (
        <div className="z-[1050] fixed flex items-center justify-center origin-center h-[100vh] w-[125vw] backdrop-blur-sm backdrop-brightness-50">
            <div className='flex flex-col justify-around w-[49.44vw] h-[29.17] py-[4vw] space-y-[2vw] items-stretch bg-color_input dark:bg-dark-secondary bg-opacity-80 dark:bg-opacity-80 backdrop-blur-sm backdrop-brightness-50 rounded-3xl shadow-2xl'>
                <div className='flex flex-row items-center px-[4vw] gap-[4vw] justify-center'>
                    <p className="flex text-center text-sm text-light-onprimary dark:text-dark-onsecondary">
                        {getLocalizationString('ensure-delete-selected') as string}
                    </p>
                </div>
                <div className='w-full h-[2px] opacity-20 bg-light-onprimary dark:bg-dark-onsecondary' />
                <div className="flex flex-row justify-center gap-[4vw]">
                    <div className='flex flex-row items-center justify-center' onClick={onCancel}>
                        <p className="flex text-md text-light-onprimary dark:text-dark-onsecondary">{getLocalizationString('cancel') as string}</p>
                    </div>
                    <div className='flex flex-row items-center justify-center' onClick={onDelete}>
                        <p className="flex text-md text-color_alert">{getLocalizationString('delete') as string}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteAllContensDialog;