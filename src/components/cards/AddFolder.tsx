import { addFolder } from "../../services/api/apiService";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTelegramContext } from "../../providers/TelegramContext";
import { getIcon } from "../../services/imageService";

interface AddFolderProps {
    user_id: number,
    parent_content_id: number | null | undefined
}


const AddFolder: React.FC<AddFolderProps> = ({ parent_content_id }) => {

    const queryClient = useQueryClient();
    const { colorScheme, tg } = useTelegramContext();
    const icon_path = getIcon('add-folder', colorScheme!) 
    
    const mutation = useMutation({
        mutationFn: () => addFolder(tg!.access_token, tg!.init_data.user.id, parent_content_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contents'] });
        },
    });

    const handleClick = () => {
        mutation.mutate();
    };

    return (
        <div className="relative flex flex-col items-center py-6 gap-2 h-auto w-5/12 rounded-3xl shadow-2xl bg-light-secondary text-light-onsecondary dark:bg-dark-secondary dark:text-dark-onsecondary m-0"
            onClick={handleClick}>
            <img className="w-7/12" src={icon_path} alt="Content Icon" />
        </div>
    );
};

export default AddFolder;