// timers, poll and check
const fs = require('fs')
fs.readFile('./poll.js', () => {
  setTimeout(() => console.log('setTimeout'), 0)
  setImmediate(() => console.log('setImmediate'))
})