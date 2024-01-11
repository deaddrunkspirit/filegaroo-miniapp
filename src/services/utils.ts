import { ContentType } from "../types/content";

export const getIconPath = (content: ContentType) => {
    const contentType = content.attachment ?? 1
    const iconMapping = {
        0: 'folder-icon.svg',
        1: 'text-icon.svg',
        2: 'audio-icon.svg',
        3: 'file-icon.svg',
        4: 'image-icon.svg',
        5: 'video-icon.svg',
        6: 'voice-message-icon.svg'
      };
      
      let index: keyof typeof iconMapping;

      if (content.attachment && content.attachment !== null) {
        index = contentType as keyof typeof iconMapping;
      } else if (content.type === 1) {
        index = contentType as keyof typeof iconMapping;
      } else {
        index = 0;
      }
      const iconFileName: string = iconMapping[index] || 'default_icon.svg';
    return process.env.PUBLIC_URL + `/icons/${iconFileName}`;
  };
 