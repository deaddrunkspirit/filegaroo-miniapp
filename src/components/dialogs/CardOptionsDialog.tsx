import { useTelegramContext } from "../../providers/TelegramContext";
import { getIcon } from "../../services/imageService";
import getLocalizationString from '../../services/languageService';

type CardOptionDialogProps = {
    handleDelete: () => void;
    handleEdit: () => void;
    handleSelect: () => void;
    content_id: number;
}

const CardOptionsDialog: React.FC<CardOptionDialogProps> = ({ handleEdit, handleDelete, handleSelect, content_id }) => {
    const { colorScheme } = useTelegramContext();

    return (
        <div className='z-[1000] relative flex flex-col w-[49.44vw] h-[29.17] py-[4vw] ml-[25vw] space-y-[2vw] justify-around items-stretch bg-color_input dark:bg-dark-secondary bg-opacity-80 dark:bg-opacity-80 rounded-3xl shadow-xl' id={`dropdown-${content_id}`}>
            <div className='flex flex-row items-center px-[4vw] gap-[4vw] justify-between' onClick={handleEdit}>
                <p className="flex text-md text-light-onprimary dark:text-dark-onsecondary">{getLocalizationString('rename') as string}</p>
                <img className='h-[5vw] w-[5vw]' src={getIcon('edit', colorScheme!)} alt='Edit' />
            </div>
            <div className='w-full h-[2px] opacity-20 bg-light-onprimary dark:bg-dark-onsecondary' />
            <div className='flex flex-row items-center px-[4vw] gap-[4vw] justify-between' onClick={handleSelect}>
                <p className="flex text-md text-light-onprimary dark:text-dark-onsecondary">{getLocalizationString('select') as string}</p>
                <img className='h-[5vw] w-[5vw]' src={getIcon('select', colorScheme!)} alt='Edit' />
            </div>
            <div className='w-full h-[2px] opacity-20 bg-light-onprimary dark:bg-dark-onsecondary' />
            <div className='flex flex-row items-center px-[4vw] gap-[4vw] justify-between' onClick={handleDelete}>
                <p className="flex text-md text-color_alert">{getLocalizationString('delete') as string}</p>
                <img className='h-[5vw] w-[5vw]' src={getIcon('delete', colorScheme!)} alt='Delete' />
            </div>
        </div>
    );
}

export default CardOptionsDialog;