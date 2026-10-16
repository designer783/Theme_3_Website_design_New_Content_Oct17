import type { PageRoute } from './types';
import site from './config/site.json';

// URL + <title> for every page. Used by the app at runtime and by vite.config.ts
// to emit a real HTML file per page (e.g. dist/pricing.html, served at /pricing) for cPanel hosting.
export const ROUTES: Record<PageRoute, { path: string; title: string }> = {
  'home': { path: '/', title: `${site.name} — Vehicle Intelligence & Window Stickers` },
  'vehicle-history': { path: '/vehicle-history', title: `Vehicle History Reports | ${site.name}` },
  'sample': { path: '/sample-report', title: `Sample Report | ${site.name}` },
  'pricing': { path: '/pricing', title: `Pricing | ${site.name}` },
  'contact': { path: '/contact', title: `Contact Us | ${site.name}` },
  'login': { path: '/login', title: `Login | ${site.name}` },
  'terms': { path: '/terms', title: `Terms & Conditions | ${site.name}` },
  'privacy': { path: '/privacy', title: `Privacy Policy | ${site.name}` },
  'style-guide': { path: '/style-guide', title: `Style Guide | ${site.name}` },
};

export const pageFromPath = (pathname: string): PageRoute => {
  const normalized = '/' + pathname.replace(/^\/+|\/+$/g, '').replace(/\/?index\.html$/, '').replace(/\.html$/, '');
  const match = (Object.keys(ROUTES) as PageRoute[]).find(
    (page) => ROUTES[page].path.replace(/\/$/, '') === normalized.replace(/\/$/, '')
  );
  return match ?? 'home';
};
