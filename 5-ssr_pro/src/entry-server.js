import { createApp } from './index'

// 针对每个服务端请求返回一个新的根组件
export default context => {
  return new Promise((resolve, reject) => {
    const { app, App, store, router } = createApp()

    router.push(context.url)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      Promise.all(matchedComponents.map(comp => {
        if (comp.asyncData) {
          return comp.asyncData({ store })
        }
      })).then(() => {
        context.state = store.state
        resolve(app)
      }, reject)
    })
  })
}
