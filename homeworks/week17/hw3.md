# Hoisting

``` javascript
var a = 1
function fn(){
  console.log(a) // undefined
  var a = 5
  console.log(a) // 5
  a++
  var a
  fn2()
  console.log(a) // 20
  function fn2(){
    console.log(a) // 6
    a = 20
    b = 100
  }
}
fn()
console.log(a) // 1
a = 10
console.log(a) // 10
console.log(b) // 100
```

- console.log(a)
  - 第 1 個是 undefined
    - 首先 fn() 先被呼叫
    - 接著尋找 `function a` 但沒找到
    - 接著找 argument 也沒有 a
    - 最後發現有宣告 var a，因此目前的 a 是 undefined
  - 第 2 個是 5
    - 依照程式碼執行順序，遇到 a 被賦值為 5
  - 第 3 個是 fn2 裡的 6
    - 依照程式碼執行順序，fn() 的 a 先被 +1，變成 6
    - fn2() 裡面沒發現 `function a`，也沒有 `function b`
    - argument 也沒有 a 和 b
    - 也沒有宣告 var a，因此 a 是上一層 fn() 的 a 值，為 6
    - 這裡的 b 被賦值，因此往上一層 fn() 找 b，但沒找到，再往上一層 global 找 b，這時會找到 fn2() 編譯階段時在 global 宣告的 var b
  - 第 4 個是 20
    - 因為 fn2() 的 a 與 fn() 是共用的，因此 a 在剛剛被 fn2() 已經被賦值為 20
  - 第 5 個是 1
    - var 的作用域是 function 或 global，因此只要在 global 中找 a 不需要考慮 function 裡的 a
    - 先尋找 `function a` 但沒找到
    - 所以 a 是最一開始的 1
  - 第 6 個是 10
    - 依照程式碼執行順序，global 的 a 會被賦值為 10

- console.log(b)
  - 這個 b 在 fn2() 時有在 global 宣告 var b 並且賦值為 100，因此會印出 100
