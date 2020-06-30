var path = require('path')
console.log('dirname: ', __dirname) // E:\github\JuFengGuo\advanceCourse\5-node\API-path (当前js文件所在目录的地址路径，注意尾部的目录分隔符会被忽略。)
console.log('filename: ', __filename) // E:\github\JuFengGuo\advanceCourse\5-node\API-path\index.js （当前js文件的地址）
console.log('path: ', path)
console.log('path.resolve 结果：', path.resolve(__dirname, __filename)) // E:\github\JuFengGuo\advanceCourse\5-node\API-path\index.js
console.log('【1】', path.resolve()) // E:\github\JuFengGuo\advanceCourse\5-node\API-path (如果没有传入 path 片段，则 path.resolve() 会返回当前工作目录的绝对路径。)
console.log('【2】', path.resolve('.')) // E:\github\JuFengGuo\advanceCourse\5-node\API-path （将路径或路径片段的序列解析为绝对路径）
console.log('【3】', path.resolve('.') === __dirname) // true
console.log('【4】', path.resolve(__dirname, '../')) // E:\github\JuFengGuo\advanceCourse\5-node (获取当前文件所在目录的上一级)

// resolve
// 给定的路径序列会从右到左进行处理，后面的每个 path 会被追加到前面，直到构造出绝对路径。
// 如果在处理完所有给定的 path 片段之后还未生成绝对路径，则会使用当前工作目录。

// 生成的路径会被规范化，并且尾部的斜杠会被删除（除非路径被解析为根目录）。
// 如果没有传入 path 片段，则 path.resolve() 会返回当前工作目录的绝对路径。

// path.resolve('/目录1/目录2', './目录3')
// // 返回: '/目录1/目录2/目录3'

// path.resolve('/目录1/目录2', '/目录3/目录4/')
// // 返回: '/目录3/目录4'

// path.resolve('目录1', '目录2/目录3/', '../目录4/文件.gif')
// // 如果当前工作目录是 /目录A/目录B，
// // 则返回 '/目录A/目录B/目录1/目录2/目录4/文件.gif'
