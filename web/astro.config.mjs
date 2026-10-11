// @ts-check
import { defineConfig } from 'astro/config';

// SITE y BASE_PATH los define el workflow de GitHub Pages.
// En local: sitio en la raíz (/).
export default defineConfig({
  site: process.env.SITE ?? 'https://tu-usuario.github.io',
  base: process.env.BASE_PATH ?? '/',
  output: 'static',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
});
