# Деплой на GitHub Pages

## Шаги для деплоя:

### 1. Создайте репозиторий на GitHub
- Перейдите на [github.com](https://github.com) и создайте новый репозиторий
- Назовите его `claro-landing` (или любое другое имя)
- **НЕ инициализируйте** с README, .gitignore или лицензией

### 2. Обновите base в vite.config.js (если нужно)
Если вы назвали репозиторий не `claro-landing`, откройте `vite.config.js` и измените:
```js
base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
```

### 3. Инициализируйте git и запушьте код
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/claro-landing.git
git push -u origin main
```

### 4. Настройте GitHub Pages
1. Перейдите в Settings вашего репозитория
2. В левом меню выберите "Pages"
3. В разделе "Source" выберите "GitHub Actions"

### 5. Деплой произойдет автоматически
После push в main ветку:
- GitHub Actions автоматически запустит workflow
- Проект будет собран и задеплоен
- Сайт будет доступен по адресу: `https://YOUR_USERNAME.github.io/claro-landing/`

## Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр prod сборки
npm run preview
```

## Проверка работы

После деплоя:
1. Перейдите в раздел "Actions" в вашем репозитории
2. Проверьте статус workflow "Deploy to GitHub Pages"
3. После успешного завершения откройте ваш сайт

## Обновление сайта

Просто сделайте изменения и запушьте в main:
```bash
git add .
git commit -m "Update content"
git push
```

GitHub Actions автоматически задеплоит обновления!