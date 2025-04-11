import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/face-recognition-fullstack-1",
  server: {
    proxy: {
      '/clarifai': {  // 👈 Requests starting with `/clarifai` will be proxied
        target: 'https://api.clarifai.com',  // 👈 Target API
        changeOrigin: true,  // 👈 Needed for CORS
        rewrite: (path) => path.replace(/^\/clarifai/, ''),  // 👈 Remove `/clarifai` prefix
        secure: false,  // 👈 Optional (if Clarifai uses HTTPS)
      },
    },
  },
});