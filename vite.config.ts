import { defineConfig } from "vite";
import path from 'path'
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/client'),
      '@pages': path.resolve(__dirname, './src/client/pages'),
      '@redux': path.resolve(__dirname, './src/client/redux'),
      '@components': path.resolve(__dirname, './src/client/components'),
      '@assets': path.resolve(__dirname, './src/client/assets'),
      '@utils': path.resolve(__dirname, './src/client/Utils'),
      '@services': path.resolve(__dirname, './src/client/services'),
    },
  }
});
