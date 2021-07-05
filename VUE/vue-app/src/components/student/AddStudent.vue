<template>
  <div class="cont">
    <h3>{{ $store.state.student.title }}</h3>
    <!-- <h3>{{ $store.getters['student/person'] }}</h3>
    ，，，{{title}}，，， -->
    <label for="username">
      姓名：
      <input type="text" v-model.lazy.trim="name" id="username">
    </label>
    <label for="age">
      年龄：
      <input type="number" v-model.number.lazy="age" id="age">
    </label>
    <button class="submit" @click="addStudent">添加</button>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'
export default {
  name: 'AddStudent',
  data() {
    return {
      // username: this.$store.state.userName,
      name: '',
      age: ''
    };
  },
  computed:{
    ...mapGetters({
      'myPerson': 'student/person'//这里是一个字符串不是一个函数
    }),
   /*  person(){
      return this.$store.getters.person
    } */
    // ...mapGetters(['person'])
     ...mapState('student',['title']),
    /*...mapState({
      'username': (state)=>{
        // username是我在组件中要用的名字
        // 第二个参数是一个函数，函数接收一个参数state，就是store当中的state
        return state.userName
      }
    }), */
    /* username(){
      return this.$store.state.userName
    } */
  },
  methods: {
    // ...mapActions(['dispatchMutations01']),
    ...mapActions({
      myAction02: 'student/dispatchMutations02'
    }),
    addStudent() {
      let obj = {
        name: this.name,
        age: this.age,
        id: +new Date()
      };
      this.myAction02({obj, userName: 'actions-mapActions'});

      /* this.dispatchMutations01({
        name: this.name,
        age: this.age,
        id: +new Date()
      }); */

      //{obj:obj, userName: 'actions'}
      // this.$store.dispatch('dispatchMutations02',{obj, userName: 'actions'});
      
      // this.$store.dispatch('dispatchMutations01',{
      //   name: this.name,
      //   age: this.age,
      //   id: +new Date()
      // });
      
      /* this.changeStateFun01(obj);
      this.reNameChangeMutation({
        studentListData: obj,
        userName: 'commit触发'
      }); */

      // this.$store.commit('changeStateFun01',obj);
     
     /*  this.$store.commit('changeStateFun02',{
        studentListData: obj,
        userName: 'commit触发'
      }); */
      /* this.$store.state.studentList.push({
        name: this.name,
        age: this.age,
        id: +new Date()
      }); */
      // console.log(this.$store.state.studentList)
      // console.log(this.$store.getters.person)
    },
    /* ...mapMutations(['changeStateFun01']),
    ...mapMutations({
      reNameChangeMutation :'changeStateFun02'
    }), */
  }
};
</script>
