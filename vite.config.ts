import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // или другой ваш плагин, если используется Vue/Preact

export default defineConfig({
  plugins: [react()],
  base: '/Portfolio/', // <--- ОБЯЗАТЕЛЬНО ДОБАВЬТЕ ЭТУ СТРОКУ
})
