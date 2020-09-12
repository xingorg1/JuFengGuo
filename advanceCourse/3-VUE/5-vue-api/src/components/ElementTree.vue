<template>
  <div class="tree-box">
    <div class="area">
      <h3>父级单选、子级多选，叔级互斥</h3>
      <el-tree :data="singleSelectData"
               :props="{label: 'title'}"
               show-checkbox
               node-key="id"
               ref="tree"
               :default-expand-all="true"
               @check="checkedHandle"
               @node-click="handleNodeClick">
      </el-tree>
    </div>
    <div class="area"
         id="ElementTree">
      <h3>横向树</h3>
      <el-tree :data="treeDataTotal"
               :props="defaultProps"
               accordion
               @node-click="handleNodeClick"></el-tree>
    </div>
    <div class="area">
      <h3>myTree</h3>
      <div class="my-tree-content">
        <Tree :treeData="treeDataTotal" />
      </div>
    </div>

  </div>
</template>

<script>
import Tree from "./Tree.vue";
import mockData from '../assets/mock.js'
const { log } = console;
export default {
  name: "ElementTree",
  components: {
    // Home
    Tree
  },
  data () {
    return {
      treeDataTotal: [],
      defaultProps: {
        children: "subList",
        label: "dimName"
      },
      props: {
        label: 'name',
        children: 'zones'
      },
      selectedKeys: [],
      singleSelectData: mockData.singleSelectData,
      count: 1
    };
  },
  methods: {
    handleNodeClick (data) {
      log('handleNodeClick', data);
    },
    checkedHandle (currentNode, selectObj) {
      // 前提是树的数据每一级都要提前加上disabled属性，不然贸然设置后不起作用（可能是vue的data没有深度双向绑定）
      let isFatherSelect = selectObj.checkedNodes.find((el) => {
        // '父级id在selectObj的checkedKeys裏'
        return el.children
      })
      log('checkedHandle', selectObj, isFatherSelect)
      if (selectObj.halfCheckedKeys.length > 0) {
        // 选了一个子节点，内容为半选中的父节点id
        this.singleSelectData.map((el) => {
          if (el.id !== selectObj.halfCheckedKeys[0]) {
            el.disabled = true
            el.children.map((son) => {
              son.disabled = true
            })
          }
        })
        this.selectedKeys = selectObj.checkedKeys
        log('当前选中：', this.selectedKeys)
      } else if (isFatherSelect) {
        // 匹配一个父节点被全选
        this.singleSelectData.map((el) => {
          if (el.id !== isFatherSelect.id) {
            el.disabled = true
            el.children.map((son) => {
              son.disabled = true
            })
          }
        })
        this.selectedKeys = isFatherSelect.children.reduce((pre, cur) => {
          pre.push(cur.id)
          return pre
        }, [])
        log('当前选中：', this.selectedKeys)
      } else {
        // 全不选
        this.singleSelectData.map((el) => {
          el.disabled = false
          el.children.map((son) => {
            son.disabled = false
          })
        })
        this.selectedKeys = []
      }
    },
  },
  created () {
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
