const path = require('path')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const baseConfig = require('./webpack.base.conf')

module.exports = webpackMerge(baseConfig, {
  entry: {
    client: './src/entry-client.js'
  },
  plugins: [
    new VueSSRClientPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      filename: 'index.html'
    }),
    new CleanWebpackPlugin()
  ]
})
