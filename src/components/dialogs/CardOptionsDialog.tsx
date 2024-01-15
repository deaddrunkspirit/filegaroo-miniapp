import { useTelegramContext } from "../../providers/TelegramContext";
import { getIcon } from "../../services/imageService";

interface CardOptionDialogProps {
    handleDelete: () => void;
    handleEdit: () => void;
    content_id: number;
}

const CardOptionsDialog: React.FC<CardOptionDialogProps> = ({handleEdit, handleDelete, content_id}) => {
    const { colorScheme } = useTelegramContext();

    return (
        <div className='flex flex-col w-48 h-28 space-y-2 justify-around py-3 ml-20 items-stretch bg-color_input dark:bg-dark-secondary bg-opacity-80 dark:bg-opacity-80 rounded-3xl shadow-2xl' id={`dropdown-${content_id}`}>
          <div className='flex flex-row items-center px-4 gap-4 justify-between' onClick={handleEdit}>
            <p className="flex text-lg text-light-onprimary dark:text-dark-onsecondary">Переименовать</p>
            <img className='h-4 w-4' src={getIcon('edit', colorScheme!)} alt='Edit' />
          </div>
          <div className='w-full h-[2px] opacity-20 bg-light-onprimary dark:bg-dark-onsecondary' />
          <div className='flex flex-row items-center px-4 gap-4 justify-between' onClick={handleDelete}>
            <p className="flex text-lg text-color_alert">Удалить</p>
            <img className='h-4 w-4' src={getIcon('delete', colorScheme!)} alt='Delete' />
          </div>
        </div>
    );
}

export default CardOptionsDialog;