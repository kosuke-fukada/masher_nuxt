import path from 'path'
import fs from 'fs'
import * as FontAwesome from './build/fontawesome'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Masher | Twitter無限いいねボタン',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/darkMode',
    '~/plugins/axios'
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
    '@nuxtjs/firebase'
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
    FIRE_ENV: process.env.FIRE_ENV,
    BACKEND_API_HOST: process.env.BACKEND_API_HOST,
    SESSION_SECRET: process.env.SESSION_SECRET,
    MYSQL_DB_HOST: process.env.MYSQL_DB_HOST,
    MYSQL_DB_NAME: process.env.MYSQL_DB_NAME,
    MYSQL_DB_USER_NAME: process.env.MYSQL_DB_USER_NAME,
    MYSQL_DB_PASSWORD: process.env.MYSQL_DB_PASSWORD
  },

  firebase: {
    config: {
      development: {
        apiKey: process.env.FIREBASE_API_KEY_DEV,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN_DEV,
        projectId: process.env.FIREBASE_PROJECT_ID_DEV,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET_DEV,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID_DEV,
        appId: process.env.FIREBASE_APP_ID_DEV,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID_DEV
      },
      production: {
        apiKey: process.env.FIREBASE_API_KEY_PROD,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN_PROD,
        projectId: process.env.FIREBASE_PROJECT_ID_PROD,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET_PROD,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID_PROD,
        appId: process.env.FIREBASE_APP_ID_PROD,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID_PROD
      }
    },
    services: {
      auth: true,
      firestore: true,
      analytics: true
    }
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
    middleware: [
      'accessLimit'
    ]
  },

  serverMiddleware: [
    '~/api/'
  ]
}
