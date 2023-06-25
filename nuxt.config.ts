// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@sidebase/nuxt-auth',
    '@nuxtjs/tailwindcss',
    '@element-plus/nuxt',
    '@vueuse/nuxt'
  ],
  typescript: {
    shim: false
  },
  alias:{
    "@" : "/"
  },
  app: {
    head: {
      title: "Nuxt Blog",
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' }
      ]
    }
  },
  css: [
    "~/assets/css/main.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  elementPlus: {
    icon: "ElIcon",
  },
  auth:{
    isEnabled:true,
    origin:"http://localhost:3000",
    defaultProvider: "username"
  }
})
