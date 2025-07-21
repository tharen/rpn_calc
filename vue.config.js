const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  base: "/rpn_calc/",
  transpileDependencies: true,
  pwa: {
    name: 'RPN Calculator',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    }
  }
})
