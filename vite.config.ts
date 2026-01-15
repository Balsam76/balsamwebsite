import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Plugin to ensure .well-known folder is copied during build
    {
      name: 'copy-well-known',
      closeBundle() {
        const src = join(__dirname, 'public', '.well-known');
        const dest = join(__dirname, 'dist', '.well-known');
        
        if (existsSync(src)) {
          if (!existsSync(dest)) {
            mkdirSync(dest, { recursive: true });
          }
          
          const assetlinksSrc = join(src, 'assetlinks.json');
          const assetlinksDest = join(dest, 'assetlinks.json');
          
          if (existsSync(assetlinksSrc)) {
            copyFileSync(assetlinksSrc, assetlinksDest);
            console.log('✅ Copied assetlinks.json to dist/.well-known/');
          }
        }
      },
    },
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Support for client-side routing
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
    // Ensure public folder is copied
    copyPublicDir: true,
  },
  // Public directory configuration
  publicDir: 'public',
});
