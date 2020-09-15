const ENV = require('./env.js') // 系统配置项
const pkg = require('./package')


module.exports = {
  mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    title: ENV._HEAD.title,
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, user-scalable=no, minimal-ui, maximum-scale=1.0, minimum-scale=1.0"
      },
      {
        hid: "description",
        name: "description",
        content: ENV._HEAD.description
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#59c292" },

  /*
   ** Global CSS
   */
  css: [
    "element-ui/lib/theme-chalk/index.css",
    "~assets/style/reset.css",
    "~assets/style/global.less"
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["@/plugins/element-ui", "~/plugins/axios", "~/plugins/utils"],

  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/style-resources"],

  styleResources: {
    less: "./assets/style/variable.less"
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    filenames: {
      app: ({ isDev }) =>
        isDev ? "[name].js" : "[chunkhash]." + ENV._VERSION + ".js",
      chunk: ({ isDev }) =>
        isDev ? "[name].js" : "[id].[chunkhash]." + ENV._VERSION + ".js"
    },

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },

  axios: {
    proxy: true,
    prefix: "/api/",
    credentials: true
    // See https://github.com/nuxt-community/axios-module#options
  },

  proxy: {
    "/api/": {
      target: ENV._APIROOT, //这个网站是开源的可以请求到数据的
      pathRewrite: {
        "^/api/": "/",
        changeOrigin: true
      }
    }
  },

  router: {
    middleware: ["header", "device"] // 为应用的每个页面设置默认的中间件
  },

  server: {
    port: ENV._PORT, // default: 3000
    host: "0.0.0.0" // default: localhost
  }
};
