import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3054,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src/1-app'),
      '@pages': path.resolve(__dirname, './src/2-pages'),
      '@features': path.resolve(__dirname, './src/3-features'),
      '@entities': path.resolve(__dirname, './src/4-entities'),
      '@shared': path.resolve(__dirname, './src/5-shared'),
      '@': path.resolve(__dirname, './src'),
    },
  },
});
