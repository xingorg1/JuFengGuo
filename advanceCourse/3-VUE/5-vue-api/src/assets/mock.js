export default {
  'polarData': {
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
    series: [{
      coordinateSystem: "polar",
      name: "line",
      type: "line",
      showSymbol: false,
      data: [1, 2, 3, 4, 5]
    }],
    animationDuration: 2000
  },
  "areaData": {
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
        padding: [0, 0, 0, 60],
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
    series: [{
      data: ["8", "9.1", "9.4", "4.5", "1.9", "3.3", "0"],
      type: "line",
      smooth: true,
      areaStyle: {}
    }]
  },
  "tableDataFixed": [{
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  }, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  }, {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  }],
  "tableDataFilter": [{
    date: '2016-05-02',
    name: 'guojufeng',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-04',
    name: 'gaoxiaoxiao',
    address: '上海市普陀区金沙江路 1517 弄'
  }, {
    date: '2016-05-01',
    name: 'zhangailing',
    address: '上海市普陀区金沙江路 1519 弄'
  }, {
    date: '2016-05-03',
    name: 'zhangguorong',
    address: '上海市普陀区金沙江路 1516 弄'
  }],
  // 名字随便打，如有雷同纯属巧合
  "tableDataNormal": [{
      id: 1,
      date: "2016-05-02",
      name: "郭菊锋",
      address: "上海市普陀区金沙江路 1518 弄",
      children: [{
          id: 11,
          date: '2016-05-01',
          name: '李德愁1',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [{
            id: 111,
            date: '2016-05-01',
            name: '郭德愁2',
            address: '上海市普陀区金沙江路 1519 弄'
          }]
        },
        {
          id: 12,
          date: '2016-05-01',
          name: '张迪生3',
          address: '上海市普陀区金沙江路 1519 弄'
        }
      ]
    },
    {
      id: 2,
      date: "2016-05-04",
      name: "郭沫若",
      address: "上海市普陀区金沙江路 1517 弄",
      children: [{
        id: 31,
        date: '2016-05-01',
        name: '李德愁4',
        address: '上海市普陀区金沙江路 1519 弄'
      }]
    },
    {
      id: 3,
      date: "2016-05-01",
      name: "郭德纲",
      address: "上海市普陀区金沙江路 1519 弄",
    },
    {
      id: 4,
      date: "2016-05-03",
      name: "冯小纲",
      address: "上海市普陀区金沙江路 1516 弄",
    },
    {
      id: 5,
      date: "2016-05-01",
      name: "张艾迪",
      address: "上海市普陀区金沙江路 1519 弄",
      children: [{
        id: 52,
        date: '2016-05-01',
        name: '张迪生5',
        address: '上海市普陀区金沙江路 1519 弄'
      }]
    },
    {
      id: 6,
      date: "2016-05-03",
      name: "刘济格",
      address: "上海市普陀区金沙江路 1516 弄",
    }
  ],
  "tableData": [{
      date: "2016-05-03",
      name: "王小虎",
      province: "8%",
      city: 0,
      address: "上海市普陀区金沙江路 1518 弄",
      zip: 200333
    },
    {
      date: "2016-05-02",
      name: "王小虎",
      province: "8%",
      city: "普陀区",
      address: "8%市普陀区金沙江路 1518 弄",
      zip: 200333
    },
    {
      date: "2016-05-04",
      name: "王小虎",
      province: "8%",
      city: "普陀区",
      address: "8%市普陀区金沙江路 1518 弄",
      zip: 200333
    },
    {
      date: "2016-05-01",
      name: "王小虎",
      province: "8%",
      city: "普陀区",
      address: "8%市普陀区金沙江路 1518 弄",
      zip: 200333
    },
    {
      date: "2016-05-08",
      name: "王小虎",
      province: "8%",
      city: "普陀区",
      address: "8%市普陀区金沙江路 1518 弄",
      zip: 200333
    },
    {
      date: "2016-05-06",
      name: "王小虎",
      province: "8%",
      city: "普陀区",
      address: "8%市普陀区金沙江路 1518 弄",
      zip: 200333
    },
    {
      date: "2016-05-07",
      name: "王小虎",
      province: "8%",
      city: "普陀区",
      address: "8%市普陀区金沙江路 1518 弄",
      zip: 200333
    }
  ],
  "tableData1": [{
      id: 1,
      date: "2016-05-02",
      name: "王小虎1",
      address: "-"
    },
    {
      id: 2,
      date: "2016-05-04",
      name: "王小虎2",
      address: "-10%"
    },
    {
      id: 3,
      date: "2016-05-01",
      name: "王小虎3",
      address: "100%",
      hasChildren: true
    },
    {
      id: 4,
      date: "2016-05-03",
      name: "王小虎3",
      address: "20%"
    }
  ],
  "tableData2": [{
      id: 1,
      date: "2016-05-02",
      name: "郭菊锋1",
      address: "8%"
    },
    {
      id: 2,
      date: "2016-05-04",
      name: "郭菊锋2",
      address: "10%"
    },
    {
      id: 3,
      date: "2016-05-01",
      name: "郭菊锋3",
      address: "100%",
      hasChildren: true
    },
    {
      id: 4,
      date: "2016-05-03",
      name: "郭菊锋3",
      address: "20%"
    }
  ],
  fixedTableData: [{
    date: '2016-05-03',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-04',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-01',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-08',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-06',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-07',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  },{
    date: '2016-05-03',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-04',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-01',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-08',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-06',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-07',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  },{
    date: '2016-05-03',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-04',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-上海市普陀区金沙江路05-01',
    name: '王小上海市普陀区金沙江路虎',
    province: '上上海市普陀区金沙江路海',
    city: '普陀区上海市普陀区金沙江路',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-08',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-上海市普陀区金沙江路05-06',
    name: '王小虎上海市普陀区金沙江路',
    province: '上海上海市普陀区金沙江路',
    city: '普陀区上海市普陀区金沙江路',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-07end',
    name: '王小虎end',
    province: '上海end',
    city: '普陀区end',
    address: '上海市普陀区金沙江路 1518 弄end',
    zip: 2003333333
  }]
}