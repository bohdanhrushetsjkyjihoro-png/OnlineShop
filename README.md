# OnlineShop — E-Commerce Web Application & PWA

Навчальний проєкт інтернет-магазину цифрової техніки з каталогом товарів, демонстраційною контактною формою, Express API та підтримкою встановлення й офлайн-кешування як PWA.

**Демо:** [onlineshop-demo.vercel.app](https://onlineshop-demo.vercel.app)

**Репозиторій:** [bohdanhrushetsjkyjihoro-png/OnlineShop](https://github.com/bohdanhrushetsjkyjihoro-png/OnlineShop)

## Технології

- HTML5 і CSS3: семантична розмітка, BEM, CSS variables, Flexbox і Grid
- Tailwind CSS для сторінки магазину в `OnlineShop/`
- JavaScript ES6+: DOM, Fetch API, async/await та валідація форм
- Node.js і Express для демонстраційного REST API в `server/`
- Web App Manifest і Service Worker для PWA-функцій
- React-компоненти-приклади розміщені в `OnlineShop/src/`

## Можливості

- Каталог товарів завантажується з `GET /api/projects`.
- Форма контактів надсилається на `POST /api/contact`; телефон перевіряється на формат `+380XXXXXXXXX`.
- Сторінка `OnlineShop/news.html` завантажує демонстраційні дописи з JSONPlaceholder.
- Світла й темна теми, фільтри категорій і лічильники вподобань є у React-прикладі.
- PWA використовує `OnlineShop/manifest.webmanifest`, `OnlineShop/service-worker.js` та локальні SVG-іконки. Service Worker кешує ресурси оболонки й надає сторінки для офлайн-навігації.

## Запуск локально

1. Запустіть API:

   ```sh
   cd server
   npm install
   npm start
   ```

   API слухає порт `3000` і надає маршрути `/api/projects` та `/api/contact`.

2. В іншому терміналі зберіть CSS:

   ```sh
   cd OnlineShop
   npm install
   npm run build:css
   ```

3. Віддавайте файли `OnlineShop/` через локальний HTTP-сервер. Не відкривайте сторінку через `file://`: Fetch API та Service Worker потребують HTTP(S). Запити до API налаштовані на `http://localhost:3000/api`.

## Структура

- `OnlineShop/index.html` — Tailwind-сторінка магазину
- `OnlineShop/news.html` — демонстраційна сторінка новин і контактної форми
- `OnlineShop/script.js` — клієнтська логіка API, форми та Service Worker
- `OnlineShop/manifest.webmanifest` — метадані PWA
- `OnlineShop/service-worker.js` — кешування ресурсів для офлайн-режиму
- `OnlineShop/src/` — React-компоненти-приклади
- `server/` — Express API
- `AutoShop/` — окрема сторінка AutoShop

> React-компоненти в `OnlineShop/src/` є навчальними прикладами: у цій папці наразі не налаштовано окремий Vite-застосунок або build-скрипт.
