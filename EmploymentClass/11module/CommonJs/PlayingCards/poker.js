const Poker = function () {
  let pokerArr = []
  for (let color = 1; color <= 4; color++) {
    for (let number = 1; number <= 13; number++) {
      pokerArr.push(this.createOnePoker(color, number))
    }
  }
  // 推进大小王
  pokerArr.push(
    this.createOnePoker(null, 14),
    this.createOnePoker(null, 15)
  )
  this.pokerArr = pokerArr
}
/* 生成一张新牌 */
Poker.prototype.createOnePoker = (color, number) => {
  // 生成牌,color是花色，number是牌面
  let poker = ''
  switch(color){
    case 1:
      poker += '♠'
      break;
    case 2:
      poker += '♥'
      break;
    case 3:
      poker += '♣'
      break;
    case 4:
      poker += '♦'
      break;
  }
  switch(number){
    case 1:
      poker += 'A'
      break;
    case 11:
      poker += 'J'
      break;
    case 12:
      poker += 'Q'
      break;
    case 13:
      poker += 'K'
      break;
    case 14:
      poker = 'joker'
      break;
    case 15:
      poker = 'JOKER'
      break;
    default:
      poker += number
      break;
  }
  return poker
}
/* 生成一副牌 */
/* Poker.prototype.init = () => {
  let pokerArr = []
  for (let color = 1; color <= 4; color++) {
    for (let number = 1; number <= 13; number++) {
      pokerArr.push(this.createOnePoker(color, number))
    }
  }
  // 推进大小王
  pokerArr.push(
    this.createOnePoker(null, 14),
    this.createOnePoker(null, 15)
  )
  return pokerArr
} */
/* 分发牌 */
Poker.prototype.dispatchPoker = (pokerArr, radix) => {
  let clonePokerArr = [...pokerArr],
    limit = 54 / radix - 1,
    resultArr = []
  for (let num = 0; num <= radix; num++) {
    resultArr.push(clonePokerArr.slice(limit * num, limit * num + limit))
  }
  return resultArr;
}
module.exports = Poker