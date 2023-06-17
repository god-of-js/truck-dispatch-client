import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
  server: {
    open: true,
    port: 3000,
  },
  css: {
    preprocessorOptions: {
    },
  },
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  resolve: {
    alias: [
      { find: 'components', replacement: path.resolve(__dirname, 'src/components') },
      { find: 'ui', replacement: path.resolve(__dirname, 'src/components/ui') },
      { find: 'assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: 'Api', replacement: path.resolve(__dirname, 'src/api') },
    ],
  },
});
