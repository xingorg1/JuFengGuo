let array1 = [1]
console.log(array1.concat(2)); // [ 1, 2 ]
console.log(array1.concat(3,4, [5])); // [ 1, 3, 4, 5 ]
console.log(array1.concat([6, 7])); // [ 1, 6, 7 ]
console.log(array1.concat([8], [9, 10])); // [ 1, 8, 9, 10 ]

console.log(array1.concat(2).concat(3,4,[5]).concat([6, 7]).concat([8], [9, 10])) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]