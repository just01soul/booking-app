export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/styles/main.scss'],

  modules: [],

  typescript: {
    strict: true,
    typeCheck: true,
    shim: false
  },

  build: {
    transpile: ['zod']
  },

  nitro: {
    preset: 'static',
    prerender: {
      routes: ['/']
    }
  },

  app: {
    baseURL: '/booking-app/',
    head: {
      title: 'Бронирование столика',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },

  // Настройки компонентов
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
    '~/components/BookingForm',
    '~/components/ConfirmationScreen',
    '~/components/UI'
  ]
});
