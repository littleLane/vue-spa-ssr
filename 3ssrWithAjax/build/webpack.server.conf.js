const path = require('path')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseConfig = require('./webpack.base.conf')

module.exports = webpackMerge(baseConfig, {
  entry: {
    server: './src/entry-server.js'
  },
  // 因为是服务端打包的文件，所以需要设置服务端的配置
  target: 'node',
  output: {
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.ssr.html'),
      filename: 'index.ssr.html',
      files: {
        js: 'client.js',
        css: 'main.css'
      },
      // 不要在 index.ssr.html 中引入打包出来的 server.js
      // 而是引入浏览器端打包出的 client.js，以便进行 html 激活
      excludeChunks: ['server']
    })
  ]
})
