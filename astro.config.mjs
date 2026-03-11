import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://fiord.design',
  integrations: [tailwind()],
  output: 'static',
  trailingSlash: 'always',
});
