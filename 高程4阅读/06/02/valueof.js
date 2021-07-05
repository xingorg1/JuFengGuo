let array1 = [1, 2]
console.log(array1.valueOf()) // [1, 2]
Array.prototype.valueOf = function () {
  return this.map((item) => {
    return item + '石头姐'
  })
}
console.log(array1.valueOf()) // [ '1石头姐', '2石头姐' ]

