import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Colores compartidos entre el manifest y index.html (<meta name="theme-color">).
const THEME_COLOR = '#1d4ed8'
const BACKGROUND_COLOR = '#ffffff'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // El service worker se actualiza solo cuando publicas una nueva versión.
      registerType: 'autoUpdate',
      manifest: {
        name: 'Starter PWA — Desarrollo Multiusuario / Multiplataforma',
        short_name: 'Starter PWA',
        description: 'Base común del curso para construir una Progressive Web App.',
        lang: 'es',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        theme_color: THEME_COLOR,
        background_color: BACKGROUND_COLOR,
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Estrategia sencilla: precachear los archivos estáticos generados por el build.
        globPatterns: ['**/*.{js,css,html,svg,png,ico,webmanifest}'],
        // Permite abrir cualquier ruta de React Router sin conexión.
        navigateFallback: 'index.html',
      },
      // El service worker NO se activa en `npm run dev`.
      // Las funciones PWA se prueban con `npm run build` + `npm run preview`.
      devOptions: {
        enabled: false,
      },
    }),
  ],
})
