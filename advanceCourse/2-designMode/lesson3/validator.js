// 构造函数 =》 对象实例
// add 添加校验规则 
// (dom, showDom,[{strategy: 'isNonEmpty', errorMsg: '用户名不为空'}, {strategy: 'maxLength:4'}, errorMsg: '用户名长度不能超过4']);
// start 开始校验并返回真正的校验结果 
// extend 可以扩展 算法 {isMail: function () {}}
function Validator () {
    this.cache = [];
    this.warnDom = [];
}
Validator.prototype.strategies = {
    isNonEmpty: function (value, errorMsg) {
        if (value == '') {
            return errorMsg;
        }
        return true;
    },
    maxLength: function (value, length, errorMsg) {
        if (value != '' && value.length > length) {
            return errorMsg;
        }
        return true;
    },
    minLength: function (value, length, errorMsg) {
        if (value != '' && value.length < length) {
            return errorMsg;
        }
        return true;
    }
}

Validator.prototype.add = function (dom, showDom, strategyArr) {
    var self = this;
    this.warnDom.push(showDom);
    strategyArr.forEach(function (ele, index) {
        self.cache.push(function () {
            // arr => ['isNonEmpty'] ['maxLength', '4'];
            var arr = ele.strategy.split(':');
            //arr => []  ['4']
            // type => isNonEmpty    maxLength
            var type = arr.shift();
            // [dom.value] [dom.value, '4']
            arr.unshift(dom.value);
            // [dom.value, errorMsg] [dom.value, '4', errorMsg]
            arr.push(ele.errorMsg);


            var msg = self.strategies[type].apply(self, arr);

            if (msg != true) {
                showDom.innerText = msg;
            }
            return msg;
        })
    })
}

Validator.prototype.start = function () {
    // 标记最后是否能符合规则
    var flag = true;
    this.warnDom.forEach(function (ele) {
        ele.innerText = '';
    })
    this.cache.forEach(function (ele) {
        if (ele() !== true) {
            flag = false;
        }
    })
    return flag;
}


Validator.prototype.extend = function (config) {
    for (var prop in config) {
        Validator.prototype.strategies[prop] = config[prop];
    }
}
