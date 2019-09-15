const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const KoaRoute = require('koa-router')
const koaStatic = require('koa-static')
const { createBundleRenderer } = require('vue-server-renderer')

const frontendApp = new Koa()
const frontendRouter = new KoaRoute()
const backendApp = new Koa()
const backendRouter = new KoaRoute()

const serverBundle = require(path.resolve(__dirname, './dist/vue-ssr-server-bundle.json'))
const clientManifest = require(path.resolve(__dirname, './dist/vue-ssr-client-manifest.json'))
const template = fs.readFileSync(path.resolve(__dirname, './dist/index.ssr.html'), 'utf-8')

// 读取服务端打包出来的 server.js
// const bundle = fs.readFileSync(path.resolve(__dirname, './dist/server.js'), 'utf-8')

// 生成一个渲染器，用于后续向服务端发送 html 字符串或者字符流
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest
})

backendRouter.get('/index', async (ctx, next) => {
  try {
    const html = await new Promise((resolve, reject) => {
      renderer.renderToString((err, html) => {
        if (err) {
          reject(err)
        } else {
          resolve(html)
        }
      })
    })
console.log(html)
    // const html = await renderer.renderToString()

    ctx.type = 'html'
    ctx.status = 200
    ctx.body = html
  } catch (error) {
    ctx.status = 500
    ctx.body = '服务器异常'
  }
})

backendApp.use(koaStatic(path.resolve(__dirname, './dist')))
backendApp.use(backendRouter.routes()).use(backendRouter.allowedMethods())
backendApp.listen(3000, () => {
  console.log('服务器端渲染地址： http://localhost:3000')
})

// 前端 server
frontendRouter.get('/index', (ctx, next) => {
  const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
  ctx.status = 200
  ctx.body = html
  ctx.type = 'html'
})

frontendApp.use(koaStatic(path.resolve(__dirname, './dist')))
frontendApp.use(frontendRouter.routes()).use(frontendRouter.allowedMethods())
frontendApp.listen(3001, () => {
  console.log('客户器端渲染地址： http://localhost:3001')
})
