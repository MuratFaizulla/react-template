import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@app': '/src/app',
      '@pages': '/src/pages',
      '@widgets': '/src/widgets',
      '@features': '/src/features',
      '@shared': '/src/shared',
      '@shared/ui': '/src/shared/ui',
      '@shared/api': '/src/shared/api',
      '@shared/config': '/src/shared/config',
      '@shared/lib': '/src/shared/lib',
      '@static': '/src/static'
    }
  }
});
