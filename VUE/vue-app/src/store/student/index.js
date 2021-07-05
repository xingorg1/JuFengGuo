/*
 * @Author: @Guojufeng 
 * @Date: 2019-06-19 18:57:32 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-06-19 20:34:22
 * Student.vue专用state数据
 */
let Student = {
  namespaced: true,
  state : {
    title: '添加学生信息：',
    userName: '小石头',
    age: '12',
    studentList:[],
    newStudentList:[],
  },
  getters : {
    person(state){//参数state === $store.state
      return `姓名：${state.userName}; 年龄：${state.age};`;
    },
    newStudentList(state){
      return state.studentList.map((el)=>{
        return `姓名：${el.name}； 年龄：${el.age}；`
      });
    }
  },
  mutations : {
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
  actions : {
    dispatchMutations01(context,payload){//接受一个上下文对象context
      console.log(context);
      setTimeout(()=>{
        context.commit('changeStateFun01',payload);
      },500);
    },
    dispatchMutations02({ commit,state },{ obj, userName }){//接受一个上下文对象context
      setTimeout(()=>{
        commit('changeStateFun02',{
          studentListData: obj,
          userName
        });
      },500);
    },
  }
}

export { Student }
// export default Student

