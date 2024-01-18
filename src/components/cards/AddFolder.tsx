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
        <div className="relative flex flex-col items-center justify-center py-[7.75vw] px-[8.9vw] w-[39vw] h-[31vw] rounded-3xl shadow-lg shadow-gray-400 dark:shadow-black
                 bg-light-secondary text-light-onsecondary dark:bg-dark-secondary dark:text-dark-onsecondary m-0"
            onClick={handleClick}>
            <div className="w-[21vw] h-[15.4vw]">
                <img className=" object-cover" src={icon_path} alt="Content Icon" />
            </div>
        </div>
    );
};

export default AddFolder;
