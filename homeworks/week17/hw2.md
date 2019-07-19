# Event Loop + Scope

```javascript
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

- 會印出：
  - 'i: 0'
  - 'i: 1'
  - 'i: 2'
  - 'i: 3'
  - 'i: 4'
  - 5
  - 5
  - 5
  - 5
  - 5

1. globalEC 編譯

    - `VO：{ i: undefined }`
    - `scopeChain: [globalEC.VO]`

2. globalEC 執行

    1. for 迴圈第 1 圈，i = 0
        - `console.log('i: 0')` 會進到 Stack 中執行印出 `'i: 0'`，然後被 Stack 丟出去
        - `setTimeout(() => { console.log(i) }, 0 * 1000)` 會進到 Stack 中，然後被拉出來等 0 秒後放到 Queue 中排隊
        - 執行 i++

    2. for 迴圈第 2 圈，i = 1
        - `console.log('i: 1')` 會進到 Stack 中執行印出 `'i: 1'`，然後被 Stack 丟出去
        - `setTimeout(() => { console.log(i) }, 1 * 1000)` 會進到 Stack 中，然後被拉出來等 1 秒後放到 Queue 中排隊
        - 執行 i++

    3. for 迴圈第 3 圈，i = 2
        - `console.log('i: 2')` 會進到 Stack 中執行印出 `'i: 2'`，然後被 Stack 丟出去
        - `setTimeout(() => { console.log(i) }, 2 * 1000)` 會進到 Stack 中，然後被拉出來等 2 秒後放到 Queue 中排隊
        - 執行 i++

    4. for 迴圈第 4 圈，i = 3
        - `console.log('i: 3')` 會進到 Stack 中執行印出 `'i: 3'`，然後被 Stack 丟出去
        - `setTimeout(() => { console.log(i) }, 3 * 1000)` 會進到 Stack 中，然後被拉出來等 3 秒後放到 Queue 中排隊
        - 執行 i++

    5. for 迴圈第 5 圈，i = 4
        - `console.log('i: 4')` 會進到 Stack 中執行印出 `'i: 4'`，然後被 Stack 丟出去
        - `setTimeout(() => { console.log(i) }, 4 * 1000)` 會進到 Stack 中，然後被拉出來等 4 秒後放到 Queue 中排隊
        - 執行 i++

    6. i = 5，不滿足 for 迴圈條件（i < 5），for 迴圈結束，這個時候 Stack 會去拉第一個 `console.log(i)` 進去執行，此時 i = 5，因此印出 5 並把 `console.log(5)` 丟出去

    7. 1 秒後第 2 個 `console.log(i)` 進到 Queue 排隊並被 Stack 拉進去執行，此時 i = 5，因此印出 5 並把 `console.log(5)` 丟出去

    8. 2 秒後第 3 個 `console.log(i)` 進到 Queue 排隊並被 Stack 拉進去執行，此時 i = 5，因此印出 5 並把 `console.log(5)` 丟出去

    9. 3 秒後第 4 個 `console.log(i)` 進到 Queue 排隊並被 Stack 拉進去執行，此時 i = 5，因此印出 5 並把 `console.log(5)` 丟出去

    10. 4 秒後第 5 個 `console.log(i)` 進到 Queue 排隊並被 Stack 拉進去執行，此時 i = 5，因此印出 5 並把 `console.log(5)` 丟出去

