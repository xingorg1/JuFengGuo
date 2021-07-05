"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 导出练习 - 导出固定模块
exports.moduleName = '模块导出练习';
function funcName(a) {
    return a + 1;
}
exports.funcName = funcName;
// 导出练习 - 导出默认模块
exports.default = {
    name: '默认的导出'
};
