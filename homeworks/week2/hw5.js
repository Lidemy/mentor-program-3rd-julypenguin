function join(str, concatStr) {
  var answer = str.reduce(
    function(accu, value) {
      return accu + concatStr + value
    })
  return answer
}

function repeat(str, times) {
  var repeat = ''
  for(var i = 0 ; i<times ; i++) {
     repeat += str
  }
  return repeat
}

console.log(join(['a', 'b', 'c'], '!'))
console.log(repeat('a', 5))
