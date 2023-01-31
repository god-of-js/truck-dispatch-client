import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
  },
  server: {
    open: true,
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use 'sass:math';

          @function pxToRem($px, $base-size: 16px) {
            @return math.div($px * 1px, $base-size) * 1rem; 
          }          
          `,
      },
    },
  },
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  resolve: {
    alias: {
      components: './src/components',
      ui: './src/components/ui',
      assets: './src/assets',
      Api: './src/Api/index',
    },
  },
});
