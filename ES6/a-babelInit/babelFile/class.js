"use strict";

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return _typeof(obj);
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Person =
  /*#__PURE__*/
  function () {
    _createClass(Person, null, [{
      key: "myName",
      value: function myName() {
        return 'my name is Father';
      }
    }]);

    function Person(name) {
      _classCallCheck(this, Person);

      this.name = name;

      this.myName = function () {
        return this.name;
      };
    }

    _createClass(Person, [{
      key: "lastName",
      value: function lastName() {
        return "guo";
      }
    }, {
      key: "eat",
      value: function eat() {
        return 'i can eat';
      }
    }]);

    return Person;
  }();
/* 自己在class外边写的prototype原型属性和方法，不会被加到_createClass中进行处理 */


Object.defineProperty(Person.prototype, 'mySelfSet', {
  value: '自定义属性'
});
var person = new Person('jf');
/* Man 继承 Person */

var Man =
  /*#__PURE__*/
  function (_Person) {
    _inherits(Man, _Person);

    _createClass(Man, null, [{
      key: "drink",
      value: function drink() {
        return 'i love drinking milk';
      }
    }]);

    function Man(myShuXing) {
      var _this;

      _classCallCheck(this, Man);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Man).call(this));
      _this.siyouShuXing = myShuXing;
      return _this;
    }

    _createClass(Man, [{
      key: "eat",
      value: function eat() {
        return 'i can eat banana';
      }
    }]);

    return Man;
  }(Person);

var WoMan =
  /*#__PURE__*/
  function (_ref) {
    _inherits(WoMan, _ref);

    function WoMan() {
      _classCallCheck(this, WoMan);

      return _possibleConstructorReturn(this, _getPrototypeOf(WoMan).apply(this, arguments));
    }

    return WoMan;
  }(null);
/*
 * @Author: @Guojufeng 
 * @Date: 2019-05-16 10:26:12 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-05-28 11:47:11
 * class练习
 */
// npx babel originFile/class.js -o babelFile/class.js --watch