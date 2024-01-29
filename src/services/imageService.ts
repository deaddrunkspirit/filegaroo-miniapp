import { ContentType } from "../types/content";
import FolderIcon from '../assets/content-icons/folder-icon.png';
import TextIcon from '../assets/content-icons/text-icon.png';
import AudioIcon from '../assets/content-icons/audio-icon.png';
import FileIcon from '../assets/content-icons/file-icon.png';
import ImageIcon from '../assets/content-icons/image-icon.png';
import VideoIcon from '../assets/content-icons/video-icon.png';
import VoiceMessageIcon from '../assets/content-icons/voice-message-icon.png';
import VideoNoteIcon from '../assets/content-icons/video-note-icon.png';

import HomeIconDark from '../assets/control-icons/dark/home-icon-dark.svg';
import HomeIconLight from '../assets/control-icons/light/home-icon-light.svg';
import SettingsIconDark from '../assets/control-icons/dark/settings-icon-dark.svg'
import SettingsIconLight from '../assets/control-icons/light/settings-icon-light.svg'
import AddFolderIconDark from '../assets/control-icons/dark/add-folder-icon-dark.png';
import AddFolderIconLight from '../assets/control-icons/light/add-folder-icon-light.png';
import BackIconDark from '../assets/control-icons/dark/back-icon-dark.svg';
import BackIconLight from '../assets/control-icons/light/back-icon-light.svg';
import EditIconDark from '../assets/control-icons/dark/edit-icon-dark.svg';
import EditIconLight from '../assets/control-icons/light/edit-icon-light.svg';
import DeleteDark from '../assets/control-icons/dark/delete-icon-dark.svg';
import DeleteLight from '../assets/control-icons/light/delete-icon-light.svg';
import FAQIconDark from '../assets/control-icons/dark/faq-icon-dark.svg';
import FAQIconLight from '../assets/control-icons/light/faq-icon-light.svg';
import DropdownIconDark from '../assets/control-icons/dark/dropdown-icon-dark.svg';
import DropdownIconLight from '../assets/control-icons/light/dropdown-icon-light.svg';
import ExpandIconDark from '../assets/control-icons/dark/expand-icon-dark.svg';
import ExpandIconLight from '../assets/control-icons/light/expand-icon-light.svg';
import CloseIconDark from '../assets/control-icons/dark/close-icon-dark.svg';
import CloseIconLight from '../assets/control-icons/light/close-icon-light.svg';
import SelectIconLight from '../assets/control-icons/light/select-icon-light.svg';
import SelectIconDark from '../assets/control-icons/dark/select-icon-dark.svg';
import ClosePageIconLight from '../assets/control-icons/light/close-page-icon-light.svg';
import ClosePageIconDark from '../assets/control-icons/dark/close-page-icon-dark.svg';
import SelectCheckedIconLight from '../assets/control-icons/light/select-checked-icon-light.png';
import SelectCheckedIconDark from '../assets/control-icons/dark/select-checked-icon-dark.png';
import SelectEmptyLight from '../assets/control-icons/light/select-empty-icon-light.png';
import SelectEmptyDark from '../assets/control-icons/dark/select-empty-icon-dark.png';
import MoveIconLight from '../assets/control-icons/light/move-icon-light.svg';
import MoveIconDark from '../assets/control-icons/dark/move-icon-dark.svg';
import DeletePrimaryIconLight from '../assets/control-icons/light/delete-primary-icon-light.svg';
import DeletePrimaryIconDark from '../assets/control-icons/dark/delete-primary-icon-dark.svg';

const imageMapping = {
  0: FolderIcon,
  1: TextIcon,
  2: AudioIcon,
  3: FileIcon,
  4: ImageIcon,
  5: VideoIcon,
  6: VoiceMessageIcon,
  7: VideoNoteIcon,
};

export const getContentImage = (content: ContentType) => {
    const contentType = content.attachment ?? 1
      
      let index: keyof typeof imageMapping;

      if (content.attachment && content.attachment !== null) {
        index = contentType as keyof typeof imageMapping;
      } else if (content.type === 1) {
        index = contentType as keyof typeof imageMapping;
      } else {
        index = 0;
      }
      return imageMapping[index] || 'default_icon.svg';
};

export const getFolderImage = () => {
    return FolderIcon
}

const iconMapping: { [key: string]: { [key: string]: string } }  = {
  'light': {
    'faq': FAQIconLight,
    'settings': SettingsIconLight,
    'delete': DeleteLight,
    'edit': EditIconLight,
    'back': BackIconLight,
    'add-folder': AddFolderIconLight,
    'home': HomeIconLight,
    'dropdown': DropdownIconLight,
    'close': CloseIconLight,
    'expand': ExpandIconLight,
    'close-page': ClosePageIconLight,
    'select': SelectIconLight,
    'select-empty': SelectEmptyLight,
    'select-checked': SelectCheckedIconLight,
    'delete-primary': DeletePrimaryIconLight,
    'move': MoveIconLight
  },
  'dark': {
    'faq': FAQIconDark,
    'settings': SettingsIconDark,
    'delete': DeleteDark,
    'edit': EditIconDark,
    'back': BackIconDark,
    'add-folder': AddFolderIconDark,
    'home': HomeIconDark,
    'dropdown': DropdownIconDark,
    'close': CloseIconDark,
    'expand': ExpandIconDark,
    'close-page': ClosePageIconDark,
    'select': SelectIconDark,
    'select-empty': SelectEmptyDark,
    'select-checked': SelectCheckedIconDark,
    'delete-primary': DeletePrimaryIconDark,
    'move': MoveIconDark
  }
} 

export const getIcon = (name: string, theme: string): string => {
  return iconMapping[theme][name];
}
 