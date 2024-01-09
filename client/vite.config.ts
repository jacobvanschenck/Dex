import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      eslint({
        cache: false,
        include: ['./src/**/*.ts', './src/**/*.tsx'],
      }),
    ],
    define: {
      'process.env': env,
    },
  };
});
