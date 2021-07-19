<template>
  <div class="api-element">
    <ElementInputNumber />
    <div class="area">
      <h3>el-table表头置顶 - 只针对非fixed的表格内容,且需要没有超出滚动效果</h3>
      <el-table :data="tableDataFixed"
                ref="noFixedTable"
                style="width: 600px"
                v-scrollNoFixed>
        <el-table-column label="日期"
                         prop="date"
                         sortable></el-table-column>
        <el-table-column label="姓名"
                         prop="name"
                         sortable></el-table-column>
        <el-table-column label="地址"
                         prop="address"
                         sortable></el-table-column>
      </el-table>
      <p>总结，初步实现表头置顶效果，但是范围值定死的做法肯定不可取</p>
    </div>
    <div class="area">
      <h3>el-table表头置顶 - fixed的表格置顶</h3>
      <el-table :data="tableDataFixed"
                ref="fixedTable"
                style="width: 600px"
                v-scrollfixed
                width="400">
        <el-table-column fixed
                         label="日期"
                         prop="date"
                         sortable
                         width="280"></el-table-column>
        <el-table-column label="姓名"
                         prop="name"
                         sortable
                         width="220"></el-table-column>
        <el-table-column label="地址"
                         prop="address"
                         sortable
                         width="300"></el-table-column>
      </el-table>
      <p>第一列固定后，置顶的表头与表格列之间错位，emmm</p>
    </div>
    <div class="area">
      <h3>el-tooltip的三角样式修改</h3>
      <el-tooltip class="item"
                  content="Top Left 提示文字"
                  effect="dark"
                  placement="top-start">
        <el-button size="mini">上左</el-button>
      </el-tooltip>
    </div>
    <div class="area">
      <h3>层级树 - column-key +filter-change过滤</h3>
      <el-table :data="tableDataTree"
                :tree-props="{children: 'children', hasChildren: 'haha'}"
                @selection-change="handleSelectionChangeTree"
                border
                default-expand-all
                fit
                ref="multipleTableTree"
                row-key="id"
                style="width: 100%"
                tooltip-effect="dark">
        <el-table-column type="selection"
                         width="55"></el-table-column>
        <el-table-column label="日期">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column column-key="name"
                         label="姓名"
                         prop="name"></el-table-column>
        <el-table-column label="地址"
                         prop="address"
                         show-overflow-tooltip></el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button size="mini"
                   @click="toggleSelectionTree([tableDataTree[1], tableDataTree[2]])">切换第二、第三行的选中状态</el-button>
        <el-button size="mini"
                   @click="toggleSelectionTree()">取消选择</el-button>
      </div>
    </div>
    <div class="area">
      <h3>树形懒加载的加锁处理 - 有一个tr内容在下钻期间，同表格内其他tr不允许下钻</h3>
      <el-button size="mini"
                 @click="tableClick()">点击</el-button>
      <el-input clearable
                placeholder="输入关键字搜索"
                size="mini"
                style="display: block; margin: 10px 0;width: 220px"
                v-model="searchName" />
      <el-button size="mini"
                 @click="filterNameFn">查询</el-button>
      <!-- 
        // 多选表格的相关方法和属性
        clearSelection
        toggleRowSelection
        toggleAllSelection

        reserve-selection - 记忆多选
        filter-multiple
        filter-method
        或者不用查询按钮，直接把这个过滤公式放到el-table上，利用filter直接返回新数组的特色了。原数组也不会改变
        // 方法1，用按钮切换过滤，data上绑定过滤后的数据
        :data="tableDataNormal"
        // 方法2，直接绑定在el-table上，问题是没能过滤树结构的子级，加的话代码太长，为了可读性改成了计算属性
        :data="tableDataNormal.filter(data => !searchName || data.name.toLowerCase().includes(searchName.toLowerCase()))"
      -->
      <!-- 
        只过滤了data的name，第一层的。需要再深入过滤data.children.name的值才行。另外这里:data太长了，可以写到计算属性中
        // 第一种过滤计算属性，过滤完了以后带着父元素
        :data="filtertableDataNormal1" 
        // 第二种过滤计算属性，过滤的是最彻底的，留下的是最干净的。
        :data="filtertableDataNormal2"
        // 第三种过滤不仅要彻底、干净，不仅要深入层级，还要保留父级，不然有子级的父级过滤不出来
      -->
      <el-table :data="filtertableDataNormal4"
                :load="load"
                :tree-props="{children: 'children', hasChildren: 'haha'}"
                @expand-change="expandChange"
                @select="select111"
                @selection-change="handleSelectionChange"
                border
                default-expand-all
                lazy
                ref="multipleTable"
                row-key="id"
                style="width: 100%">
        <el-table-column fixed
                         type="index"
                         width="25"></el-table-column>
        <el-table-column :reserve-selection="bool"
                         type="selection"
                         width="55"></el-table-column>
        <el-table-column label="日期"
                         prop="date"
                         width="180"></el-table-column>
        <el-table-column label="姓名"
                         prop="name"
                         width="180"></el-table-column>
        <el-table-column label="地址"
                         prop="address"></el-table-column>
      </el-table>
    </div>
    <div class="area">
      <!-- 表格筛选 -->
      <el-input placeholder="输入关键字搜索"
                size="mini"
                style="display: block; margin: 10px 0;width: 220px"
                v-model="search2" />
      <el-table :data="tableDataFilter.filter(data => !search2 || data.name.toLowerCase().includes(search3.toLowerCase()))"
                style="width: 100%">
        <el-table-column label="Date"
                         prop="date"></el-table-column>
        <el-table-column label="Name"
                         prop="name"></el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleEdit(scope.$index, scope.row)"
                       >Edit</el-button >
            <el-button 
                       @click="handleDelete(scope.$index, scope.row)"
                       size="mini"
                       type="danger">Delete</el-button >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="area">
      <h3>两边固定，tr错位</h3>
      <el-table :data="fixedTableData"
                border
                max-height="250"
                size="mini"
                style="width: 700px"
                tooltip-effect="light">
        <el-table-column fixed
                         label="日期"
                         prop="date"
                         width="150"></el-table-column>
        <el-table-column label="姓名"
                         prop="name"
                         width="120"></el-table-column>
        <el-table-column label="省份"
                         prop="province"
                         width="120"></el-table-column>
        <el-table-column label="市区"
                         prop="city"
                         width="120"></el-table-column>
        <el-table-column label="地址"
                         prop="address"
                         width="300"></el-table-column>
        <el-table-column label="邮编"
                         prop="zip"
                         width="120"></el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="120">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click.native.prevent="deleteRow(scope.$index, tableData)"
                       type="text">移除</el-button >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
