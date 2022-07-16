import path from 'path'
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const _dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  base: '/nogle-test/dist/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(_dirname, 'src')
    }
  }
})
