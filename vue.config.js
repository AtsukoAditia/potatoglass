module.exports = {
  devServer: {
    disableHostCheck: true
  },

  configureWebpack: {
    plugins: [
    ],
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.common.js',
        'jquery': 'jquery/src/jquery.js'
      }
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'id',
      fallbackLocale: 'id',
      localeDir: 'locales',
      enableInSFC: false
    }
  },

  pwa: {
    name: 'Proyekita',
    workboxOptions: {
      importWorkboxFrom: 'local'
    }
  },

  transpileDependencies: [
    'vuetify'
  ],

  outputDir: '../boma-web-prod'
}