// import Mock from 'mockjs'
// log(Mock)
import axios from 'axios' // 引入axios
import urls from '@/mock/urls'  // 引入实现准备好的接口请求相关配置
import ElementInputNumber from './ElementInputNumber.vue'
// const { log } = console
const log = function() {
  
}
export default {
  name: 'Element',
  components: {
    ElementInputNumber
  },
  data () {
    return {
      flag: true,
      tableDataNormal: [],
      tableDataNormalOrigin: [], //数据备份
      tableDataFixed: [],
      tableDataFilter: [],
      searchName: '',
      search1: '',
      search2: '',
      multipleSelection: [],
      bool: true,
      tableDataTree: [],
      multipleSelectionTree: [],
      fixedTableData: []
    }
  },
  created () {
    this.tableDataTree = this.$mock['tableDataNormal']
    this.tableDataNormal = this.$mock['tableDataNormal']
    this.tableDataNormalOrigin = this.$mock['tableDataNormal']
    this.tableDataFixed = this.$mock['tableDataFixed']
    this.tableDataFilter = this.$mock['tableDataFilter']
    // this.fixedTableData = this.$mock['fixedTableData']
  },
  mounted () {
    // setInterval(()=>{
    //   this.$nextTick(() => {
    //     log(document.body.getElementsByClassName(".el-tooltip__popper"))
    // });
    // },3000)
    // this.initSelectTable() // 初始化选中table中的个别数据

    // axios数据请求、该请求会被mock拦截
    axios[urls.fixedTableData.type](urls.fixedTableData.url)
      .then((response) => {
        this.fixedTableData = response && response.data
        log(this.fixedTableData);
      })
      .catch(function (error) {
        log(error);
      });
    // 在vue中访问public内的静态资源
    axios.get('./data.json')
      .then((response) => {
        log('aaa', response);
      })
      .catch(function (error) {
        log(error);
      });
    axios.post('/api/', {
      account: 'admin',
      password: '12346'
    })
  },
  directives: {
    scrollNoFixed: {
      bind (el, binding, vnode) {
        // this.$refs.noFixedTable == vnode.context
        window.onscroll = function () {
          let oH = document.documentElement.scrollTop
          // log(oH)
          if (oH <= 150) {
            let header = el.getElementsByClassName(
              'el-table__header-wrapper'
            )[0]
            header.style.position = 'static'
            header.style.top = 0
            header.style.zIndex = 1
            header.style.display = 'block'
          }
          if (oH > 150) {
            let header = el.getElementsByClassName(
              'el-table__header-wrapper'
            )[0]
            header.style.position = 'fixed'
            header.style.top = 0
            header.style.zIndex = 1
            header.style.display = 'block'
          }
          if (oH > 330) {
            let header = el.getElementsByClassName(
              'el-table__header-wrapper'
            )[0]
            header.style.display = 'none'
          }
        }
      }
    },
    scrollfixed: {
      bind () {
        log('fixed的表格，头疼，咋搞啊！')
      }
    }
  },
  watch: {},
  computed: {
    filtertableDataNormal1 () {
      // 树级结构做模糊过滤、搜索 - 第一级，这种过滤完了以后，还会有父级在，不是最干净的过滤
      function diguiFnc (arr) {
        log(this)
        // debugger - 这种过滤完了以后
        return arr.filter(data => {
          let child = data.children
          if (child && child.length > 0) {
            return diguiFnc.call(this, child)
          } else {
            return (
              !this.searchName ||
              data.name.toLowerCase().includes(this.searchName.toLowerCase())
            )
          }
        })
      }
      return diguiFnc.call(this, this.tableDataNormal)
    },
    filtertableDataNormal2 () {
      // 树级结构做模糊过滤、搜索 - 第二级，可以满足只过滤子级，过滤到最深层级别
      if (this.searchName.length === 0) {
        return this.tableDataNormal // 返回原数组就行，filter和forEach都不改变原数组
        return this.tableDataNormalOrigin
      } else {
        let filterArr = []
        function diguiFnc (arr) {
          arr.forEach(data => {
            let child = data.children
            if (child && child.length > 0) {
              // filterArr.push(data)
              diguiFnc.call(this, child)
            } else {
              if (
                !this.searchName ||
                data.name.toLowerCase().includes(this.searchName.toLowerCase())
              )
                filterArr.push(data)
            }
          })
          // debugger - 这种过滤完了以后
          // return arr.filter(data => {
          //   let child = data.children
          //   if (child && child.length > 0) {
          //     return diguiFnc.call(this,child)
          //   } else {
          //     return !this.searchName || data.name.toLowerCase().includes(this.searchName.toLowerCase())
          //   }
          // })
        }
        diguiFnc.call(this, this.tableDataNormal)
        return filterArr
      }
    },
    filtertableDataNormal3 () {
      // 树级结构做模糊过滤、搜索 - 第三级，继续优化过滤方案，把最顶级也加入过滤中
      if (this.searchName.length === 0) {
        log(this.tableDataNormalOrigin)
        return this.tableDataNormalOrigin // 返回原数组就行，filter和forEach都不改变原数组
      } else {
        let filterArr = []
        function diguiFnc (arr) {
          arr.forEach(data => {
            // 第一层（父级）判断的时候，检测有过滤内容的就提取出来（不包含子级提取）
            if (
              !this.searchName ||
              data.name.toLowerCase().includes(this.searchName.toLowerCase())
            ) {
              let { id, date, name, address } = data
              log(data)
              filterArr.push({ id, date, name, address })
            }
            // 检测子级层，如果存在就递归调用该逻辑
            let child = data.children
            if (child && child.length > 0) {
              diguiFnc.call(this, child)
            }
            //  else {
            //   if (
            //     !this.searchName ||
            //     data.name.toLowerCase().includes(this.searchName.toLowerCase())
            //   )
            //     filterArr.push(data)
            // }
          })
        }
        diguiFnc.call(this, this.tableDataNormal)
        return filterArr
      }
    },
    filtertableDataNormal4 () {
      // 树级结构做模糊过滤、搜索 - 第四级，继续最佳优化，父级能单独过滤出来了，子级选完后恢复全部树级又挂了
      if (this.searchName.length === 0) {
        log(this.tableDataNormal, this.multipleSelection)
        this.multipleSelection.forEach(el => {
          log(el && el.id)
        })
        return this.tableDataNormal // 返回原数组就行，filter和forEach都不改变原数组
      } else {
        let filterArr = [],
          diguiFnc = arr => {
            arr.forEach(data => {
              // debugger
              log(data)
              if (
                !this.searchName ||
                data.name.toLowerCase().includes(this.searchName.toLowerCase())
              ) {
                let { id, date, name, address } = data
                filterArr.push({ id, date, name, address })
                // data.children = null
                // filterArr.push(data)
              }
              let child = data.children
              if (child && child.length > 0) {
                diguiFnc(child)
              }
              // else {
              //   if (
              //     !this.searchName ||
              //     data.name
              //       .toLowerCase()
              //       .includes(this.searchName.toLowerCase())
              //   )
              //     filterArr.push(data)
              // }
            })
          }
        diguiFnc(this.tableDataNormal)
        return filterArr
      }
    }
  },
  methods: {
    filterNameFn () {
      this.tableDataNormal =
        this.searchName === ''
          ? this.tableDataNormalOrigin
          : this.tableDataNormal.filter(
            data =>
              !this.searchName ||
              data.name.toLowerCase().includes(this.searchName.toLowerCase())
          )
    },
    toggleRowExpansion (row, expanded) {
      log(row, expanded)
    },
    tableClick () {
      var table = this.$refs.multipleTable
      log(table)
      table.toggleRowExpansion(row, true)
    },
    expandChange (row, expanded) {
      log(row, expanded)
      expanded = false
    },
    load (tree, treeNode, resolve) {
      if (this.flag) {
        log(tree, treeNode, resolve)
        this.flag = false
        setTimeout(() => {
          resolve([
            {
              id: 31,
              date: '2016-05-01',
              name: '李德愁',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              id: 32,
              date: '2016-05-01',
              name: '张迪生',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ])
          this.flag = true
        }, 5000)
      } else {
        treeNode.loading = false
      }
    },
    handleEdit (index, row) {
      log(index, row)
    },
    handleDelete (index, row) {
      log(index, row)
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    initSelectTable () {
      for (var i in [1, 2, 3]) {
        var item = parseInt(Math.random() * 8)
        this.multipleSelection.push(this.tableDataNormal[item])
        // log(item)
      }
      // log(this.multipleSelection)
      this.handleSelectionChange(this.multipleSelection)
      this.select111(this.multipleSelection)
    },
    handleSelectionChange (val) {
      log(val)
      this.multipleSelection = val
    },
    select111 (val) {
      log(val)
      // this.multipleSelection = val
    },
    toggleSelectionTree (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTableTree.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTableTree.clearSelection()
      }
    },
    handleSelectionChangeTree (val) {
      this.multipleSelectionTree = val
    }
  }
}
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
