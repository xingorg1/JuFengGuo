<template lang="pug">
  .blank
    el-select(v-model='value', placeholder='请选择')
      el-option(v-for='item in options', :key='item.value', :label='item.label', :value='item.value')
      p.tips 怎么把el-select里边填入自定义的标签？尝试失败
    h3(:class="['cc', list.length >0 ?'a':'b']") class绑定
    h4(class='add-required-tips' :class="list.length > 0 ? 'hide' : ''") 带默认class的
    input(v-model="a")
    input(v-model="b")
    div {{showValue1to8Tip}} 
    el-tree(:props='props', :load='loadNode', lazy='', show-checkbox='', @check-change='handleCheckChange' @check='beCheck' @current-change="curChange" @getCurrentNode="getCurrentNode" @node-click="nodeclick")

</template>

<script>
export default {
  name: "Blank",
  data() {
    return {
      props: {
        label: "name",
        children: "zones"
      },
      count: 1,
      list: [1],
      a: 1,
      b: -1,
      // showValue1to8Tip: false,
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: ""
    };
  },
  computed: {
    showValue1to8Tip() {
      // return  !(this.a > 0 || this.b > 0 )
      return this.a > 0 || this.b > 0;
    }
  },
  // watch: {
  // 		showValue1to8Tip: {
  // 			handler(val){
  // 				return !(this.a > 0 || this.b > 0 )
  // 			}
  // 		}
  // 	},
  methods: {
    nodeclick(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    getCurrentNode(data, checked, indeterminate) {
      // console.log(data, checked, indeterminate);
    },
    curChange(data, checked, indeterminate) {
      // console.log(data, checked, indeterminate);
    },
    beCheck(data, checkedObj) {
					// console.log(checkedObj.checkedNodes.length)
					console.log('check',{data,checkedObj})
					// if(checkedObj[1]){
					// }
    },
    handleCheckChange(data, checked, indeterminate) {
      // console.log(data, checked, indeterminate);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: "region1" }, { name: "region2" }]);
      }
      if (node.level > 3) return resolve([]);

      var hasChild;
      if (node.data.name === "region1") {
        hasChild = true;
      } else if (node.data.name === "region2") {
        hasChild = false;
      } else {
        hasChild = Math.random() > 0.5;
      }

      setTimeout(() => {
        var data;
        if (hasChild) {
          data = [
            {
              name: "zone" + this.count++
            },
            {
              name: "zone" + this.count++
            }
          ];
        } else {
          data = [];
        }

        resolve(data);
      }, 500);
    }
  }
};
</script>

<style lang="scss">
</style>
