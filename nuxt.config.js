module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '头条搜索',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'preLoad', href: 'https://lf1-ttcdn-tos.pstatp.com/obj/card-system/HeadBar/dist_browser/images/logo-2x.a7b8b9c7.png' },  // 首页图片预加载
      { rel: 'preLoad', href: 'https://lf1-ttcdn-tos.pstatp.com/obj/card-system/HeadBar/dist_browser/images/icon_hot.40711151.png' },
      { rel: 'shortcut icon', type: 'image/x-icon', href: '//s3a.pstatp.com/toutiao/resource/ntoutiao_web/static/image/favicon_5995b44.ico' }
      // { rel: 'preconnect', href: 'http://localhost:3000/search/searchList/' },
      // { rel: 'preconnect', href: 'http://localhost:3000/search/searchContent/' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~assets/css/main.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
   /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    // '@nuxtjs/axios'
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLINT on save
     */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
