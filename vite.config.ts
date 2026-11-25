import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  build: isSsrBuild
    ? undefined
    : {
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) {
                return 'vendor-motion';
              }
              if (
                id.includes('node_modules/react') ||
                id.includes('node_modules/react-dom') ||
                id.includes('node_modules/react-router')
              ) {
                return 'vendor-react';
              }
            },
          },
        },
      },
  test: {
    environment: 'jsdom',
    globals: true,
  },
}));
