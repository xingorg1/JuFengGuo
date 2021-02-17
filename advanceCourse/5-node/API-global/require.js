/* 
    require('abc/index.js')函数执行后的内部执行流程 
*/

require.cache = {
    [module.id]: module
}

function require(modulePath) {
    // 1. 经过很多流程，将modulePath所在的文件找到，并转化成绝对路径（找不到路径报错结束流程）
    let moduleAbsolutePath = 'moduleAbsolutePath'
    // 2. 判断是否该模块已经有缓存，有直接用，没有增加
    let haveCache = require.cache[moduleAbsolutePath] // module.id存的其实就是绝对路径
    if (haveCache) {
        return haveCache的运行结果
    }
    // 3. 读取模块内容
    let content = readModule(moduleAbsolutePath)
    // 4. 将内容包裹到临时函数，并传递一些可以在模块中直接用的参数（比如__dirname)
    function __temp(require, module, exports, __dirname, __filename) {
        // 内容直接放进来执行即可，这里边的内容就是我们在每一个模块里写的代码，可以直接用module.exports、__dirname等这些参数
        content会被放到这里进行执行

        // module、exports、this三者的关系
        exports === module.exports === this // 内容初始化的时候这个等式是成立的。后期在内部给module.exports、exports、this等进行重新赋值，三者 就不相等了。
        /* 
            如下三行代码，在未修改值的时候都是成立的
            console.log(module.exports === exports) // true
            console.log(module.exports === this) // true
            console.log(exports === this) // true
         */

        // 如果修改了exports引用值的地址，导出的还是module.exports
        /* 
            如下代码：
            module.exports = {
                a: 1
            }
            exports = {
                c: 3
            }
            导出结果还是{a: 1}
         */
    }
    // 5. 创建module对象及其属性
    const module = {
        id: moduleAbsolutePath,
        path: 模块所在路径,
        // exports: {},
        filename: moduleAbsolutePath, // 也就是文件所在目录的绝对路径
        loaded: Boolean,
        parent: {},
        children: [],
        paths: []
    }
    module.exports = {}
    const exports = module.exports // 因此初始化的时候，exports === module.exports === this

    // 6. 处理require函数身上的相关属性值
    require.main = module
    require.cache[moduleAbsolutePath] = module

    // 7. 调用临时函数，并传入相关参数，用call绑定模块里的this为module.exports
    // __temp.call(module.exports, require, module.exports, exports, module.path, module, filename)
    __temp.apply(module.exports, [require, module.exports, exports, module.path, module, filename]) // 这里用apply比较明显
}