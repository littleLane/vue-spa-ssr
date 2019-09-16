import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function fetchBarData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('bar 组件返回 ajax 数据');
    }, 2000)
  })
}

export default function createStore() {
  const store = new Vuex.Store({
    state: {
      bar: ''
    },
    mutations: {
      'SET_BAR'(state, data) {
        state.bar = data
      }
    },
    actions: {
      fetchBar({ commit }) {
        return fetchBarData().then(data => {
          commit('SET_BAR', data)
        }).catch(err => {
          console.error(err)
        })
      }
    }
  })

  // 服务器已经获取异步数据，要对 store 中的 state 做替换处理了
  if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
    console.log('window.__INITIAL_STATE__', window.__INITIAL_STATE__)
    store.replaceState(window.__INITIAL_STATE__)
  } else {
    console.log('no browser');
  }

  return store
}
