import { ContentType } from "../types/content";

export const getIconPath = (content: ContentType) => {
    const iconMapping = {
        0: 'folder-icon.svg',
        1: 'text-icon.svg',
        2: 'audio-icon.svg',
        3: 'file-icon.svg',
        4: 'image-icon.svg',
        5: 'image-icon.svg',
        6: 'video-icon.svg',
        7: 'voice-message-icon.svg',
        8: 'video-icon.svg',
        9: 'image-icon.svg',
        10: 'image-icon.svg',
        11: 'image-icon.svg',
      };
      const index: keyof typeof iconMapping = content.attachment && content.attachment !== null ? (content.attachment as keyof typeof iconMapping) : 0;
      const iconFileName: string = iconMapping[index] || 'default_icon.svg';
    return process.env.PUBLIC_URL + `/icons/${iconFileName}`;
  };
 