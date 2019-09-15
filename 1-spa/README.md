# Vue SPA

SPA (single page application) 单页应用，当然我们这里给出的例子是单入口的应用。工程的配置是很简单的，但是要想运用于实际的项目开发还需要修改、完善很多地方，毕竟我们这里只给出了最最简单的实例代码。

## 项目目录结构

```bash
├── src                 // 项目主目录
│   ├── components      // 项目涉及的组件目录
│   │   ├── Bar.vue     // Bar 组件
│   │   └── Foo.vue     // Foo 组件
│   ├── App.vue         // App 主页面
│   └── index.js        // 项目主入口文件（webpack 解析的入口文件）
├── .babelrc            // babel 配置文件
├── index.html          // 项目 html 入口文件
├── package.json        // 项目管理文件
├── postcss.config.js   // postcss 配置文件
├── webpack.config.js   // webpack 配置文件
```

## 文件

### webpack.config.js

该配置文件是针对 webpack 打包配置的

```javascript
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const VueLoaderPlugin = require('vue-loader/lib/plugin')
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')

  module.exports = {
    // webpack 编译模式，有 development 开发模式和 production 生产模式
    // development 会执行基础的代码编译、打包处理
    // production 则会在 development 模式的基础上增加代码编译优化、打包优化等处理
    mode: 'development',

    // webpack 依赖解析的主入口文件
    entry: './src/index.js',

    // webpack 打包完成后输入的目录以及文件信息配置
    output: {
      // path 必须为绝对路径，否则会报错
      path: path.resolve(__dirname, 'dist'),
      filename: '[name]-[hash:5].js'
    },

    // 解析的文件后缀处理
    resolve: {
      extensions: ['.vue', '.js'],
    },

    // 模块处理配置
    module: {
      // 配置 loader 处理
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.js$/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          // use: ['vue-style-loader', 'css-loader', 'postcss-loader']
          // 提取 css 文件
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
        },
        {
          test: /\.(jpg|jpeg|png|gif|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        }
      ]
    },
    plugins: [
      // 提取 css 文件
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),

      // vue loader 处理
      new VueLoaderPlugin(),

      // html 脚本注入
      new HtmlWebpackPlugin({
        template: './index.html'
      })
    ]
  }
```

### postcss.config.js

该配置是针对样式做处理的。有些样式属性需要添加特定的浏览器前缀，或者移动端自适应，postcss 都可以帮我们处理

```javascript
  // 为特定样式属性添加特定的浏览器前缀
  module.exports = {
    plugins: [
      require('autoprefixer')
    ]
  }
```

### .babelrc

babel 是针对 JavaScript 代码做处理的。在实际的开发中，我们会使用 ES6+ 高级特性写出高效可维护的代码，也会使用 Vue/React/TypeScript 等三方工具或者框架，浏览器本身是处理不了的，这就需要代码转译了 —— babel 应运而生。babel 提供了很多库对很多高级特性和框架做处理

```json
  {
    "presets": [
      "@babel/preset-env"
    ],
    "plugins": [
      "dynamic-import-webpack"
    ]
  }
```

### src/index.js

这是项目的主入口文件，webpack 依赖解析的开始文件

```javascript
  import Vue from 'vue'
  import App from './App.vue'

  new Vue({
    el: '#app',
    render: h => h(App)
  })
```

### index.html

项目的基础结构文件，之后的 Vue 渲染都会针对这个文件来处理

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Vue spa</title>
</head>
<body>
  <!-- 只需指定一个容器，设置 id 属性 -->
  <div id="app"></div>
</body>
</html>
```

### package.json

项目的描述文件以及依赖包管理文件

```json
{
  "name": "1spa",
  "version": "1.0.0",
  "description": "vue spa project",
  "main": "./src/index.js",
  "scripts": {
    "dev": "webpack-dev-server",
    "build": "webpack --mode production"
  },
  "keywords": [
    "vue",
    "spa",
    "vue-spa"
  ],
  "author": "littleLane",
  "license": "ISC",
  "dependencies": {
    "vue": "^2.6.10"
  },
  "devDependencies": {
    "@babel/core": "^7.6.0",
    "@babel/preset-env": "^7.6.0",
    "autoprefixer": "^9.6.1",
    "babel-loader": "^8.0.6",
    "babel-plugin-dynamic-import-webpack": "^1.1.0",
    "css-loader": "^3.2.0",
    "html-webpack-plugin": "^3.2.0",
    "mini-css-extract-plugin": "^0.8.0",
    "postcss-loader": "^3.0.0",
    "url-loader": "^2.1.0",
    "vue-loader": "^15.7.1",
    "vue-style-loader": "^4.1.2",
    "vue-template-compiler": "^2.6.10",
    "webpack": "^4.40.2",
    "webpack-cli": "^3.3.8",
    "webpack-dev-server": "^3.8.0"
  }
}
```
