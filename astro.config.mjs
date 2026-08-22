import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jsoncraft-app.pages.dev',
  output: 'static',
  integrations: [sitemap()],
  build: {
    format: 'directory'
  },
  vite: {
    build: {
      cssMinify: true,
    }
  }
});
