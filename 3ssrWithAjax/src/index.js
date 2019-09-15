import Vue from 'vue'
import createStore from './store'
import App from './App'

// 避免实例共用产生交叉请求造成状态污染
export function createApp() {
  const store = createStore()
  const app = new Vue({
    store,
    render: h => h(App)
  })

  return { app, App, store }
}
