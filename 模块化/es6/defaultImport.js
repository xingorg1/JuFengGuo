// 默认导入

// import datas, { name } from './defaultExport.js'
// console.log('默认导入：', datas, name)

// 如果使用*号，会将所有基本导出和默认导出聚合到一个对象中，默认导出会作为属性default存在
import datas2, * as allData from './defaultExport.js'
console.log('默认导入*：', datas2, allData)
