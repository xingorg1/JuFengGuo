/*
 * @Author: @Guojufeng 
 * @Date: 2019-06-19 18:55:21 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-06-19 19:51:06
 */

import Vue from 'vue'
import Vuex from 'vuex'
//  import Student from './student/index.js'//对应export default Student的输出方法
import {
  Student
} from './student/index.js' //对应 export { Student }的输出方法

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production", //非生产环境使用严格模式
  //  公用state数据和方法
  state: {
    name: '公共state'
  },
  getters: {

  },
  mutations: {

  },
  actions: {

  },
  //  各模块数据和方法
  modules: {
    student: Student
  }
})

