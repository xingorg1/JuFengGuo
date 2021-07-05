"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(generator);

function generator() {
  return regeneratorRuntime.wrap(function generator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 'one-1';

        case 2:
          _context.next = 4;
          return 'two-2';

        case 4:
          _context.next = 6;
          return 'three-3';

        case 6:
          return _context.abrupt("return", '最后');

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var gene3 = generator();
console.log(gene3.next);
console.log(gene3.next()); // 给obj加迭代函数

var iteObj = _defineProperty({
  0: '1a',
  1: '2b',
  2: '3c',
  3: '4d',
  length: 4
}, Symbol.iterator, function () {
  var _this = this;

  var curIndex = 0;

  var next = function next() {
    return {
      value: _this[curIndex++],
      done: curIndex > _this.length // 为true停止调用，为false就会一直进行下一个next调用

      /* // 老师的写法，改进，将前置自增改为后置自增，否则会少迭代最后一个
      value: this[curIndex],
      done: this.length == curIndex++ */

    };
  };

  return {
    next: next
  };
});
/*
 * @Author: @Guojufeng 
 * @Date: 2019-05-27 16:08:28 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-05-27 16:15:59
 * generator编译后的效果
 */
