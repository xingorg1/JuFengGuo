const utils = require('./utils')
const Poker = require('./poker')
const poker = new Poker() // 生成一副牌

let randomArr = utils.randomArr(poker.pokerArr) // 打乱顺序
console.log('打乱的牌：', randomArr.join('~'))

/* 斗地主，把打乱的牌分三份，底牌留3张 */
const dispatchArr = poker.dispatchPoker(randomArr, 3)
console.log('玩家A的牌：', dispatchArr[0].join(','))
console.log('玩家B的牌：', dispatchArr[1].join(','))
console.log('玩家C的牌：', dispatchArr[2].join(','))
console.log('桌上的牌：', dispatchArr[3].join(','))
