import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://mkmukulkumar.github.io/Outreachy/ on GitHub Pages
  base: '/Outreachy/',
  plugins: [react(), tailwindcss()],
})
