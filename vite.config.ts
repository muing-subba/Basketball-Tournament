import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about.html'),
          schedule: path.resolve(__dirname, 'schedule.html'),
          registration: path.resolve(__dirname, 'registration.html'),
          competitions: path.resolve(__dirname, 'competitions.html'),
          resources: path.resolve(__dirname, 'resources.html'),
          gallery: path.resolve(__dirname, 'gallery.html'),
          news: path.resolve(__dirname, 'news.html'),
          faq: path.resolve(__dirname, 'faq.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          feedback: path.resolve(__dirname, 'feedback.html'),
          login: path.resolve(__dirname, 'login.html'),
          dashboard: path.resolve(__dirname, 'dashboard.html'),
          sponsors: path.resolve(__dirname, 'sponsors.html'),
          highlights: path.resolve(__dirname, 'highlights.html'),
        },
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
