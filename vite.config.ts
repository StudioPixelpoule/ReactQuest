import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Copy assets to assets directory in production
    assetsDir: 'assets',
    // Generate source maps for better debugging
    sourcemap: true,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});