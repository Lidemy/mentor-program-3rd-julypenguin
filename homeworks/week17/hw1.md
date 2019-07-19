# Event Loop

``` javascript
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

- 會印出：
  - 1
  - 3
  - 5
  - 2
  - 4

1. 由於 javascript 是單執行緒，一次只能做一件事，所以程式碼是由最上面開始往下讀取，程式執行時會把 function 依序丟進 Stack 中，如果執行完畢就會被往外丟，如果還有呼叫其他 function 就會繼續往上堆疊，當最上面的執行完畢後就往外丟，所以第一步會把 `console.log(1)` 放到 Stack 中執行，印出 1，然後把 `console.log(1)` 給丟出去

2. 第二步會把 `setTimeout(() => { console.log(2) }, 0)` 放到 Stack 中，但這種非同步的 function 電腦不會等到他執行完後才開始工作，所以會先把它拉出來等倒數，當設定的 0 秒過後會進入 Queue 中排隊，等到 Stack 清空之後就會看一下 Queue 有沒有東西，這個時候 `console.log(2)` 才有辦法被執行，所以目前還在等待 Stack

3. 第三步會把 `console.log(3)` 放到 Stack 中執行，印出 3，然後把 `console.log(3)` 給丟出去

4. 第四步會把 `setTimeout(() => { console.log(4) }, 0)` 放到 Stack 中，Stack 會先把它拉出來等到數，當設定的 0 秒過後會去 Queue 排隊，目前是排在 `console.log(2)` 的後面

5. 第五步會把 `console.log(5)` 放到 Stack 中執行，印出 5，然後把 `console.log(5)` 給丟出去

6. 現在 Stack 已經清空了，透過 Event Loop 機制，Stack 會先把排在前面的 `console.log(2)` 帶進來執行，印出 2，然後把 `console.log(2)` 給丟出去

7. Stack 又空了，透過 Event Loop 機制，Stack 會先把 `console.log(4)` 帶進來執行，印出 4，然後把 `console.log(4)` 給丟出去
