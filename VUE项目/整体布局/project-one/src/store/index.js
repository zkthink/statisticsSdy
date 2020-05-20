import Vue from 'vue'
import Vuex from 'vuex'
import moduleA from './moduleA'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    // getter中接受其他getter作为第二参数
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    },
    // 让 getter 返回一个函数，来实现给 getter 传参
    getTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.id === id)
    }
  },

  mutations: {
    increment (state) {
      state.count++
    },
    increment2 (state, n) {
      state.count += n
    }
  },

  actions: {
    increment (context) {
      context.commit('increment')
    },
    // 参数结构
    // increment ({ commit }) {
    //   commit('increment')
    // }
    incrementAsync ({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    },

    incrementAsync2 ({ commit }, obj) {
      setTimeout(() => {
        commit('increment2', obj.amount)
      }, 1000)
    }
  },

  modules: {
    moduleA
  },

  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : []
})

export default store