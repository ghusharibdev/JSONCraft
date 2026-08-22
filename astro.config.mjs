import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jsoncraft.dev',
  output: 'static',
  integrations: [sitemap()],
  build: {
    format: 'directory',
    assets: 'assets'
  },
  vite: {
    build: {
      cssMinify: true,
    }
  }
});
