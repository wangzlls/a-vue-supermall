module.exports = {
  //配置cli
  configureWebpack: {
    //重新保存一些配置
    resolve: {
      //配置路径
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  devServer: {
    disableHostCheck: true,
  }
}

