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
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      // Fix: Vite 6.2.6+ returns 426 Upgrade Required when Host header doesn't match.
      // Setting allowedHosts: true allows all hosts to connect.
      allowedHosts: true as const,
    },
    // ═══ PRE-BUNDLE: Warm up key dependencies for faster dev server startup ═══
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'motion/react'],
    },
    build: {
      modulePreload: false,
      // ═══ TARGET: Modern browsers — smaller, faster output ═══
      target: 'esnext',
      // ═══ CHUNK SPLITTING: Separate vendor code so browser can cache independently ═══
      rollupOptions: {
        output: {
          manualChunks: {
            // Core React runtime — changes rarely, cache forever
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            // Animation library — large, cache separately
            'vendor-motion': ['motion/react'],
            // Data layer — separate so the app shell stays lighter
            'vendor-supabase': ['@supabase/supabase-js'],
            // Icon set — split to avoid pulling it into the main shell
            'vendor-icons': ['lucide-react'],
            // Markdown rendering — only needed on the content pages
            'vendor-markdown': ['react-markdown', 'rehype-raw'],
            // 3D helper — only needed by the portfolio carousel
            'vendor-three': ['three'],
          },
        },
      },
      // ═══ CHUNK SIZE WARNING THRESHOLD ═══
      chunkSizeWarningLimit: 600,
    },
  };
});
