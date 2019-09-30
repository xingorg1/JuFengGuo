<template>
  <div class="xlsx">
    <!-- <h3 @click="downLoad"></h3> -->
    <!-- <el-tree :props="props" :load="loadNode" lazy show-checkbox @check-change="handleCheckChange"></el-tree> -->
    <el-button  @click="downLoad('#'+'out-table')">
      下载
    </el-button>
    <!-- <el-button @click="clone">
      克隆+下载
    </el-button> -->
    <el-table
      id="out-table"
      :data="tableData1"
      style="width: 600px"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="date" label="日期" width="120" fixed></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"  width="380"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
const {log} = console
export default {
  name: "xlsxDown",
  data() {
    return {
      tableData1: []
    };
  },
  mounted() {
    this.tableData1 = this.$mock["tableData1"]
  },
  methods: {
    downLoad(id) {
      var wb = XLSX.utils.table_to_book(document.querySelector(id));
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "sheetjs.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    clone(){
      var node=document.querySelector("#out-table").cloneNode(true);
      log(node)
      node.id = 'hahha'
      node.style.display = 'none'
      node.removeChild(node.querySelector('.el-table__fixed'))
      log(node.querySelector('.el-table__fixed'))
      document.body.appendChild(node);
      
      setTimeout(()=>{
        this.downLoad('#'+node.id)
      },0)
    },
    load(tree, treeNode, resolve) {
      log(tree,treeNode,resolve)
      setTimeout(() => {
        treeNode.loading = false;//关闭loading样式
      //   resolve([
      //     {
      //       id: 31,
      //       date: "2016-05-01",
      //       name: "王小虎",
      //       address: "上海市普陀区金沙江路 1519 弄"
      //     },
      //     {
      //       id: 32,
      //       date: "2016-05-01",
      //       name: "王小虎",
      //       address: "上海市普陀区金沙江路 1519 弄"
      //     }
      //   ]);
      }, 500);
    }
  }
};
</script>

<style>
</style>
