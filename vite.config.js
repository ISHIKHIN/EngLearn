import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: '/EngLearn/', // имя вашего репозитория
    server: {
        port: 3000,
        open: true
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // Разделяем vendor chunks
                    if (id.includes('node_modules')) {
                        // Реакт и связанные библиотеки в отдельный chunk
                        if (id.includes('react') ||
                            id.includes('react-dom') ||
                            id.includes('react-router')) {
                            return 'react-vendor';
                        }
                        // Остальные зависимости
                        return 'vendor';
                    }
                },
                // Оптимизация имен файлов
                entryFileNames: 'assets/[name]-[hash].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]'
            }
        }
    },
    optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom']
    }
})