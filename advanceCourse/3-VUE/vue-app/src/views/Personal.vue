<template>
  <div class="personal">
    <h3>个人中心</h3>
    <div class="form">
      <label for="name">
        个人姓名：
        <input type="text" id="name" placeholder="请填写姓名" autocomplete="off" v-model.lazy.trim="name">
      </label>
      <label for="age">
        个人年龄：
        <input type="number" id="age" placeholder="请填写年龄" autocomplete="off" v-model.number.trim="age">
      </label>
      <div class="btns">
        <button class="submit" @click="submitFun">确定</button>
        <button class="cancel" @click="cancelFun">取消</button>
      </div>
      <div class="rst">提交结果：{{result}}</div>
    </div>
  </div>
</template>
<script>
export default {
  beforeRouteLeave(to,from,next){
    if(this.name || this.age){//输入框有值的时候不能随意切换，要先询问不是错按
      let rst = window.confirm('表格还没提交，确定要离开吗？');
      if(rst){
        // 用户主动放弃
        next();
      }
    }else{
      // 可以进行路由切换
      next();
    }
  },
  data(){
    return {
      name: '',
      age:'',
      submit: false,
      result: ''
    }
  },
  methods: {
    submitFun(){
      if(!this.name || !this.age){
        alert('表格还没填完，不能提交。')
      }else{
        // 仿ajax表单提交功能
        this.submit = true;//提交
        this.result = '表单提交成功！';
        this.cancelFun();
      }
    },
    cancelFun(){
        this.name = this.age = '';//清空
    }
  }
}
</script>

<style>
.form,.rst {
  margin-top: 10px;
}

</style>
