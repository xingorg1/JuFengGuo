// 基本类型的使用
/**
 * 花色
 */
type PokerColor = '♥' | '♠' | '♦' | '♣' // string
/**
 * 一张牌
 */
type SinglePoker = {
  color: PokerColor
  mark: number
}
/**
 * 一副扑克牌
 */
type Pokers = SinglePoker[]
/**
 * 创建一副扑克牌
 */
function createPokers(): Pokers {
  const poker: Pokers = [],
    pokerColor:PokerColor[] = ['♥', '♠', '♦', '♣' ],
    pokerMark = {
      1: 'A',
      11: 'J',
      12: 'Q',
      13: 'K'
    }
  for (let i = 1; i <= 13; i++) {
    for (let j = 0; j < pokerColor.length; j++) {
      poker.push({
        color: pokerColor[j],
        mark: pokerMark[i] || i
      })
      // console.log((pokerMark[i] || i )+ pokerColor[j])
    }
  }
  // console.log(poker)
  return poker
}
// createPokers()

function printPoker(poker: SinglePoker[]): void {
  poker.forEach((el: SinglePoker) => {
    console.log(el.mark + el.color)
  });
}
printPoker(createPokers())