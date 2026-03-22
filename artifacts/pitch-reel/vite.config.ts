import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/pitch-reel/',
  server: {
    host: '0.0.0.0',
    port: 20724,
    allowedHosts: true,
    hmr: {
      clientPort: 443
    }
  }
});
