import { defineConfig } from 'vite'
// import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api': {
        target: 'http://localhost:3001',
        secure: false,
      }
    }
  },
  plugins: [
    // TanStackRouterVite(),
    react()
  ],
})
