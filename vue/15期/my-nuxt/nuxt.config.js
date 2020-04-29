
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  // 生成路由的配置
  router: {
    // 执行的中间件，有严格的顺序，中间件是链式执行，如果中间件有顺序依赖，就要严格控制
    // middleware:['auth'],
    extendRoutes(routes, resolve) {
      // routes:生成的路由表，看到的就是.nuxt/router.js的配置；可以对路由进行改造

      routes.push({
        name: "foo",
        path: "/foo",
        component: resolve(__dirname, "pages/custom.vue") // 加载指定文件
      });
    }
  },

  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: 'plugins/ElementUI', ssr: true },
    // '@/plugins/ElementUI'
    '@/plugins/api-inject',
    '@/plugins/interceptor'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios', //npm install @nuxtjs/axios -S
    "cookie-universal-nuxt" //npm i -S cookie-universal-nuxt
  ],
  axios: {
    proxy:true
  }, // 不是总会发生跨域的，在首屏渲染时是服务端发起请求的，不会跨域，但是在前端页面再发起其他请求就会发生跨域了
  proxy: {
    "/api":"http://localhost:8080" //设置跨域代理；不是必须的，如果服务器nginx配置好代理（提前处理好接口的调用）就不用了
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    // vendor:['element-ui'] //在webpack4弃用了
  }
}
