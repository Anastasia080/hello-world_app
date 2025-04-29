import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: false // Отключаем тесты здесь, переносим в vitest.workspace.js
});