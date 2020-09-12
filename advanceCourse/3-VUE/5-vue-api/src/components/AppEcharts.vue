<template>
  <div class="app-echarts">
    <h3>{{ msg }}</h3>
    <el-button size="mini"
               @click="changeData">改变数据</el-button>
    <div class="area">
      <el-tabs v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane name="first">
          <span slot="label">极坐标</span>
          <v-chart :options="polar" />
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label">动态图</span>
          <v-chart ref="myCharts"
                   id="myCharts"
                   :options="area" />
        </el-tab-pane>
        <el-tab-pane name="third">
          <span slot="label">柱图+饼图</span>
          <v-chart :options="bar" />
        </el-tab-pane>
        <el-tab-pane name="four">
          <span slot="label">异常点图</span>
          <v-chart :options="effectScatter" />
        </el-tab-pane>
        <el-tab-pane name="five">
          <span slot="label">异常点图+平均线+数据视图</span>
          <v-chart :options="effectScatterDataView" />
          <div>
            <p>要在main.js里边把toolbox引入进来，import 'echarts/lib/component/toolbox'; // 工具（如下载功能与按钮）</p>
            
            <p>
              数据视图控件的配置，在官网有实际例子，可以看这里：
              <el-link href="https://www.echartsjs.com/zh/option.html#toolbox.feature.dataView.optionToContent"
                       type="primary">传送门</el-link>
            </p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/effectScatter"
const { log } = console;
export default {
  name: "AppEcharts",
  data () {
    let data = [];

    for (let i = 0;i <= 360;i++) {
      let t = (i / 180) * Math.PI;
      let r = Math.sin(2 * t) * Math.cos(2 * t);
      data.push([r, i]);
    }

    var builderJson = {
      all: 10887,
      charts: {
        map: 3237,
        lines: 2164,
        bar: 7561,
        line: 7778,
        pie: 7355,
        scatter: 2405,
        candlestick: 1842,
        radar: 2090,
        heatmap: 1762,
        treemap: 1593,
        graph: 2060,
        boxplot: 1537,
        parallel: 1908,
        gauge: 2107,
        funnel: 1692,
        sankey: 1568
      },
      components: {
        geo: 2788,
        title: 9575,
        legend: 9400,
        tooltip: 9466,
        grid: 9266,
        markPoint: 3419,
        markLine: 2984,
        timeline: 2739,
        dataZoom: 2744,
        visualMap: 2466,
        toolbox: 3034,
        polar: 1945
      },
      ie: 9743
    };

    var downloadJson = {
      "echarts.min.js": 17365,
      "echarts.simple.min.js": 4079,
      "echarts.common.min.js": 6929,
      "echarts.js": 14890
    };

    var themeJson = {
      "dark.js": 1594,
      "infographic.js": 925,
      "shine.js": 1608,
      "roma.js": 721,
      "macarons.js": 2179,
      "vintage.js": 1982
    };

    var waterMarkText = "ECHARTS";

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = canvas.height = 100;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.globalAlpha = 0.08;
    ctx.font = "20px Microsoft Yahei";
    ctx.translate(50, 50);
    ctx.rotate(-Math.PI / 4);
    ctx.fillText(waterMarkText, 0, 0);
    return {
      activeName: "five",
      msg: "echarts 应用",
      polar: {},
      area: {},
      effectScatter: {},
      effectScatterDataView: {},
      bar: {
        backgroundColor: {
          type: "pattern",
          image: canvas,
          repeat: "repeat"
        },
        tooltip: {},
        title: [
          {
            text: "在线构建",
            subtext: "总计 " + builderJson.all,
            x: "25%",
            textAlign: "center"
          },
          {
            text: "各版本下载",
            subtext:
              "总计 " +
              Object.keys(downloadJson).reduce(function (all, key) {
                return all + downloadJson[key];
              }, 0),
            x: "75%",
            textAlign: "center"
          },
          {
            text: "主题下载",
            subtext:
              "总计 " +
              Object.keys(themeJson).reduce(function (all, key) {
                return all + themeJson[key];
              }, 0),
            x: "75%",
            y: "50%",
            textAlign: "center"
          }
        ],
        grid: [
          {
            top: 50,
            width: "50%",
            bottom: "45%",
            left: 10,
            containLabel: true
          },
          {
            top: "55%",
            width: "50%",
            bottom: 0,
            left: 10,
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: "value",
            max: builderJson.all,
            splitLine: {
              show: false
            }
          },
          {
            type: "value",
            max: builderJson.all,
            gridIndex: 1,
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "category",
            data: Object.keys(builderJson.charts),
            axisLabel: {
              interval: 0,
              rotate: 30
            },
            splitLine: {
              show: false
            }
          },
          {
            gridIndex: 1,
            type: "category",
            data: Object.keys(builderJson.components),
            axisLabel: {
              interval: 0,
              rotate: 30
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            type: "bar",
            stack: "chart",
            z: 3,
            label: {
              normal: {
                position: "right",
                show: true
              }
            },
            data: Object.keys(builderJson.charts).map(function (key) {
              return builderJson.charts[key];
            })
          },
          {
            type: "bar",
            stack: "chart",
            silent: true,
            itemStyle: {
              normal: {
                color: "#eee"
              }
            },
            data: Object.keys(builderJson.charts).map(function (key) {
              return builderJson.all - builderJson.charts[key];
            })
          },
          {
            type: "bar",
            stack: "component",
            xAxisIndex: 1,
            yAxisIndex: 1,
            z: 3,
            label: {
              normal: {
                position: "right",
                show: true
              }
            },
            data: Object.keys(builderJson.components).map(function (key) {
              return builderJson.components[key];
            })
          },
          {
            type: "bar",
            stack: "component",
            silent: true,
            xAxisIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: "#eee"
              }
            },
            data: Object.keys(builderJson.components).map(function (key) {
              return builderJson.all - builderJson.components[key];
            })
          },
          {
            type: "pie",
            radius: [0, "30%"],
            center: ["75%", "25%"],
            data: Object.keys(downloadJson).map(function (key) {
              return {
                name: key.replace(".js", ""),
                value: downloadJson[key]
              };
            })
          },
          {
            type: "pie",
            radius: [0, "30%"],
            center: ["75%", "75%"],
            data: Object.keys(themeJson).map(function (key) {
              return {
                name: key.replace(".js", ""),
                value: themeJson[key]
              };
            })
          }
        ]
      }
    };
  },
  created () {
    this.polar = this.$mock.polarData;
    this.area = this.$mock.areaData;
    setTimeout(() => {
      setInterval(() => {
        this.changeData()
      }, 1000)
    }, 2000)
    this.effectScatter = this.$mock.effectScatter;
    this.effectScatterDataView = this.$mock.effectScatterDataView;
  },
  methods: {
    handleClick (tab, event) {
      log(tab, event);
      let myChart = this.$refs.myCharts;
      myChart.resize();
    },
    changeData () {
      let arr = ["Mon", "Tue", "Wed", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      this.$set(this.area.xAxis, "data", arr);
      let data = [];
      arr.forEach(() => {
        data.push(Math.random() * 10)
      })
      let options = this.$mock.areaData;
      options.series[0].data = data;
      // this.$set(this.area.series[0], "data", data);
      this.area = options
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
