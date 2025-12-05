## Охоплення блоків
- `screen` (сплеш/екран рулетки)
- `reel`, `track`, `indicator`
- Картки предметів: `itemBox`, `itemEmoji`, `itemLabel`, `rarity_*`
- Блок результату: `result`, `result_card`, `result_title`
- Панель вибору кейсів: `container`, `title`, `groupButtons`, `openBlock`
- Контент кейсу (emoji-ґрід): `emojis_title`, `emojis_items`
- Гайд рідкості: `rarityGuide_*`

## Брейкпойнти
- 1280px, 1024px, 768px, 600px, 480px, 400px
- Зменшення висот, відступів, ширин, кількості колонок; тримати центр через `margin: 0 auto`

## Технічна реалізація
- `src/features/board/styles/CasesScreen.module.scss`
  - Висота `screen`: 248→200→160→140px по брейкпойнтах (вже є) — додати `padding` і зменшити `border-radius` на <480px
  - `reel`: гарантувати `overflow: hidden`, `border-radius: 8px` зменшити на <480px
  - `track`: `gap` 16→12→8→6px (вже є) — додати `min-width` захист, щоб стрічка не стискалась надмірно
  - `indicator`: 4→3→2px (вже є) — додати легший `box-shadow` на <480px
- `src/features/board/styles/CasesItems.module.scss`
  - `itemBox`: зменшення width/height (вже є) — додати `padding` вниз до 6–8px на <480px, щоб не "тиснуло" текст
  - `itemEmoji`: 60→48→40→34px (вже є) — перевірити line-height
  - `itemLabel`: зменшити шрифт і `margin-top` на <400px (вже є)
- `src/features/board/styles/CasesLayout.module.scss`
  - `container`: `max-width` 653→720→640→560→360px, `margin: 0 auto` (вже є) — додати `padding` корекції на 600px
  - `groupButtons`: `flex-wrap`, зменшення `gap` (вже є) — додати `justify: center` на <768px
  - `openBlock`: дрібний `margin` коригування на <480px
  - `emojis_items`: колонки 7→5→4→3 (вже є) — додати 2 колонки на <360px, щоб уникати переповнення
- `src/features/board/styles/CasesResult.module.scss`
  - Зменшити `padding` і `border-radius` на <480px/<400px (частково є) — перевірити `box-shadow` інтенсивність на малих екранах
- `src/features/board/styles/CasesRarityGuide.module.scss`
  - Grid: 3→2→1 колонки залежно від ширини (додати @media <768px→2, <480px→1)
  - Зменшити `max-width` колонок і `gap`

## Поведінкові деталі
- Центрування всіх блоків через `max-width` + `margin: 0 auto` — не прилипати праворуч
- Забезпечити читабельність: мінімальні розміри карток/шрифтів
- Поважати `prefers-reduced-motion`: ослабити анімації на малих екранах або при цьому налаштуванні

## Тестування
- Перевірити в ширинах: 1280, 1024, 768, 600, 480, 400, 360px
- Візуально: екран не ламається, рулетка видима, індикатор по центру, картки не обрізаються
- Перевірити CasesScreen + CasesGame разом: вибір кейсу, відкриття, результат і гайд

## Внесення змін
- Лише SCSS-модулі (без змін логіки): `CasesScreen.module.scss`, `CasesItems.module.scss`, `CasesLayout.module.scss`, `CasesResult.module.scss`, `CasesRarityGuide.module.scss`
- Додати недостаючі @media та дрібні коригування відступів/радіусів/теней

Підтверди, і я внесу ці адаптивні правки у стилі зазначених модулів, не змінюючи дизайн і логіку.