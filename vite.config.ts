import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@common': '/src/common',
      '@pages': '/src/pages',
      '@static': '/src/static',
      '@utils': '/src/utils',
      '@utils/helpers': '/src/utils/helpers',
      '@utils/hooks': '/src/utils/hooks',
      '@features': '/src/features',
      '@features/*': '/src/features/*'
    }
  }
});
