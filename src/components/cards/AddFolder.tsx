import { useTelegramContext } from "../../providers/TelegramContext";
import { getIcon } from "../../services/imageService";
import ContentCardEmpty from "./ContentCardEmpty";
import AddFolderDialog from "../dialogs/AddFolderDialog"
import { useState } from "react";

interface AddFolderProps {
    user_id: number,
    parent_content_id: number | null | undefined
}


const AddFolder: React.FC<AddFolderProps> = ({ parent_content_id }) => {
    const [isAddingFolder, setIsAddingFolder] = useState<boolean>(false)
    const [name, setName] = useState<string>('');
    const { colorScheme } = useTelegramContext();
    const icon_path = getIcon('add-folder', colorScheme!) 

    const handleClick = () => {
        setIsAddingFolder(true);
    };

    return (
        <>
            <div className="relative flex flex-col items-center justify-center py-[7.75vw] px-[8.9vw] w-[39vw] h-[32vw] rounded-3xl shadow-lg shadow-gray-400 dark:shadow-black
                 bg-light-secondary text-light-onsecondary dark:bg-dark-secondary dark:text-dark-onsecondary m-0"
                    onClick={handleClick}>
                <div className="w-[21vw] h-[15.4vw]">
                    <img className="max-w-full max-h-full h-auto" src={icon_path} alt="Content Icon" />
                </div>
            </div>
            {isAddingFolder ?
                <div className=' z-50 dark:fixed fixed w-[125vw] h-[150vh] top-1/3 left-[50vw] origin-center dark:transition transition dark:-translate-x-1/2 -translate-x-1/2 dark:-translate-y-1/2 -translate-y-1/2 flex items-center justify-center flex-col m-0 space-y-[4vw] backdrop-blur-sm backdrop-brightness-50 animate-appear '>
                    <ContentCardEmpty name={name} />
                    <AddFolderDialog onEnd={() => setIsAddingFolder(false)} parent_content_id={parent_content_id} name={name} setName={setName} />
                </div> : null
            }
        </>
    );
};

export default AddFolder;
