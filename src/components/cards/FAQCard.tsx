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
    return <>
        <ul className=' list-disc px-[6vw] pb-[4vw]'>
            {items.map((item, i) => 
                <li className=' text-sm' key={i}>{item}</li>
            )}
        </ul>
    </>
}

const FAQCard: React.FC<FAQCardProps> = ({question, answer}) => {
    const [isOpened, setIsOpened] = useState<boolean>(false)
    const { colorScheme } = useTelegramContext();

    return <>
        <li className='flex flex-row justify-between px-[4vw] py-[4vw] gap-[2vw] line-clamp-2' onClick={() => {setIsOpened(!isOpened)}}>
            <p className='text-md'>{question}</p>
            <img src={getIcon('expand', colorScheme!)}/>
        </li>
        {
            isOpened ? <FAQAnswer items={answer}/> : null
        }
        <div className='w-full h-[2px] opacity-20 bg-light-onprimary dark:bg-dark-onsecondary' />
    </>
}

export default FAQCard;