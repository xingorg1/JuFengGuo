// 枚举的使用
/**
 * 花色
 */
// type PokerColor2 = '♥' | '♠' | '♦' | '♣' // string
enum PokerColor2 {
  heart = '♥' ,
  spade = '♠', 
  club = '♦',
  diamond = '♣'
}
/**
 * 牌面
 */
enum PokerMark2 {
  A = 'A',
  two = '2',
  three = '3',
  four = '4',
  five = '5',
  six = '6',
  seven = '7',
  eight = '8',
  nine = '9',
  ten = '10',
  J = 'J',
  Q = 'Q',
  K = 'K'
}
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
type Pokers2 = SinglePoker2[]
/**
 * 创建一副扑克牌
 */
function createPokers2(): Pokers2 {
  const poker = []
  const myObject: any = Object
  const pcokerMark = myObject.values(PokerMark2)
  const pokerColor = myObject.values(PokerColor2)
  for (const m of pcokerMark) {
    for (const c of pokerColor) {
      poker.push({
        color: c,
        mark: m
      })
    }
  }
  return poker
}
// createPokers2()
function printPoker2(poker: SinglePoker2[]): void {
  poker.forEach((el: SinglePoker2) => {
    console.log(el.mark + el.color)
  });
}
printPoker2(createPokers2())
