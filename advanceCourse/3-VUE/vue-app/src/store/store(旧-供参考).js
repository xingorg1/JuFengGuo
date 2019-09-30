import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
console.log(Vuex)
export default new Vuex.Store({//Vuex里的Store方法
  strict: true,
  modules:{
    // key(模块的名字): value(模块的配置对象)
    studentMod: {
      state: {},
      getters:{},
      modules:{},
      actions:{}
    }
  },
  state: {
    title: '添加学生信息：',
    userName: '小石头',
    age: '12',
    studentList:[],
    newStudentList:[],
  },
  getters:{// computed
    person(state){//参数state === $store.state
      return `姓名：${state.userName}; 年龄：${state.age};`;
    },
    newStudentList(state){
      return state.studentList.map((el)=>{
        return `姓名：${el.name}； 年龄：${el.age}；`
      });
    }
  },
  mutations: {
    // 用于更改state的状态
    changeStateFun01(state,payload){
      // setTimeout(()=>{
        state.studentList.push(payload);
      // },1000)
    },
    changeStateFun02(state,{studentListData,userName}){//解构赋值
      state.studentList.push(studentListData);
      state.userName = userName;
    }
  },
  actions: {
    dispatchMutations01(context,payload){//接受一个上下文对象context
      console.log(context);
      setTimeout(()=>{
        context.commit('changeStateFun01',payload);
      },1000)
    },
    dispatchMutations02({ commit,state },{ obj, userName }){//接受一个上下文对象context
      setTimeout(()=>{
        commit('changeStateFun02',{
          studentListData: obj,
          userName
        });
      },1000)
    },
  }
})
