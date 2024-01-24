# filegaroo-miniapp

### Tech stack

Core - TypeScript | React.js | TailwindCSS

Additional libs - React-router-dom v6 | Tanstack React Query | axios

Package manager - pnpm

Bundler - Vite

### Локальная развертка

Для локальной развертки нам понадобится pnpm и git
```
git clone <repository>
cd filegaroo-miniapp
```
Создаем файл .env
```
VITE_API_URL=
VITE_DEBUG=
VITE_MOCKUP_INIT_DATA=
```
Заполняем API_URL, если нам необходимо запустить приложение без бота, нужно получить строку initData которую приложение получает при запуске (записать ее в VITE_MOCKUP_INIT_DATA). и поставить VITE_DEBUG в true.

Далее:
```
pnpm install
pnpm start
```
Приложение запущенно, но если нам нужен билд
```
pnpm build
serve -s build
```
Билд запущен и работает

### Deploy прод

Деплой происходит автоматически, т.к. к репозиторию подключен Netlify

Для деплоя в продакшен нужно вмерджить ветку в main, после деплой будет автоматический

Предварительно необходимо установить Env переменную VITE_API_URL в приложении Netlify