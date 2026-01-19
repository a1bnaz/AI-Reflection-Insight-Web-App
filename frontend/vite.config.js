import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    // This tells Vite: if the browser requests /api, forward it to the Spring Boot server (port 8080)
    proxy: {
      '/api': {
        target: 'https://ai-reflection-insight-web-app.onrender.com',
        changeOrigin: true,
        secure: true, // Set to true if Spring Boot is running over HTTPS
      },
    },
  },
})
