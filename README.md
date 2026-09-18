# Расписание СПбГАУ — ИАиПП, 1 курс

Готовый статический сайт без сборщика и зависимостей.

## Запуск локально

Самый простой вариант — открыть `index.html` в браузере.

Для локального сервера:

```bash
python3 -m http.server 8000
```

Затем открыть http://localhost:8000

## GitHub Pages

1. Создайте новый репозиторий.
2. Загрузите `index.html`, `styles.css`, `app.js`, `data.js`.
3. Settings → Pages → Deploy from a branch → `main` / root.
4. Сайт будет доступен по адресу GitHub Pages.

## Vercel

Загрузите папку проекта в новый GitHub-репозиторий и импортируйте его в Vercel. Framework Preset: `Other`, Build Command: пусто, Output Directory: `.`.

## Важно о данных

Источник — официальный PDF СПбГАУ:
https://spbgau.ru/upload/documents/schedule/ИАиПП%201%20курс-1809.pdf

В `data.js` находится структурированная версия расписания для быстрого просмотра. Оригинал PDF всегда доступен по кнопке «Открыть PDF».
