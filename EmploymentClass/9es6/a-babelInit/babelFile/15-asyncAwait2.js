"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

// 回到这个阶段 - 使用promise解决多个异步问题。但是还是有回调地狱
function read() {
  return _read.apply(this, arguments);
}

function _read() {
  _read = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var val;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              val = null;
              _context.prev = 1;
              _context.next = 4;
              return setTimeout(function () {
                return 1;
              }, 1000);

            case 4:
              val = _context.sent;
              return _context.abrupt("return", val);

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);
              console.log('async的错误捕获', _context.t0);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [
        [1, 8]
      ]);
    }));
  return _read.apply(this, arguments);
}