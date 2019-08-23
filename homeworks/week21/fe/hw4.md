## 為什麼我們需要 React？可以不用嗎？

- React 透過組件化讓網站更好維護，而且資料都存在 state 當中，只要 state 改變畫面就會跟著改變，不需要像 jQuery 一樣把每一個 DOM 和資料綁的緊緊的，不會因為 HTML 標籤的變動就導致畫面壞掉，還有多種 import CSS 的方法，如果使用模組化的 CSS 就不用怕引入別人的 CSS 撞名的問題，一開始覺得使用 React 卡卡的，但多使用幾次之後就會愛上了

- 當然可以不使用囉，這週以前都沒使用框架也是完成了許多的網頁，但如果大家都熟悉這套框架的話，一起使用可讀性應該會高很多？

## React 的思考模式跟以前的思考模式有什麼不一樣？

- React 就是把所有的資料都存在 state 當中，我們只要關注 state 的改變就好，state 會自己幫我們把畫面 render 出來，這樣的思考模式可以讓我們維護起來更簡單

- 以前的思考模式就是要想辦法抓到 DOM 元素，抓到 DOM 元素後再把資料塞進去，然後還要自己 render 出來，一開始寫起來會覺得滿直覺的，因為我就是要在畫面那個位置塞東西進去，但如果專案很大的話就會很難改東西

## state 跟 props 的差別在哪裡？

- state 就是自己這個 component 的資料，可以直接使用 setState 來修改
- props 是子層收到父層傳來的東西，但 props 無法直接修改，如果要改必須透過父層傳來的 Method 來修改父層的 state

## 請列出 React 的 lifecycle 以及其代表的意義

- 常用生命週期
  - Constructor：組件誕生時第一個執行的函式，使用時一定要呼叫 `super()`，綁定 this 可以在這個時候綁
  - Render：把資料轉成視覺畫面，這裡不可以使用 `this.setState()`，會有毀滅性的效果
  - componentDidMount：component 掛載時會執行一次的生命週期
  - componentDidUpdate：只要 state 改變就會執行的函示
  - componentWillUnmount：component 要離開時會啟發的函式，通常拿來取消偵聽、timeout...等

- 較不常用生命週期
  - getDerivedStateFromProps：剛掛載的時候會執行，每一次組件更新也會執行，執行順序在 Constructor 和 shouldComponentUpdate 之間
  - shouldComponentUpdate：用在控制組件要不要更新，如果是 ture，componentDidUpdate 才會執行
  - getSnapshotBeforeUpdate：可以記錄 update 之前，頁面 DOM 的狀態
