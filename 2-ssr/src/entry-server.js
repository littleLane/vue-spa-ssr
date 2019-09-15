import { createApp } from './index'

// 针对每个服务端请求返回一个新的根组件
export default context => {
  const { app } = createApp()

  return app
}
