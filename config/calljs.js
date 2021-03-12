
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  outputDir: 'packages1',
  css: {
    modules: false,
    extract: true,
    sourceMap: false,
  },
  publicPath: process.env.NODE_ENV === 'production' ? '' : './',
  productionSourceMap: false,
  chainWebpack: con => {
    // js打包输出配置
    con.target('web'); // 默认为web
    con.output.libraryExport('default');
    con.entryPoints.delete('app');
    con.entry('CallTlinkpc').add('./src/config/CallTlinkpc.js');
    con.output.chunkFilename('[name].js');
    con.output.filename('[name].min.js');
    con.output.libraryTarget('umd');
    con.output.library('callPc'), // 库名，Windows下挂载的全局变量
      con.output.globalObject('this'), // 定义全局变量,兼容node和浏览器运行，避免出现"window is not defined"的情况
      con.optimization.splitChunks({ // 不拆分包
        cacheGroups: {},
      });
    con.optimization.minimize(false) // 禁止压缩
    con.output.filename('[name].js');
    // 禁用插件
    con.plugins
      .delete('workbox')
      .delete('copy')
      .delete('prefetch')
      .delete('preload')
      .delete('pwa')
      .delete('html');
  },
};
