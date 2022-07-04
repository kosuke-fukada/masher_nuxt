import fs from 'fs'
import path from 'path'
import * as FontAwesome from './build/fontawesome'
const envPath = `./.env.${process.env.NODE_ENV || 'local'}`
require('dotenv').config({
  path: envPath
})

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
  css: ['~/assets/scss/common.scss'],

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
    [
      '@nuxtjs/fontawesome',
      {
        autoAddCss: false
      }
    ],
    [
      '@nuxtjs/dotenv',
      {
        filename: `.env.${process.env.NODE_ENV}`
      }
    ]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
          measurementId: process.env.FIREBASE_MEASUREMENT_ID
        },
        services: {
          analytics: true,
          functions: true
        }
      }
    ],
    [
      '@nuxtjs/dotenv',
      {
        filename: `.env.${process.env.NODE_ENV}`
      }
    ]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BACKEND_API_HOST,
    credentials: true,
    headers: {
      common: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }
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
    SITE_URL: process.env.SITE_URL,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    NODE_ENV: process.env.NODE_ENV
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

  loadingIndicator: {
    name: 'three-bounce',
    color: '#00BFFF',
    background: '#FFFFFF'
  },

  toast: {
    position: 'top-center',
    duration: 1500,
    theme: 'outline',
    fullWidth: false,
    fitToScreen: false,
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
      },
      {
        name: 'signinCancelled',
        message: 'ログインをキャンセルしました',
        options: {
          type: 'info'
        }
      },
      {
        name: 'serverError',
        message: 'エラーが発生しました',
        options: {
          type: 'error'
        }
      }
    ]
  }
}
