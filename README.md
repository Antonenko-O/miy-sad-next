# My Garden — Next.js

Нова версія My Garden на Next.js з підтримкою двох мов (uk/en) і SEO-сторінками.

## Швидкий старт

```bash
npm install
npm run dev
# → http://localhost:3000 (перенаправить на /uk)
```

## Структура проєкту

```
app/
  [locale]/
    page.tsx              ← головний SPA-додаток
    plants/[id]/page.tsx  ← SEO-сторінка рослини
    diseases/[id]/page.tsx← SEO-сторінка хвороби
    blog/page.tsx         ← блог (Фаза 3)
components/
  AppShell.tsx            ← замінює App.tsx, SPA-оболонка
  screens/                ← всі екрани (HomeScreen, CatalogScreen...)
  BottomNav.tsx, ...      ← UI-компоненти
lib/
  data.ts                 ← функції для читання JSON-даних
  plantImages.ts          ← ← ДОДАВАЙ СЮДИ нові plant IDs після генерації в Midjourney
  diseaseMatch.ts         ← матчинг хвороб
  myGarden.ts             ← localStorage для саду (потім → Firebase)
  i18n/                   ← налаштування next-intl
messages/
  uk.json                 ← українські рядки
  en.json                 ← англійські рядки
data/                     ← JSON бази (plants, diseases, tools, catalog)
public/
  images/plants/          ← ← КИДАЙ СЮДИ нові .webp зображення
types/
  index.ts                ← TypeScript типи
```

## Додавання нових зображень (Midjourney)

1. Скинь `.webp` файл у `public/images/plants/` (ім'я = id рослини, наприклад `persyk.webp`)
2. Відкрий `lib/plantImages.ts` і додай `'persyk'` до масиву `ILLUSTRATED_PLANTS`
3. `git commit` → auto-deploy на Vercel

## Додавання нових перекладів

Відкрий `messages/uk.json` і `messages/en.json` — обидва файли мають бути синхронізовані.  
У компонентах: `const t = useTranslations('nav')` → `t('home')`.

## Деплой на Vercel

```bash
# Створи новий репозиторій на GitHub, потім:
git init
git add .
git commit -m "Initial Next.js migration with i18n"
git remote add origin https://github.com/YOUR_USERNAME/miy-sad-next.git
git push -u origin main
```

Потім у Vercel: "Add New Project" → вибрати репозиторій → деплой автоматично.

## URL-структура

| URL | Що відкриває |
|-----|-------------|
| `/uk` | Головний додаток (UA) |
| `/en` | Головний додаток (EN) |
| `/uk/plants/troyanda-sadova` | SEO-сторінка троянди (UA) |
| `/en/plants/troyanda-sadova` | SEO-сторінка троянди (EN) |
| `/uk/diseases/boroshnysta-rosa` | SEO-сторінка хвороби (UA) |
| `/uk/blog` | Блог (Фаза 3) |
