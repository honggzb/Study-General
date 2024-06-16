import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { pxToViewport } from './plugins/pxto-viewport'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend()
  ],
  css: {
    postcss: {
      plugins: [ pxToViewport() ]
    }
  },
})
