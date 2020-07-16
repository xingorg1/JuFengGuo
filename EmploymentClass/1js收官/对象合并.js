let state = {
  a: 1,
  b: {
    name: 'b',
    age: 12
  }
}

let newState = {
  ...state,
  b: {
    ...state.b,
    age: 18
  }
}
console.log(newState)