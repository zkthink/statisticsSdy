const moduleA = {
  state: () => {
    return {
      age: 0,
      sex: 'man'
    }
  },

  mutations: {
    addAge(state) {
      state.age++
    }
  },
  
  actions: {
    asyncAddAge({commit}) {
      setTimeout(() => {
        commit('addAge')
      }, 1000)
    }
  },

  getters: {
    getAge(state) {
      return state.age
    }
  }
}

export default moduleA