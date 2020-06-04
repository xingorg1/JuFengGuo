# 扑克牌

一个函数，创建一副扑克牌（不包括大小王）。

一个函数能够打印该扑克牌。

文件|作用
-|-
1-normalType.ts|普通类型创建扑克牌
2-enumType.ts|枚举类型创建扑克牌


## 枚举参与编译
```js
// 编译后的效果
// 枚举的使用
/**
 * 花色
 */
// type PokerColor2 = '♥' | '♠' | '♦' | '♣' // string
var PokerColor2;
(function (PokerColor2) {
    PokerColor2["heart"] = "\u2665";
    PokerColor2["spade"] = "\u2660";
    PokerColor2["club"] = "\u2666";
    PokerColor2["diamond"] = "\u2663";
})(PokerColor2 || (PokerColor2 = {}));
/**
 * 牌面
 */
var PokerMark2;
(function (PokerMark2) {
    PokerMark2["A"] = "A";
    PokerMark2["two"] = "2";
    PokerMark2["three"] = "3";
    PokerMark2["four"] = "4";
    PokerMark2["five"] = "5";
    PokerMark2["six"] = "6";
    PokerMark2["seven"] = "7";
    PokerMark2["eight"] = "8";
    PokerMark2["nine"] = "9";
    PokerMark2["ten"] = "10";
    PokerMark2["J"] = "J";
    PokerMark2["Q"] = "Q";
    PokerMark2["K"] = "K";
})(PokerMark2 || (PokerMark2 = {}));
/**
 * 创建一副扑克牌
 */
function createPokers2() {
    var poker = [];
    var myObject = Object;
    var pcokerMark = myObject.values(PokerMark2);
    var pokerColor = myObject.values(PokerColor2);
    for (var _i = 0, pcokerMark_1 = pcokerMark; _i < pcokerMark_1.length; _i++) {
        var m = pcokerMark_1[_i];
        for (var _a = 0, pokerColor_1 = pokerColor; _a < pokerColor_1.length; _a++) {
            var c = pokerColor_1[_a];
            poker.push({
                color: c,
                mark: m
            });
        }
    }
    return poker;
}
// createPokers2()
function printPoker2(poker) {
    poker.forEach(function (el) {
        console.log(el.mark + el.color);
    });
}
printPoker2(createPokers2());
```