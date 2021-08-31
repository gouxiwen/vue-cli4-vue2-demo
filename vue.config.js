const context = process.env.CONTEXT; 
if (context === 'calljs') {
  module.exports = require('./config/calljs');
} else {
  module.exports = {
    lintOnSave: true, // 配置eslint-loader 取值有true，false，error，取error就会在浏览器页面显示
    publicPath: './',
    devServer: {
      port: 8100,
      open: true,
      overlay: {//设置浏览器页面显示
        warnings: false,
        errors: true
      },
      // autoOpenBrowser: true,
      proxy: {
        '^/gaea': {
          // pathRewrite: {
          //   '^/testApi': ''
          // },
          // target: '',
          target: 'http://localhost:8100',
          secure: false,
          changeOrigin: true
          // logLevel: 'debug'
        },
      }
    },
    // pages: {
    //   index: {
    //     // page 的入口
    //     entry: 'src/main.js',
    //     // 模板来源
    //     template: 'public/index.html',
    //     // 在 dist index.html 的输出
    //     filename: 'index.html',
    //     // 当使用 title 选项时，
    //     // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //     title: 'upload',
    //     // // 在这个页面中包含的块，默认情况下会包含
    //     // // 提取出来的通用 chunk 和 vendor chunk。
    //     chunks: ['runtime', 'chunk-vendors', 'vue', 'element-ui', 'chunk-common', 'app', 'index']
    //   },
    //   padis: {
    //     // page 的入口
    //     entry: 'src/main.js',
    //     // 模板来源
    //     template: 'public/index.html',
    //     // 在 dist index.html 的输出
    //     filename: 'padis.index.html',
    //     // 当使用 title 选项时，
    //     // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //     title: '隐私协议',
    //     // // 在这个页面中包含的块，默认情况下会包含
    //     // // 提取出来的通用 chunk 和 vendor chunk。
    //     chunks: ['runtime', 'chunk-vendors', 'vue', 'element-ui', 'chunk-common', 'app', 'padis']
    //   }
    // }
  };
}
