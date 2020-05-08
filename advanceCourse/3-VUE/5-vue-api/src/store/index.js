import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    imgUrl: "./static/img/test.jpg"
  }
})
// http://localhost:3000/static/img/test.jpg
// http://127.0.0.1:5500/advanceCourse/3-VUE/5-vue-api/dist/static/img/test.jpg