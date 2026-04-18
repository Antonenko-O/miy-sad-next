import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['uk', 'en'],
  defaultLocale: 'uk',
  // /uk/... and /en/... — show locale prefix for all
  localePrefix: 'always',
});
