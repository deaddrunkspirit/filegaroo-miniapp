import React from 'react';
import FAQCard from '../cards/FAQCard';
import { getIcon } from '../../services/imageService';
import { useTelegramContext } from '../../providers/TelegramContext';
import { NavLink } from 'react-router-dom';


const _faq_items: Record<string, string[]> = {
    "Что умеет бот Filegaroo?": [
        "Бот Filegaroo позволяет:",
        "Сохранять сообщения, файлы и записи.",
        "Хранить данные в папках.",
        "Присваивать названия файлам и папкам.",
        "Редактировать и удалять файлы, папки.",
        "Использовать удобную навигацию."
    ],
    "Как сохранить сообщение?": [
        "Для сохранения сообщения:",
        "Перешлите его в Filegaroo бота.",
        "В Filegaroo боте нажмите на кнопку 'Отправить'.",
        "Выберите папку и нажмите 'Сохранить здесь'."
    ],
    "Как создать папку?": [
        "Существует два способа создания папки:",
        "Перешлите сообщение в Filegaroo и выберите 'Создать папку'.",
        "Или используйте 'Folders' и нажмите на иконку '+'."
    ],
    "Как переименовать папку или сообщение?": [
        "Для переименования:",
        "Откройте 'Folders'.",
        "Нажмите на троеточие у нужной папки или файла.",
        "Выберите 'Переименовать' и введите новое название."
    ],
    "Как удалить папку или сообщение?": [
        "Для удаления:",
        "Откройте 'Folders'.",
        "Нажмите на троеточие у нужной папки или файла.",
        "Выберите 'Удалить' и подтвердите удаление."
    ],
    "Как работает навигация по приложению?": [
        "",
        "Используйте иконку домика для возвращения на главную.",
        "Используйте кнопку со стрелкой для шага назад."
    ],
    "Как сохранить из социальных сетей?": [
        "Перешлите сообщение из социальной сети в Telegram, выберите Filegaroo бота и нажмите 'Отправить'."
    ],
    "Это безопасно?": [
        "Да, безопасность обеспечивается системами сквозного шифрования Telegram. Доступ к вашим данным имеете только вы."
    ]
}

const FAQPage: React.FC = () => {
    const { colorScheme } = useTelegramContext()

    const faqCards = Object.entries(_faq_items).map(([q, a]) => (
        <FAQCard question={q} answer={a} />
    ));

    return (
        <div className='flex flex-col h-svh w-full items-center p-[8.33vw] bg-light-primary dark:bg-dark-primary'>
            <div className=' bg-light-secondary dark:bg-dark-secondary text-light-onsecondary dark:text-dark-onsecondary h-svh w-full rounded-3xl overflow-scroll'>
                <ul>
                    <li className='flex flex-col px-[5.56vw]'>
                        <div className='flex flex-row py-[4vw] justify-between items-center'>
                            <p className='text-lg' >FAQ</p>
                            <NavLink className='' to={'/'}>
                                <img src={getIcon('close', colorScheme!)} />
                            </NavLink>
                        </div>
                    </li>
                    <div className='w-full h-[2px] opacity-20 bg-light-onsecondary dark:bg-dark-onsecondary' />
                    {faqCards}
                </ul>
            </div>
        </div>
    );
}

export default FAQPage;