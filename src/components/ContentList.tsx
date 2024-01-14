import React from 'react';
import { ContentType } from '../types/content';
import ContentCard from './cards/ContentCard';
import AddFolder from './cards/AddFolder';
import { useTelegramContext } from '../providers/TelegramContext';

interface ContentListProps {
  data: ContentType[];
  parent_id: number | null
}

const ContentList: React.FC<ContentListProps> = ({ data, parent_id }) => {
  const { tg } = useTelegramContext()
  
  const sortedData = data.sort((a, b) => {
    // First, prioritize type=2 (folders)
    if (a.type === 2 && b.type !== 2) {
      return -1; // Move a to the front
    } else if (b.type === 2 && a.type !== 2) {
      return 1; // Move b to the front
    } else {
      // If types are the same or both are not type=2, maintain original order
      return 0;
    }
  });

  return (
    <div className='flex flex-wrap ml-4 gap-8 w-full list-none'>
      {sortedData.map((content) => (
        <ContentCard key={content.id} content={content} />
      ))}
      <AddFolder user_id={tg!.init_data.user.id} parent_content_id={parent_id} />
    </div>
  );

}

export default ContentList;