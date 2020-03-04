module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/todo/' : '/',

  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/styles/variables.scss";`
      },
    }
  },

  pluginOptions: {
    express: {
      shouldServeApp: false,
      serverDir: './server'
    }
  }
}
