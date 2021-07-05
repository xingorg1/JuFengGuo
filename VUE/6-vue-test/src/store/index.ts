import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    num: 0,
    flag: false
  },
  mutations: {
    changeNum (state) {
      state.num++
      // console.log(JSON.stringify(state))
    },
    changeNumBeforeMut (state) {
      state.flag = !state.flag
      // console.log(JSON.stringify(state))
    }
  },
  actions: {
    changeNumAsync (ctx) {
      // console.log(ctx)
      ctx.dispatch('changeNumBefore') // 在actions中触发actions
      ctx.commit('changeNum')
    },
    changeNumBefore (ctx) {
      ctx.commit('changeNumBeforeMut')
    }
  },
  modules: {
  }
})
