<template>
  <div class="xlsx">
    <h3>这里用了奇技淫巧，拐弯抹角的把下载的dom的不需要的结构删除了再生成的excel，但是这种做法频繁操作dom不太高效</h3>
    <div class="area">
      <!-- <el-tree :props="props" :load="loadNode" lazy show-checkbox @check-change="handleCheckChange"></el-tree> -->
      <el-button type="primary" @click="downLoad('#out-table')">下载+单元格格式</el-button>
      <el-button type="primary" @click="clone">固定首列+克隆+下载</el-button>
      <h3></h3>
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
        <el-table-column prop="address" label="地址" width="380"></el-table-column>
      </el-table>
      <el-table
        id="guojufeng"
        :data="tableData2"
        style="width: 600px"
        row-key="id"
        border
        lazy
        :load="load"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="date" label="日期" width="120" fixed></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址" width="380"></el-table-column>
      </el-table>
    </div>
    <div class="area">
      <el-button type="primary" @click="clone2">克隆+插入dom+下载+移除dom+高级表格</el-button>
      <el-button type="primary" @click="clone3">克隆+node对象直接转变并下载+高级表格</el-button>
      <h3></h3>
      <div id="table2">
        <el-table :data="tableData" style="width: 600px; margin-bottom: 20px;">
          <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
          <el-table-column label="配送信息">
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column label="地址">
              <el-table-column prop="province" label="省份" width="120"></el-table-column>
              <el-table-column prop="city" label="市区" width="120"></el-table-column>
              <el-table-column prop="address" label="地址" width="300"></el-table-column>
              <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table>
        <el-table :data="tableData" style="width: 600px">
          <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
          <el-table-column label="配送信息">
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column label="地址">
              <el-table-column prop="province" label="省份" width="120"></el-table-column>
              <el-table-column prop="city" label="市区" width="120"></el-table-column>
              <el-table-column prop="address" label="地址" width="300"></el-table-column>
              <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
