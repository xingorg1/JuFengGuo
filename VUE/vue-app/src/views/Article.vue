<template>
  <div class="article">
    <div class="article-cont" :data-id="result.id">
      <h2>{{ result.title }}</h2>
      <article>
        <span v-for="item in 5" :key="item">
          {{result.article}}
        </span>
      </article>
      <button @click="prevArticle" v-show="showPrevBtn">上一个问题</button>
      <button @click="nextArticle" v-show="showNextBtn">下一个问题</button>
    </div>
  </div>
</template>
<script>
export default {
  beforeRouteEnter(to, from, next) {
    console.log('article.vue - beforeRouteEnter')
    // console.log(to.params.id);
    next(vm => {
      // 模拟ajax请求
      vm.imitateAjax(to.params.id, (data)=>{
        vm.ajaxCallBack(data);
      });
    });
  },
  beforeRouteUpdate(to, from, next){
     // 钩子函数监听$route的改变
    console.log('article.vue - beforeRouteUpdate')
    // 无论组件是否更新，只要当路由修改了就会触发这个函数
    this.imitateAjax(to.params.id, (data)=>{
      // 因为this.$route还没变，所以得用to
      this.ajaxCallBack(data)
    });
    next()
  },
  beforeRouteLeave(to, from, next){
     console.log('article.vue - beforeRouteLeave')
      next()
  },
  data() {
    return {
      showPrevBtn: false,
      showNextBtn: true,
      result: {
        id: 0,
        title: "",
        article: ""
      },
      articleList: [
        {
          id: 201901,
          title: "问题一：阿黑客帝国和我我阿大为规范娃儿发啊？",
          article:
            "哈卡佛埃尔文你爱空间放大诶你看傲世丹佛为你打发噢诶你哈卡佛埃尔文你爱空间放大诶你看傲世丹佛为你打发噢诶你哈卡佛埃尔文你爱空间放大诶你看傲世丹佛为你打发噢诶你"
        },
        {
          id: 201902,
          title: "问题二：卡的罚款概念股吗？",
          article:
            "HTML 原生的输入元素类型并不总能满足需求。幸好，Vue 的组件系统允许你创建具有完全自定义行为且可复用的输入组件。这些输入组件甚至可以和 v-model 一起使用！要了解更多，请参阅组件指南中的自定义输入组件。"
        },
        {
          id: 201903,
          title: "问题三：接口爱的脑儿我发你媕娿呢？",
          article:
            "这里的 true-value 和 false-value 特性并不会影响输入控件的 value 特性，因为浏览器在提交表单时并不会包含未被选中的复选框。如果要确保表单中这两个值中的一个能够被提交，(比如“yes”或“no”)，请换用单选按钮。"
        }
      ]
    };
  },
  beforeCreat(){
    console.log('beforeCreat')
  },
  created(){
    console.log('created')
  },
  beforeMount(){
    console.log('beforeMount')
  },
  mounted(){
    console.log('mounted')
  },
  beforeUpdate(){
    console.log('beforeUpdate')
  },
  updated(){
    console.log('updated')
  },
  beforeDestroy(){
    console.log('beforeDestroy')
  },
  destroyed(){
    console.log('destroyed')
  },
   watch: {
    $route: function(){
      // watch监听$route的改变
      console.log(this.$route,this.$route.params.id >= '201903')
      // this.imitateAjax(this.$route.params.id, (data)=>{
      //   this.ajaxCallBack(data)
      // });
    } 
  },
  methods: {
    prevArticle(){
      console.log('上一个问题',this.$route.params.id)
      let id = this.$route.params.id;
      this.$router.push({
        name: 'article',
        params: {
          id: --id
        }
      });
    },
    nextArticle(){
      // console.log('下一个问题')
      let id = this.$route.params.id;
      this.$router.push({
        name: 'article',
        params: {
          id: ++id
        }
      });
    },
    imitateAjax(id, callback) {
      // 模拟响应ajax，找到对应编号的数据触发回调，把数据返回回去。
      let rst = this.articleList.filter(el => el["id"] == id);
      callback(rst);
    },
    ajaxCallBack(data){
      if (data) {
        this.result = data[0];
        if(this.result.id >= '201903'){//目的是判断最后一条信息，根据项目来、没有实际意义
          this.showNextBtn = false;
        }else{
          this.showNextBtn = true;
        }
        if(this.result.id <= '201901'){//目的是判断第一条信息，根据项目来、没有实际意义
          this.showPrevBtn = false;
        }else{
          this.showPrevBtn = true;
        }
      } else {
        alert("数据请求失败！");
      }
    }
  }
};
</script>
<style>
.article {
  padding: 30px 45px;
}
.article h2 {
  font-size: 19px;
  font-weight: 900;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #f1f1f1;
}
.article article {
  line-height: 30px;
}
button{
  margin: 0 5px;
}
</style>


