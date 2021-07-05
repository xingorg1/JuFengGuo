<template>
  <div class="app">
    <!-- 练习题 -->
    <!-- <ul>
      <li v-for="(item,index) in treeList.slice(0,2)" :key="index" v-if="index <= 0">
        {{index}}、{{item}}
      </li>
    </ul> -->
    <!-- <span v-for="item,index in p" :key="index">{{item}}<br/></span> -->
    <!-- <span v-text="p"></span> -->
    <!-- <input type="text" @input="(e)=>{this.msg = e.target.value}" :value="msg">
    <div>{{ msg }}</div> -->
    <!-- <input type="text" v-model="vmodelMsg">
    <div>{{vmodelMsg}}</div> -->
    <!-- 使用日历组件 -->
    <Calendar/>
    <div class="tree-box">
      <Tree :tree-data="treeList"/>
    </div>
  </div>
</template>
<script>
import Calendar from "./Calendar";
import Tree from "./Tree";
export default {
  components: {
    Calendar,
    Tree
  },
  data() {
    return {
      p: '<p>adfa</p>',
      msg: "vue/cli",
      vmodelMsg: 'aaa',
      arr: [1],
      obj: {
        happiness: true
      },
      treeList: [
        {
          name: '一級列表1',
          children:[
            {
            name: '二级列表1',
            children:[{
              name: '三级列表1',
              children:[{
                name: '四级列表1',
              }]
            }] 
          },{
            name: '二级列表1',
            children:[{
              name: '三级列表1',
              children:[{
                name: '四级列表1',
              }]
            }] 
          }]
        },
        {
          name: '一级列表2',
          children:[{
            name: '二级列表2',
          }]
        },
        {
          name: '一级列表3',
          children:[{
            name: '二级列表3',
          },{
            name: '二级列表3',
          }]
        }
      ]
    };
  },
  mounted(){
    // this.$set(this.arr,0,2);
    this.arr.splice(0,1,3);
    this.$set(this.obj,'happiness','of course');
    console.log(this.$store)
    // console.log(this.arr)
    // console.log(this.obj)
  },
  methods:{
    writeIn(e){
      this.msg = e.target.value
    }
  }
};
</script>
<style scoped>
.tree-box {
  padding: 20px;
}
</style>

