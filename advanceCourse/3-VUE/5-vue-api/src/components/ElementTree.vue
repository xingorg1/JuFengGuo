<template>
  <div id="ElementTree">
    <el-tree :data="treeDataTotal" :props="defaultProps" accordion @node-click="handleNodeClick"></el-tree>
    <h3>myTree</h3>
    <div class="my-tree-content">
      <Tree :treeData="treeDataTotal" />
    </div>
  </div>
</template>

<script>
import Tree from "./Tree.vue";
const { log } = console;
export default {
  name: "ElementTree",
  components: {
    // Home
    Tree
  },
  data() {
    return {
      treeDataTotal: [],
      defaultProps: {
        children: "subList",
        label: "dimName"
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      log(data);
    }
  },
  created() {
    // let data = require('D:/guojufeng/Desktop/data.json')
    // this.treeDataTotal = data.obj[0].subList
    // log(data)
  }
};
</script>

<style lang="scss">
#ElementTree {
  .el-tree {
    overflow: visible;
    height: 500px;
  }
  .el-tree-node {
    white-space: nowrap;
    outline: 0;
    display: inline-block;
    &.is-current.is-focusable {
      .el-tree-node__content {
        background: #ff440070;
      }
    }
    &.is-expanded > .el-tree-node__children {
      display: inline-block;
      position: absolute;
      top: 32px;
      left: 0;
    }
    > .el-tree-node__children {
      overflow: visible;
    }
  }
  .el-tree-node__content {
    width: 120px;
    margin: 5px;
    display: inline-block;
    background: #edf;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 26px;
    cursor: pointer;
  }
}
</style>
