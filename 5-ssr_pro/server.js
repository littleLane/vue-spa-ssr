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

// 生成一个渲染器，用于后续向服务端发送 html 字符串或者字符流
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest
})

backendRouter.get('*', (ctx, next) => {
  const ssrStream = renderer.renderToStream({
    url: ctx.url
  })

  ctx.status = 200
  ctx.type = 'html'
  ctx.body = ssrStream
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
