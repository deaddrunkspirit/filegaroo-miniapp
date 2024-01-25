import { getIcon } from '../../services/imageService';
import { useTelegramContext } from '../../providers/TelegramContext'
import React, { useState } from 'react';


type FAQCardProps = {
    question: string;
    answer: string[];
}

type FAQAnswerProps = {
    items: string[];
}

const FAQAnswer: React.FC<FAQAnswerProps> = ({items}) => {
    const first = items[0]
    const list = items.slice(1)
    return <div className='px-[5.56vw] pb-[6vw]'>
        <p className='text-sm'>{first}</p>   
        <ul className=' px-[4vw] list-disc'>
            {list.map((item, i) => 
                <li className={`text-sm`} key={i}>{item}</li>
            )}
        </ul>
    </div>
}

const FAQCard: React.FC<FAQCardProps> = ({question, answer}) => {
    const [isOpened, setIsOpened] = useState<boolean>(false)
    const { colorScheme } = useTelegramContext();

    return <>
        <li key={question} className='flex flex-row justify-between px-[5.56vw] py-[4vw] gap-[2vw] line-clamp-2' onClick={() => {setIsOpened(!isOpened)}}>
            <p className='text-md'>{question}</p>
            <img src={getIcon('expand', colorScheme!)}/>
        </li>
        {
            isOpened ? <FAQAnswer items={answer}/> : null
        }
        <div className='w-full h-[2px] opacity-20 bg-light-onsecondary dark:bg-dark-onsecondary' />
    </>
}

export default FAQCard;