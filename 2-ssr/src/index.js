import Vue from 'vue'
import App from './App'

// 避免实例共用产生交叉请求造成状态污染
export function createApp() {
  const app = new Vue({
    el: '#app',
    render: h => h(App)
  })

  return { app }
}
