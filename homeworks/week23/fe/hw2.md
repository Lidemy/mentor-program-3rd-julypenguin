## 為什麼我們需要 Redux？

- React 的資料傳遞是單向的，且是由父層傳遞給子層，如果一頭的子層要改變 props，而另一頭的子層要接收改變後的 props，這樣就必須一直把資料層層傳下去才行，非常麻煩，而 Redux 讓我們可以跨 Component 來傳送資料，而且有 reducer，只要 Dispatch 特定的 Action 就能完成修改資料的動作，非常方便

## Redux 是什麼？

- Redux 是一種設計模式，是將資料存到 store 裡面讓大家都能共用，每當收到 Action 之後 Reducer 會去修改 store 再呈現給需要資料的 Component

## Single Page Application 是什麼？有哪些頁面一定要用這個架構去設計嗎？

- SPA ( Single Page Application )，是一種不需要換頁就能改變 View 的技術，也因為不會看到全白的畫面，因此能增進使用者的體驗
- 如果有不想被中斷的服務就需要使用這個架構去設計，例如會播放音樂的網站

## Redux 如何解決非同步（例如說 call API 拿資料）的問題

- 可以使用 middleware 來發出非同步的 action，概念就是把非同步的 action 送到 next(action)
( 下週還有一模一樣的問題，不知道是不是這週忘記拿掉 XDD )
