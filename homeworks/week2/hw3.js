function reverse(str) {
  var arr = []
  for (var i=0 ; i<str.length ; i++) {
    arr.unshift(str[i])
  }
  var reverse = arr.reduce( 
    function(accu, value){
      return accu + value
    })
  console.log(reverse);
}

reverse('hello')
