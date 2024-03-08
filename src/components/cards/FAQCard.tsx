import { getIcon } from '../../services/imageService';
import { useTelegramContext } from '../../providers/TelegramContext'
import React, { useState } from 'react';
import FAQAnswerCard from './FAQAnswerCard';
import { useGA } from '../../providers/GAContext';


type FAQCardProps = {
    question: string;
    answer: string[];
}

const FAQCard: React.FC<FAQCardProps> = ({ question, answer }) => {
    const [isOpened, setIsOpened] = useState<boolean>(false)
    const { colorScheme, tg } = useTelegramContext();
    const { sendGAEvent } = useGA();

    const handleScroll = () => {
        const container = document.getElementById('faqContainer');
        const faqCard = document.getElementById(`faqCard_${question}`);
        if (container && faqCard) {
            faqCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const onOpened = () => {
        sendGAEvent(tg!!.init_data.user.id, 'FAQ', `Question_${question}`);
        setIsOpened(!isOpened);
    }

    return (
        <>
            <li key={question} id={'faqCard_' + question} className='flex flex-row justify-between px-[5.56vw] py-[4vw] gap-[2vw] line-clamp-2' onClick={onOpened}>
                <p className='text-md'>{question}</p>
                <img className={isOpened ? 'transform rotate-180' : 'transform rotate-0'} src={getIcon('expand', colorScheme!)} />
            </li>
            {
                isOpened ? <FAQAnswerCard items={answer} isOpened={isOpened} onScroll={handleScroll} /> : null
            }
            <div key={`${question}_div`} className='w-full h-[2px] opacity-20 bg-light-onsecondary dark:bg-dark-onsecondary' />
        </>
    );
}

export default FAQCard;