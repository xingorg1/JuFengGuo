<template>
  <div class="api-element">
    <div class="area">
      <h3>el-table表头置顶 - 只针对非fixed的表格内容,且需要没有超出滚动效果</h3>
      <el-table
        :data="tableDataFixed"
        style="width: 600px"
        ref="noFixedTable"
        v-scrollNoFixed
      >
        <el-table-column prop="date" label="日期" sortable></el-table-column>
        <el-table-column prop="name" label="姓名" sortable></el-table-column>
        <el-table-column prop="address" label="地址" sortable></el-table-column>
      </el-table>
      <p>总结，初步实现表头置顶效果，但是范围值定死的做法肯定不可取</p>
    </div>
    <div class="area">
      <h3>el-table表头置顶 - fixed的表格置顶</h3>
      <el-table
        :data="tableDataFixed"
        style="width: 600px"
        ref="fixedTable"
        v-scrollfixed
        width="400"
      >
        <el-table-column prop="date" label="日期" width="280" fixed sortable></el-table-column>
        <el-table-column prop="name" label="姓名" width="220" sortable></el-table-column>
        <el-table-column prop="address" label="地址" width="300" sortable></el-table-column>
      </el-table>
      <p>第一列固定后，置顶的表头与表格列之间错位，emmm</p>
    </div>
    <div class="area">
      <h3>el-tooltip的三角样式修改</h3>
      <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
        <el-button>上左</el-button>
      </el-tooltip>
    </div>
    <div class="area">
      <h3>树形懒加载的加锁处理 - 有一个tr内容在下钻期间，同表格内其他tr不允许下钻</h3>
      <el-button @click="tableClick()">点击</el-button>
      <el-table
        :data="tableDataNormal"
        style="width: 100%"
        row-key="id"
        border
        lazy
        :load="load"
        ref="multipleTable"
        @expand-change="expandChange"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
const { log } = console;
export default {
  name: "Element",
  data() {
    return {
      flag: true,
      tableDataNormal: [],
      tableDataFixed: []
    };
  },
  created() {
    this.tableDataNormal = this.$mock["tableDataNormal"];
    this.tableDataFixed = this.$mock["tableDataFixed"];
  },
  mounted() {
    // setInterval(()=>{
    //   this.$nextTick(() => {
    //     console.log(document.body.getElementsByClassName(".el-tooltip__popper"))
    // });
    // },3000)
  },
  directives: {
    scrollNoFixed: {
      bind(el, binding, vnode) {
        // this.$refs.noFixedTable == vnode.context
        window.onscroll = function() {
          let oH = document.documentElement.scrollTop;
          // log(oH)
          if (oH <= 150) {
            let header = el.getElementsByClassName(
              "el-table__header-wrapper"
            )[0];
            header.style.position = "static";
            header.style.top = 0;
            header.style.zIndex = 1;
            header.style.display = "block";
          }
          if (oH > 150) {
            let header = el.getElementsByClassName(
              "el-table__header-wrapper"
            )[0];
            header.style.position = "fixed";
            header.style.top = 0;
            header.style.zIndex = 1;
            header.style.display = "block";
          }
          if (oH > 330) {
            let header = el.getElementsByClassName(
              "el-table__header-wrapper"
            )[0];
            header.style.display = "none";
          }
        };
      }
    },
    scrollfixed: {
      bind(){
        log('fixed的表格，头疼，咋搞啊！')
      }
    }
  },
  watch: {},
  methods: {
    toggleRowExpansion(row, expanded) {
      log(row, expanded);
    },
    tableClick() {
      var table = this.$refs.multipleTable;
      log(table);
      table.toggleRowExpansion(row, true);
    },
    expandChange(row, expanded) {
      log(row, expanded);
      expanded = false;
    },
    load(tree, treeNode, resolve) {
      if (this.flag) {
        log(tree, treeNode, resolve);
        this.flag = false;
        setTimeout(() => {
          resolve([
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            }
          ]);
          this.flag = true;
        }, 5000);
      } else {
        treeNode.loading = false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.box {
  width: 400px;

  .top {
    text-align: center;
  }

  .left {
    float: left;
    width: 60px;
  }

  .right {
    float: right;
    width: 60px;
  }

  .bottom {
    clear: both;
    text-align: center;
  }

  .item {
    margin: 4px;
  }

  .left .el-tooltip__popper,
  .right .el-tooltip__popper {
    padding: 8px 10px;
  }
}
</style>
