<template>
  <div class="api-test">
    <div class="area">
      <ApiSlot>
        <template slot-scope="props">
          默认插槽传递数据：{{props.user}}
        </template>
        <p>具名插槽：</p>
        <template #name>
          <p>name插槽：<span style="color: #f40">&lt;template #name&gt;</span></p>
        </template>
        <template slot="name2">
          <p>具名插槽第二种写法：<span style="color: #f40">&lt;template slot="name2"&gt;</span></p>
        </template>
        <template v-slot:slotName>
          <p>指令写法：v-slot:slotName</p>
        </template>
        <template v-slot:slotProps="props">
          <!-- slot-scope -->
          <p>v-slot:slotProps数据传递：</p>
          <span>name:{{props.user.name|emitProps}}</span>
        </template>
      </ApiSlot>
    </div>
    <div class="area">
      <h3>watch监听数组变化</h3>
      <input v-model="msg">
      <p>msg改变，watch:msg的数组内绑定的函数依次执行。</p>
      <button @click="setArrayData">改变数组的数据</button>
      <div>
        <span v-for="item in arrayData" :key="item.name + '123'">
          {{item.name}}
        </span>
        <span v-for="item in arrayData1" :key="item + '456'">
          {{item}}
        </span>
      </div>
    </div>
    <div class="area">
      <h3>watch监听嵌套对象</h3>
      {{ oldObj }}
      <button @click="changeOldObj">修改对象数据</button>
    </div>
    <div class="area">
      {{ obj.a.v}}
      <h3 :class="{'my-class': `${isA} + ${isB}` == `${isC}`}">动态绑定class {{isA + isB }}</h3>
      <p>这用错了，得到一个字符串加法表达式啊：{{`${isA} + ${isB}`}}、{{`${isA} + ${isB}` == `${isC}`}}</p>
      <div class="test" ref="test" v-on:click="divClickHandle">
        <p>这是原内容，颜色为绿</p>
      </div>
      <h3>未经声明的属性，不能直接使用，但是声明一个对象，使用对象身上未定义的属性，没有关系。</h3>
      <input type="text" v-model="obj.name" />
      <span>{{obj.name + '1'}}</span>
      <br />
      <!-- <input type="text" v-model="name">
      <span>{{name}}</span>-->
    </div>
    <ApiChild :syncData.sync="syncData2" :obj.sync="obj" v-bind.sync="obj2"/>
    <ApiAttr
      :syncData="syncData2"
      :obj="obj"
      v-bind="obj2"
      @handleClick="handleClick"
    />
    <ApiEmitOn />
    <api-data-this />
  </div>
</template>

<script>
const {log} = console
import ApiChild from "./ApiChild.vue";
import ApiAttr from "./ApiAttr.vue";
import ApiEmitOn from "./ApiEmitOn.vue";
import ApiDataThis from './ApiDataThis';
import ApiSlot from './ApiSlot';
export default {
  name: "Api",
  components: {
    ApiChild,
    ApiAttr,
    ApiEmitOn,
    ApiDataThis,
    ApiSlot
  },
  filters: {
    emitProps: function(data){
      log(data, this, '=====')
      return data
      // this.emitPropsData = data
    }
  },
  data() {
    return {
      emitPropsData: '',
      arrayData: [{name: 1}, {name: 2}],
      arrayData1: [1,2,3],
      msg: '这是默认文案',
      isA: "A",
      isB: "B",
      isC: "AB",
      obj: {
        a: {
          v: "第一次"
        },
        b: "第二次",
        c: false
      },
      obj2: {
        name1: "obj2",
        age1: 1
      },
      syncData2: "父组件给的数据",
      oldObj: {
        name: 'one',
        arr: [1],
        o: {
          a: 1
        }
      }
    };
  },
  created() {
    // 直接监听$on
    this.$on('emitHandleClick', this.emitHandleClickFunc)
    log(this.emitHandleClickFunc)
  },
  mounted() {
    log(this.divClickHandle)
    this.$nextTick(() => {
      this.$refs.test.innerHTML += `
        <div class="new">这是新内容，去掉style的scoped属性，就为红色</div>
      `;
    });
  },
  watch: {
    // watch监听嵌套对象
    msg: [
      'msgChange', 
      function() {
        log('匿名函数')
      },
      {
        handler() {
          log('匿名函数2')
        },
        deep: true,
        immediate: true
      }
    ],
    oldObj: {
      handler(val, oldVal){
        log("oldObj修改，测试oldVal拿到的值 ",val, oldVal.name);
      },
      deep:true
    }
    // emitPropsData: function(newData){
    //   log(newData, 'watch后的newData')
    // }
  },
  methods: {
    setArrayData() {
      this.$set(this.arrayData, 1, {name: '小石头888'})
      this.$nextTick(() => {
        this.arrayData[0].name = '暗戳戳'
        this.arrayData[2] = {name: 123}
      })
      this.$set(this.arrayData1, 1, '小石头8881')
      this.$nextTick(() => {
        this.arrayData1[0] = '暗戳戳2'
        this.arrayData1[2] = {name: 123123}
      })
    },
    msgChange() {
      log('msgChange函数',this.msg)
    },
    changeOldObj() {
      // 修改obj的属性后，watch监听到的oldVal也跟着变了（拿不到旧值），这是因为watch只是监听了改变、但是没有缓存旧数据
      // this.oldObj.name = 'two'
      // 问题：那react的shouldIComponent里就能拿到旧的props，是做了深拷贝么？
      // 直接修改obj对象，watch拿到的旧值就对了。因为俩不是一个对象了。
      this.oldObj = {
        name: 'new obj'
      }
      log(this.oldObj)
    },
    divClickHandle() {
      log(123)
    },
    handleClick(txt) {
      log('handleClick', txt)
    },
    emitHandleClickFunc() {
      log('子组件emit触发父组件事件，父组件on监听', arguments)
    }
  }
};
</script>

<style scoped lang="scss">
.test {
  background: lightblue;
  p {
    color: green;
  }
  .new {
    color: pink;
  }
  // scoped穿透
  >>> .new {
    color: red;
  }
}
</style>
