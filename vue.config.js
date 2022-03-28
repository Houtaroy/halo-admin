const pkg = require('./package.json')

const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: process.env.PUBLIC_PATH,

  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].version = pkg.version
      return args
    })
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'border-radius-base': '2px'
        },
        javascriptEnabled: true
      }
    }
  },

  lintOnSave: false,
  transpileDependencies: [],
  productionSourceMap: false,
  devServer: {
    port: 8001,
    proxy: {
      '/oauth2': {
        target: 'http://10.10.10.107:9000'
      },
      '/api/admin': {
        target: 'http://10.10.10.107:9000/halo-admin',
        ws: true,
        changeOrigin: true
      }
    }
  }
})
