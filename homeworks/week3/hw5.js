function add(a, b) {
  let numA = new Array(1000).fill('0')
  let numB = new Array(1000).fill('0')
  let arr = []
  let tmp = []
  let answer = ''

  for (let i=a.length-1 ; i>=0 ; i--) {
    if (a.length-i-1 >= 0) {
      numA.splice(i, 1, a[a.length-i-1])
    }
    if (b.length-i-1 >= 0) {
      numB.splice(i, 1, b[b.length-i-1])
    }
  }

  for (let i=0 ; i<1000 ; i++) {
    arr.push(numA[i].charCodeAt() + numB[i].charCodeAt())
  }


  for (let i=0 ; i<1000 ; i++) {
    if (arr[i] - 106 >= 0) {
      arr.splice(i, 1, arr[i] - 58)
      arr.splice(i+1, 1, arr[i+1] + 1)
    }else {
      arr.splice(i, 1, arr[i] - 48)
    }
  }
  for (let i = 0 ; i<arr.length ; i++) {
    tmp.unshift(String.fromCharCode(arr[i]))
  }

  let n = 1
  while(n < 1000) {
    if (tmp[0] === '0') {
      tmp.splice(0, 1)
    }
    n++
  }

  answer = tmp.reduce(
    function(accu, value) {
      return accu + value
    })
  return answer
}

module.exports = add
