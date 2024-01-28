import React from 'react';
import { ContentType } from '../../types/content';
import ContentCard from '../cards/ContentCard';
import AddFolder from '../cards/AddFolder';
import { useTelegramContext } from '../../providers/TelegramContext';

interface ContentListProps {
  data: ContentType[];
  parent_id: number | null
  parent: ContentType | null;
}

const ContentList: React.FC<ContentListProps> = ({ data, parent }) => {
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
    <div className='relative z-10 flex flex-wrap justify-start pb-[20vh] gap-[5vw] w-[83.5vw] h-full list-none'>
      {sortedData.map((content) => (
        <ContentCard key={content.id} parent={parent} content={content} />
      ))}
      <AddFolder user_id={tg!.init_data.user.id} parent_content_id={parent ? parent.id : null} />
    </div>
  );

}

export default ContentList;