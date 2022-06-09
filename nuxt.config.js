import fs from 'fs'
import path from 'path'
import * as FontAwesome from './build/fontawesome'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s | Masher - Twitter無限いいねボタン',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'MasherはTwitterのいいねボタンを無限に押せるサービスです。お持ちのTwitterアカウントでログインするだけで簡単に始められます。気に入ったツイートに思う存分いいねしよう！' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Masher - Twitter無限いいねボタン' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: process.env.SITE_URL },
      { hid: 'og:title', property: 'og:title', content: 'Masher - Twitter無限いいねボタン' },
      { hid: 'og:description', property: 'og:description', content: 'MasherはTwitterのいいねボタンを無限に押せるサービスです。お持ちのTwitterアカウントでログインするだけで簡単に始められます。気に入ったツイートに思う存分いいねしよう！' },
      { hid: 'og:image', property: 'og:image', content: process.env.SITE_URL + '/masher_ogp.png' },
      { name: 'twitter:card', content: 'summary_large_image' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        type: 'text/javascript',
        async: true,
        defer: true,
        src: 'https://platform.twitter.com/widgets.js'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
    {
      src: '~/plugins/loading',
      ssr: false
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/toast'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://local.masher.app:3000',
    credentials: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: []
  },

  watchers: {
    webpack: {
      ignored: /(node_modules)|(.git)/
    }
  },

  fontawesome: {
    icons: {
      solid: FontAwesome.solid,
      regular: FontAwesome.regular,
      brands: FontAwesome.brands
    }
  },

  env: {
    BACKEND_API_HOST: process.env.BACKEND_API_HOST,
    SESSION_SECRET: process.env.SESSION_SECRET,
    SITE_URL: process.env.SITE_URL
  },

  server: {
    https: {
      key: fs.readFileSync(path.resolve('server.key')),
      cert: fs.readFileSync(path.resolve('server.crt'))
    },
    host: 'local.masher.app',
    port: 3000
  },

  router: {
    middleware: [],
    extendRoutes (routes, resolve) {
      routes.push({
        name: '404Error',
        path: '*',
        component: resolve('~/pages/404.vue')
      })
    }
  },

  serverMiddleware: [
    '~/api/'
  ],

  loadingIndicator: {
    name: 'three-bounce',
    color: '#00BFFF',
    background: '#FFFFFF'
  },

  toast: {
    position: 'top-center',
    duration: 1500,
    theme: 'outline',
    register: [
      {
        name: 'addLikeSuccess',
        message: 'いいねを追加しました！',
        options: {
          type: 'success'
        }
      },
      {
        name: 'addLikeError',
        message: 'いいねを追加できませんでした',
        options: {
          type: 'error'
        }
      }
    ]
  }
}
