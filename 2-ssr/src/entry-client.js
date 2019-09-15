import { createApp } from './index'

const { app } = createApp()

// 客户端激活，做 mount 操作（html 接管），将已经渲染好的服务端发过来的 html 字符串激活
app.$mount('#app')
