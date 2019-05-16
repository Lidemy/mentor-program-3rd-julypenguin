## 什麼是 DOM？

- DOM 就像瀏覽器與 javascript 之間的溝通橋樑（提供 API）
- 可以用 javascript 來操作畫面上的 HTML 元素（也可以用其他語言）
- 一個網頁所有的元素組織在一起就構成一顆 DOM 樹

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

- 事件傳遞的順序是從父元素一路往子元素傳遞，當到達子元素後再往父元素一路傳遞回去，而這個機制就是捕獲與冒泡
- 冒泡：當子元素的事件發生後，一路往父元素傳遞，父元素也會被觸發（由下往上的傳遞）
- 捕獲：與冒泡相反，當子元素事件發生時，會由父元素一路往子元素傳遞（由上往下傳遞）
- 每一次事件發生的時候，捕獲與冒泡都會進行

## 什麼是 event delegation，為什麼我們需要它？

- event delegation 是事件代理，透過冒泡的機制可以在父元素設監聽就好，而不需要辛苦的在每個子元素都設下監聽，因為每個子元素事件觸發後都會冒泡回去父元素一路觸發
- 優點：可以減少監聽器數目
- 缺點：需要判斷哪些子節點是我們有興趣的，所以要寫一些程式碼做判斷

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

- event.preventDefault()：是把預設行為擋下來，但傳遞機制會持續

  - 原本 <a> 會有超連結的效果，設 preventDefault() 之後就無法超連結
  - 原本 <input type="submit"> 會有提交功能的按鈕，設 preventDefault() 之後就無法提交
  - 設 preventDefault() 之後雖然預設行為被擋掉了，但其他的程式碼還是會繼續執行，一樣會有傳遞機制

- event.stopPropagation()：預設行為不會被阻止，但可以停止事件的傳遞
  - 外層有 outerBox，往內有 innerBox，若是在 outerBox 上設 click 監聽、第三個參數設 true 及設 stopPropagation()，則點擊 innerBox 時會發現 Capture Phase 在 outerBox 就停住不會往下傳到 innerBox
  - 若 stopPropagation() 設在 innerBox 的 click 監聽，點擊 innerBox 之後會發現 Bubbling 不會向上傳遞到 outerBox，但會有 Capture Phase 的 outerBox 及 Target Phase 的 innerBox
