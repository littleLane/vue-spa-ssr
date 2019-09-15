import { createApp } from './index'

// 针对每个服务端请求返回一个新的根组件
export default context => {
  return new Promise((resolve, reject) => {
    const { app, App, store } = createApp()

    const components = App.components
    const asyncDataPromiseFns = []

    Object.values(components).forEach(component => {
      if (component.asyncData) {
        asyncDataPromiseFns.push(component.asyncData({ store }))
      }
    })

    Promise.all(asyncDataPromiseFns).then(() => {
      // 当使用 createBundleRenderer 时，如果设置了 template 选项，那么就把 context.state 的值作为 window.__INITIAL_STATE__ 自动插入到模板 html 中
      context.state = store.state
      console.log('222', store.state)
      resolve(app)
    }, reject)
  })
}
