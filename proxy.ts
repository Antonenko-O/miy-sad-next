import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all paths except static files, api routes, _next
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
