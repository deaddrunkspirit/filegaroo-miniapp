import { ContentType } from "../../types/content";
import ContentListPicker from "../lists/ContentListPicker";

type MoveChooseFolderDialogProps = {
    contents: ContentType[];
}

const MoveChooseFolderDialog: React.FC<MoveChooseFolderDialogProps> = ({contents}) => {
    return <>
        <div></div>
        <ContentListPicker contents={contents}/>
        {/* TODO Buttons row  */}
    </>
}

export default MoveChooseFolderDialog;
