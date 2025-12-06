import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    plugins: [react()],
    server: {
        // Proxy API requests to backend in development only
        // In production, VITE_API_URL environment variable will be used
        proxy: mode === 'development' ? {
            '/api': {
                target: 'http://localhost:3000',  // Backend dev server
                changeOrigin: true,
            },
        } : undefined,
    },
}))
