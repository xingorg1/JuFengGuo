<template>
  <div class="antv-f2">
    <h3 class="antv">antv</h3>
    <canvas id="myChart" width="400" height="260" ref="myChart"></canvas>
  </div>
</template>

<script>
import F2 from "@antv/f2";

export default {
  name: "AppAntv",
  data() {
    return {
      // F2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
      chartSource: [
        { genre: "测试", sold: 275 },
        { genre: "Strategy", sold: 115 },
        { genre: "Action", sold: 120 },
        { genre: "Shooter", sold: 350 },
        { genre: "Other", sold: 150 }
      ],
      newData: [
        { genre: "测试", sold: 1275 },
        { genre: "Strategy", sold: 1115 },
        { genre: "Action", sold: 1120 },
        { genre: "Shooter", sold: 1350 },
        { genre: "Other", sold: 1150 }
      ]
    }
  },
  // created() {//注意，一定要在mounted中注册并使用，不然created中不出效果。还会报错“Error: Please specify the id or el of the chart!”
  mounted(){
    // let self = this;
    // console.log(this.$refs.myChart)//在mounted之后，也才能拿到dom对象
    // Step 1: 创建 Chart 对象
    const chart = new F2.Chart({
      id: "myChart",
      pixelRatio: window.devicePixelRatio // 指定分辨率
    });

    // Step 2: 载入数据源
    chart.source(this.chartSource);
    setTimeout(()=>{
      chart.source(this.newData); // 更新数据源
      chart.repaint();  // 更新图表！
    },3000)

    // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
    chart
      .interval()
      .position("genre*sold")
      .color("genre");

    // Step 4: 渲染图表
    chart.render();
  }
};
</script>

<style lang="scss">
</style>
