import { ContentType } from "../types/content";
import FolderIcon from '../assets/content-icons/folder-icon.svg';
import TextIcon from '../assets/content-icons/text-icon.svg';
import AudioIcon from '../assets/content-icons/audio-icon.svg';
import FileIcon from '../assets/content-icons/file-icon.svg';
import ImageIcon from '../assets/content-icons/image-icon.svg';
import VideoIcon from '../assets/content-icons/video-icon.svg';
import VoiceMessageIcon from '../assets/content-icons/voice-message-icon.svg';

import HomeIconDark from '../assets/control-icons/dark/home-icon-dark.png';
import HomeIconLight from '../assets/control-icons/light/home-icon-light.png';
import SettingsIconDark from '../assets/control-icons/dark/settings-icon-dark.png'
import SettingsIconLight from '../assets/control-icons/light/settings-icon-light.png'
import AddFolderIconDark from '../assets/control-icons/dark/add-folder-icon-dark.svg';
import AddFolderIconLight from '../assets/control-icons/light/add-folder-icon-light.svg';
import BackIconDark from '../assets/control-icons/dark/back-icon-dark.svg';
import BackIconLight from '../assets/control-icons/light/back-icon-light.svg';
import EditIconDark from '../assets/control-icons/dark/edit-icon-dark.png';
import EditIconLight from '../assets/control-icons/light/edit-icon-light.png';
import DeleteDark from '../assets/control-icons/dark/delete-icon-dark.png';
import DeleteLight from '../assets/control-icons/light/delete-icon-light.png';
import FAQIconDark from '../assets/control-icons/dark/faq-icon-dark.png';
import FAQIconLight from '../assets/control-icons/light/faq-icon-light.png';
import DropdownIconDark from '../assets/control-icons/dark/dropdown-icon-dark.svg';
import DropdownIconLight from '../assets/control-icons/light/dropdown-icon-light.svg';


export const getContentImage = (content: ContentType) => {
    const contentType = content.attachment ?? 1
    const imageMapping = {
        0: FolderIcon,
        1: TextIcon,
        2: AudioIcon,
        3: FileIcon,
        4: ImageIcon,
        5: VideoIcon,
        6: VoiceMessageIcon
      };
      
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

export const getIcon = (name: string, theme: string): string => {
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
    }
  } 
  return iconMapping[theme][name];
}
 