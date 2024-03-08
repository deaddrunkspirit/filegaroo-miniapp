import React from "react";
import { useEffect, useRef } from "react";

type FAQAnswerProps = {
    items: string[];
    isOpened: boolean;
    onScroll: () => void;
}

const FAQAnswerCard: React.FC<FAQAnswerProps> = ({ items, isOpened, onScroll }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const first = items[0];
    const list = items.slice(1);

    useEffect(() => {
        if (isOpened) {
            onScroll();
        }
    }, [isOpened, onScroll]);

    return (
        <div className='px-[5.56vw] pb-[6vw]' key={first} ref={containerRef}>
            <p className='text-sm'>{first}</p>
            <ul className=' px-[4vw] list-disc'>
                {list.map((item, i) =>
                    <li className={`text-sm`} key={i}>{item}</li>
                )}
            </ul>
        </div>
    );
}

export default FAQAnswerCard;