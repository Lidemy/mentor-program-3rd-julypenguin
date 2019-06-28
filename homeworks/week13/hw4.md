## Bootstrap 是什麼？

Bootstrap
- 是用 jQuery 寫的 library
- 如果 CSS 是化妝，那 Bootstrap 就是個懶人化妝包，已經把各種妝感設計好，喜歡哪一種就套用在上面就好
- 只要在 HTML 寫下規定好的 class 馬上就會換妝
- 如果大家都使用的話，大家的網頁看起來可能會大同小異
- 使用起來很省事，可以加速往頁開發


## 請簡介網格系統以及與 RWD 的關係

網格系統
- 將頁面切成很多欄，主流以 12 欄或 16 欄為主（因為版面較多是 2、3、4 欄式）
- 主要由 column 及 gutter 組成，gutter 為 2 個 column 間 padding（或是 margin）推出來的部分
- 藉由固定格子去切割版面來設計
- row 用 負的 margin 去減掉左右 2 邊多出來的 padding 就是一個理想的格線
- container 可以置中並設定 max-width，讓格子大小隨螢幕而改變，還會在左右設 padding，不會貼在螢幕邊緣

與 RWD 的關係
- 在不同裝置上可以透過格線系統將畫面從 4 欄式變成 3 欄式或 2 欄式，一樣是 12 格整整齊齊，但畫面會變的舒適好讀
- 格線系統運用在 RWD 上通常會設定多個斷點來調整畫面，例如 xs、sm、md、lg、xl


## 請找出任何一個與 Bootstrap 類似的 library

Pure.css


## jQuery 是什麼？

jQuery
- 是 javascript 的 library
- 將許多好用的程式碼打包成簡單的方式就能使用，像是 `document.querySelector()` 可以直接用 `$()` 來使用，非常方便
- 可以跨瀏覽器使用


## jQuery 與 vanilla JS 的關係是什麼？

jQuery 與 vanilla JS 的關係
- 2 個都是 javascript 的 library
- jQuery 提供許多輕便的功能
- vanilla JS 檔案裡面一個字都沒有，可以視為原生的 JS
- 雖然 jQuery 很方便，但底層運作一樣是使用 vanilla JS，許多 jQuery 沒提供的功能也是需要使用 vanilla JS 來完成
