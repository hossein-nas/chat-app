import { defineConfig } from 'vite'
import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '~': resolve(__dirname, './node_modules/')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#1EBE71',
          'body-background': '#F5F6F9',
          'font-size-base': '16px',
          'font-size-sm': '14px',
          'switch-shadow-color': 'transparent',
          'switch-height': '20px'
        }
      }
      // ....
    }
  },
  plugins: [
    vue(),
    ViteComponents({
      customComponentResolvers: [AntDesignVueResolver({ importLess: true })]
    })
  ]

})
