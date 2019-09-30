<template>
  <div class="app-echarts">
    <h3>{{ msg }}</h3>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="first">
        <span slot="label">客户分组</span>
        <v-chart :options="polar" />
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label">配置管理</span>
        <v-chart ref="myCharts" id="myCharts" :options="area" />
      </el-tab-pane>
      <el-tab-pane name="third">
        <span slot="label">角色管理</span>
        <v-chart :options="bar" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
export default {
  name: "AppEcharts",
  data() {
    let data = [];

    for (let i = 0; i <= 360; i++) {
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
      activeName: "second",
      msg: "echarts 应用",
      polar: {
        title: {
          text: "222极坐标双数值轴"
        },
        legend: {
          data: ["line"]
        },
        polar: {
          center: ["50%", "54%"]
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        angleAxis: {
          type: "value",
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [
          {
            coordinateSystem: "polar",
            name: "line",
            type: "line",
            showSymbol: false,
            data: [1, 2, 3, 4, 5]
          }
        ],
        animationDuration: 2000
      },
      area: {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value",
          name: "哈哈哈哈哈",
          nameTextStyle: {
            fontSize: 12,
            color: "red",
            align: "left",
            padding: [0,0,0, 60],
            rich: {
              a: {
                // 没有设置 `align`，则 `align` 为 right
              }
            }
          },
          axisLine: {
            // show: false
            lineStyle: {
              color: "#eee"
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 12,
            color: "#999"
          },
          splitLine: {
            lineStyle: {
              color: "#eee"
            }
          }
        },
        tooltip: {
          trigger: "axis"
        },
        series: [
          {
            data: ["8", "9.1", "9.4", "4.5", "1.9", "3.3", "0"],
            type: "line",
            areaStyle: {}
          }
        ]
      },
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
              Object.keys(downloadJson).reduce(function(all, key) {
                return all + downloadJson[key];
              }, 0),
            x: "75%",
            textAlign: "center"
          },
          {
            text: "主题下载",
            subtext:
              "总计 " +
              Object.keys(themeJson).reduce(function(all, key) {
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
            data: Object.keys(builderJson.charts).map(function(key) {
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
            data: Object.keys(builderJson.charts).map(function(key) {
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
            data: Object.keys(builderJson.components).map(function(key) {
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
            data: Object.keys(builderJson.components).map(function(key) {
              return builderJson.all - builderJson.components[key];
            })
          },
          {
            type: "pie",
            radius: [0, "30%"],
            center: ["75%", "25%"],
            data: Object.keys(downloadJson).map(function(key) {
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
            data: Object.keys(themeJson).map(function(key) {
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
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      let myChart = this.$refs.myCharts;
      myChart.resize();
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
