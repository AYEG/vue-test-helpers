const path = require('path')
const { setBuildExternals } = require('./build-helpers')

module.exports = {
  css: {
    extract: false,
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.module.rule('ts').uses.delete('cache-loader')
      config.module
        .rule('ts')
        .use('ts-loader')
        .loader('ts-loader')
        .tap(options => {
          options.configFile = 'tsconfig.build.json'
          options.transpileOnly = false
          options.happyPackMode = false
          return options
        })
    }
  },
  configureWebpack: config => {
    config.resolve.alias.tests = path.resolve(__dirname, './tests')
    if (process.env.NODE_ENV === 'production') {
      config.module.rules.forEach(v => {
        if (v.use) {
          let idx = v.use.findIndex(w => w.loader === 'thread-loader')
          if (idx !== -1) v.use.splice(idx, 1)
        }
      })
    }

    setBuildExternals(config)
  },
}
