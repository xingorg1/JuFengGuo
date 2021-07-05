const util = require('util')

const obj1 = {
  'a': 1,
  'b': {
    c: 123
  }
}
const obj2 = {
  'a': 1,
  'b': {
    c: 123
  }
}
const obj3 = {
  'a': '1',
  'b': {
    c: 123
  }
}

console.log(util.isDeepStrictEqual(obj1, obj2)) // true
console.log(util.isDeepStrictEqual(obj2, obj3)) // false
console.log(util.isDeepStrictEqual(obj1, obj3)) // false