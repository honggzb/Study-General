import { defineConfig } from 'vite'
import useResize from './src'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'useResize'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          useResize: "useResize"
        }
      }
    }
  }
})
