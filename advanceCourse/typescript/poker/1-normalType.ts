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
type Pockers = SinglePoker[]
/**
 * 创建一副扑克牌
 */
function createPockers(): Pockers {
  const pocker: Pockers = [],
    pockerColor:PokerColor[] = ['♥', '♠', '♦', '♣' ],
    pockerMark = {
      1: 'A',
      11: 'J',
      12: 'Q',
      13: 'K'
    }
  for (let i = 1; i <= 13; i++) {
    for (let j = 0; j < pockerColor.length; j++) {
      pocker.push({
        color: pockerColor[j],
        mark: pockerMark[i] || i
      })
      // console.log((pockerMark[i] || i )+ pockerColor[j])
    }
  }
  // console.log(pocker)
  return pocker
}
// createPockers()

function printPocker(pocker: SinglePoker[]): void {
  pocker.forEach((el: SinglePoker) => {
    console.log(el.mark + el.color)
  });
}
printPocker(createPockers())