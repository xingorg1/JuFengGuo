import React from 'react';

// React.createContext()函数执行后返回一个对象。对象中有Provider和Consumer两个属性
const { Provider, Consumer } = React.createContext();

// 导出出去供大家使用
export {
  Provider,
  Consumer
}
