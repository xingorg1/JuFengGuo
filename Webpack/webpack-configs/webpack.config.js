const path = require('path')
// webpack-loader配置 https://blog.csdn.net/lszy16/article/details/79162960
module.exports = {
    mode: "development",
    // 第一种写法
    // module: {
    //     rules: [
    //         { 
    //             test: /\.js$/, 
    //             use: [{
    //                 loader: path.resolve(__dirname, './loader路径/loader文件.js'), // 绝对路径：当前文件所在目录/loader路径/loader文件.js
    //             }] 
    //         }
    //     ]
    // },
    // 第二种写法
    module: {
        rules: [
            { 
                test: /\.js$/, 
                use: [{
                    loader: 'loader文件'
                }] 
            },
            {
                // 多个rule的情况
            }
        ]
    },
    resolveLoader: {
        modules: ['node_modules', path.resolve(__dirname, 'loader路径')]
    }
}