const { log } = console;
export default {
  name: "xlsx",
  data() {
    return {
      tableData: [],
      tableData1: [],
      tableData2: []
    };
  },
  created() {
    (this.tableData = this.$mock["tableData"]),
      (this.tableData1 = this.$mock["tableData1"]),
      (this.tableData2 = this.$mock["tableData2"]);
  },
  mounted() {},
  methods: {
    downLoad(id) {
      var wb = XLSX.utils.table_to_book(document.querySelector(id));

      /* 修改单元格的样式 */
      // workfomat = wb.add_format({
      //   bold: true, //字体加粗
      //   border: 1, //单元格边框宽度
      //   align: "center", //对齐方式
      //   valign: "vcenter", //字体对齐方式
      //   fg_color: "#F4B084" //单元格背景颜色
      // });

      /* 向工作簿中添加工作表（自定义数据ws_data） */
      var ws_name = "SheetJS";
      // make worksheet
      var ws_data = [["S", "h", "e", "e", "t", "J", "S"], [1, 2, 3, 4, 5]];
      var ws = XLSX.utils.aoa_to_sheet(ws_data);
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(wb, ws, ws_name);

      /* 向工作簿汇中添加已有表格转化的工作表 */
      var wb2 = XLSX.utils.table_to_book(document.querySelector("#guojufeng"));
      // log(document.querySelector('#guojufeng'))
      var wb2_name = "已有表格转化的工作表";
      XLSX.utils.book_append_sheet(wb, wb2["Sheets"]["Sheet1"], wb2_name);

      /* 修改单元格的格式 */
      var index = 2;
      var first_sheet_name = wb.SheetNames[0],
        mySheet = wb.Sheets[first_sheet_name];
      var maxTr = mySheet["!ref"].split(":")[1].match(/\d+/g)[0];
      // var ssf_percent = wb['SSF']['10'];// 格式：'0.00%'
      while (index <= maxTr) {
        if (mySheet["C" + index]) {
          mySheet["C" + index]["z"] = "0.00%"; //ssf_percent;
      
          let tdV = mySheet["C" + index]["v"];
          if (new RegExp("-", "g").test(tdV) && tdV.length == 1) {
            // 颜色尝试 - 失败
            mySheet["C" + index]["s"] = {
              font: { sz: 14, bold: true, color: { rgb: "FFAA00" } },
              fill: { bgColor: { indexed: 64 }, fgColor: { rgb: "#FFAA00" } },
              alignment: {
                horizontal: "center",
                vertical: "center"
              },
              numFmt : "0.00%"
            };
          } else if (new RegExp("-", "g").test(tdV) && tdV.length != 1) {
            mySheet["C" + index]["s"] = {
              //设置副标题样式
              font: {
                name: "Calibri",
                sz: 14,
                color: { rgb: "#FFFFAA00" },
                bold: true,
                italic: true,
                underline: false
              },
              alignment: {
                horizontal: "center",
                vertical: "center"
              },
              numFmt : "0.00%"
            };
            // mySheet["C" + index]["s"] = {
            //   font: {
            //     color: { rgb: "#FFFF0000" }
            //   },
            //   alignment: {
            //     horizontal: "center",
            //     vertical: "center"
            //   }
            // };
          } else {
            mySheet["C" + index]["s"] = {
              font: {
                color: {
                  rgb: 'FFFFAA00'
                }
              },
              alignment: {
                horizontal: "center",
                vertical: "center"
              },
              numFmt : "0.00%"
            };
          }
        }
        index++;
      }
      mySheet['C1'].s = {fill:{fgColor: {rgb:"#ef0d62"}}};
      log(wb);
      log({ wb2, wb }, XLSX.SSF, wb.SSF);
      /* get binary string as output 得到一个可输入的文本流*/
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: false,
        type: "array"
      });

      try {
        /* 存储到本地 */
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "sheetjs.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") log(e, wbout);
      }
      if (id.indexOf("hahha") != -1) {
        /* 移除克隆好的dom */
        document.body.removeChild(document.querySelector(id));
      }
      return wbout;
    },
    downLoad2(node) {
      var wb = XLSX.utils.table_to_book(node);
      log(wb);
      /* get binary string as output 得到一个可输入的文本流*/
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: false,
        type: "array"
      });

      try {
        /* 存储到本地 */
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "sheetjs.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") log(e, wbout);
      }
      return wbout;
    },
    clone() {
      var node = document.querySelector("#out-table").cloneNode(true);
      log(node);
      node.id = "hahha";
      node.style.display = "none";
      log(node.querySelector(".el-table__fixed"));
      node.removeChild(node.querySelector(".el-table__fixed"));
      document.body.appendChild(node);
      setTimeout(() => {
        this.downLoad("#" + node.id);
        // this.downLoad2(node)
      }, 0);
    },
    clone2() {
      var node = document.querySelector("#table2").cloneNode(true);
      log(node);
      node.id = "hahha";
      node.style.display = "none";
      // let arr = node.querySelectorAll(".el-table__fixed");
      // if(arr.length > 1){
      let table = node.querySelectorAll(".el-table");
      table.forEach(element => {
        element.removeChild(node.querySelector(".el-table__fixed"));
      });
      // }else{
      //   node.removeChild(node.querySelector(".el-table__fixed"));
      // }
      log(
        node.querySelector(".el-table"),
        node.querySelector(".el-table__fixed")
      );
      // setTimeout()
      // arr.forEach((ele,i) => {
      //   log(i,node)
      // });
      document.body.appendChild(node);

      setTimeout(() => {
        this.downLoad("#" + node.id);
      }, 0);
    },
    clone3() {
      var node = document.querySelector("#table2").cloneNode(true);
      log(node);
      let table = node.querySelectorAll(".el-table");
      table.forEach(element => {
        // element.querySelector(".el-table__fixed").style.display = 'none';
        element.removeChild(node.querySelector(".el-table__fixed"));
      });
      setTimeout(() => {
        this.downLoad2(node);
      }, 0);
    },
    load(tree, treeNode, resolve) {
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
      }, 500);
    }
  }
};
</script>

<style>
</style>
