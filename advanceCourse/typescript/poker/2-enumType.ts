// 枚举的使用
/**
 * 花色
 */
type PokerColor2 = '♥' | '♠' | '♦' | '♣' // string
/**
 * 一张牌
 */
type SinglePoker2 = {
  color: PokerColor2
  mark: number
}
/**
 * 一副扑克牌
 */
type Pockers2 = SinglePoker2[]
/**
 * 创建一副扑克牌
 */
function createPockers2(): Pockers2 {
  const pocker: Pockers2 = [],
    pockerColor:PokerColor2[] = ['♥', '♠', '♦', '♣' ],
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
    }
  }
  return pocker
}
function printPocker2(pocker: SinglePoker2[]): void {
  pocker.forEach((el: SinglePoker2) => {
    console.log(el.mark + el.color)
  });
}
printPocker2(createPockers2())