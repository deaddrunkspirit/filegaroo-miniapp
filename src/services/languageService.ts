const localizationMap: { [key: string]: { [key: string]: string } } = {
    'ru': {
        'main-page-name': 'Главная',
        'default-folder-name': 'Новая папка',
        'delete': 'Удалить',
        'rename': 'Переименовать',
        'new-name': 'Новое название',
        'name': 'Название папки',
        'folder-name-placeholder': 'Новая папка',
        'save': 'Сохранить',
        'cancel': 'Отменить',
        'ensure-delete-folder': 'Вы действительно хотите удалить папку?',
        'ensure-delete-message': 'Вы действительно хотите удалить сообщение?',
    },
    'en': {
        'main-page-name': 'Home',
        'default-folder-name': 'New folder',
        'delete': 'Delete',
        'rename': 'Rename',
        'new-name': 'New name',
        'name': 'Title',
        'folder-name-placeholder': 'New folder',
        'save': 'Save',
        'cancel': 'Cancel',
        'ensure-delete-folder': 'Are you sure you want to delete the folder?',
        'ensure-delete-message': 'Are you sure you want to delete the message?',
    },
}

export default function getLocalizationString(lang: string, name: string) {
    return localizationMap[lang][name];
}
