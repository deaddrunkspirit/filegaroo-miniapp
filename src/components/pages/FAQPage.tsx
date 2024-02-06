import React, { useRef } from 'react';
import FAQCard from '../cards/FAQCard';
import { getIcon } from '../../services/imageService';
import { useTelegramContext } from '../../providers/TelegramContext';
import { NavLink } from 'react-router-dom';
import getLocalizationString from '../../services/languageService';


const FAQPage: React.FC = () => {
    const { colorScheme } = useTelegramContext()
    const containerRef = useRef<HTMLDivElement>(null);

    const faqCards = Object.entries(getLocalizationString('faq-page-content')).map(([q, a]) => (
        <FAQCard key={q} question={q} answer={a} />
    ));

    return (
        <div className='flex flex-col h-svh w-full items-center p-[8.33vw] bg-light-primary dark:bg-dark-primary'>
            <div id="faqContainer" ref={containerRef} className=' bg-light-secondary dark:bg-dark-secondary text-light-onsecondary dark:text-dark-onsecondary min-h-full w-full rounded-3xl overflow-y-auto'>
                <ul className=''>
                    <li key={'faq_title'} className='flex flex-col px-[5.56vw]'>
                        <div className='flex flex-row py-[4vw] justify-between items-center'>
                            <p className='text-lg' >FAQ</p>
                            <NavLink className='' to={'/'}>
                                <img src={getIcon('close', colorScheme!)} />
                            </NavLink>
                        </div>
                    </li>
                    <div key={'faq_div'} className='w-full h-[2px] opacity-20 bg-light-onsecondary dark:bg-dark-onsecondary' />
                    {faqCards}
                </ul>
            </div>
        </div>
    );
}

export default FAQPage;