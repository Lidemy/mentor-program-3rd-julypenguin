## CSS 預處理器是什麼？我們可以不用它嗎？

- CSS 預處理器就是一種使用預處理器語法來寫 CSS，會讓整個 CSS 整體可讀性變高且更好維護，而且還可以使用變數、mixin、巢狀、繼承等功能，使用上非常方便
- 有時候要改變很多字體或背景顏色時，雖然可以透過搜尋一個一個改但很麻煩，使用預處理器就可以直接設定變數來改就好了
- 可是瀏覽器看不懂 CSS 預處理器的語法，所以我們一樣需要把它轉成 CSS，我們當然也可以不使用 CSS 預處理器直接寫 CSS，因為 CSS 才是瀏覽器所認識的

## 請舉出任何一個跟 HTTP Cache 有關的 Header 並說明其作用。

- Cache 新鮮度：
  - Expires
    - 作用：
      - 可以設定 Cache 到期的時間，每次瀏覽器在造訪相同頁面時會去比對 Cache 有沒有過期
      - `Expires: Wed, 21 Oct 2017 07:28:00 GMT`
    - 缺點：
      - 若是把電腦時間設到有效時間之後就會被當作是過期，瀏覽器會重發 request

  - Cache-Control
    - 作用：
      - 可以用 max-age 直接設定 Cache 再過多久時間會過期
      - `Cache-Control: max-age=30` 就是再過 30 秒才會過期
      - max-age 可以把 Expires 給蓋過去
      - `Cache-Control: no-store`，就是不要任何 Cache，每次都必須 request 去要資料
      - `Cache-Control: no-cache`，每次都發 request 去確認檔案有沒有更動，只有在更動時才會載資料
    - 缺點：
      - max-age 無法判斷檔案有沒有更新過，只能等過期

- Cache 過期後判斷是否繼續使用
  - Last-Modified 與 If-Modified-Since
    - 作用：
      - Server 在 response 時的 Header 加上 Last-Modified 會告訴 Client 端上次修改是什麼時間
      - Cache 過期後，瀏覽器發送 request 加上 If-Modified-Since 這個 Header 去拿這個修改時間之後更改過的檔案
    - 缺點：
      - 就算沒有編輯內容，但只要存檔時間有更新，就會被判定為新的檔案

  - Etag 與 If-None-Match
    - 作用：
      - 當檔案真的有變動時才需要重新發送 request
      - response 的 Header 會帶上檔案的 Etag，當 Cache 過期時瀏覽器會發送 If-None-Match 去問 Server 有沒有更動過（帶著 Etag 讓 Server 確認檔案有沒有更動過）

- 使用 Cache，但又希望有更動時瀏覽器會發送 request 去更新的方法
  - `Cache-Control: max-age=0` 搭配 `Etag`，每次都發送 request 去確認檔案有沒有更動
  - `Cache-Control: no-cache`，原裡和上面方法很相似

- 讓 SPA 網頁架構不要每次都發 request，但更新時能馬上更新
  - index.html 的 Cache 設 `Cache-Control: no-cache`，讓它每次檢查
  - 讓 JavaScript 檔名帶有這個檔案的 hash 值（如同 Etag 一樣），Cache 設 `Cache-Control: max-age=31536000`，讓他一年後才過期，這之間若 JavaScript 有更動就直接更新 index.html 換一個 JavaScript 檔案（CSS 的做法也相同）


[參考資料](https://blog.techbridge.cc/2017/06/17/cache-introduction/)

## Stack 跟 Queue 的差別是什麼？

- Stack 是把東西往上放，一層一層往上疊，當要取出時也是從最後放的開始取出，就是最早放進去的那個會最後才拿到的意思（First In, Last Out），感覺有點像是餐廳疊盤子，由下往上一層一層疊好，使用時從最上面開始取用
- Queue 一樣是把東西一層一層往上疊，但是取出時是從最比較早放進去的那個開始取出，意思就是最晚放進去的那個一定會最晚被取出，有點像食物儲存原則，先進的要先出才新鮮（First In, First Out）

## 請去查詢資料並解釋 CSS Selector 的權重是如何計算的（不要複製貼上，請自己思考過一遍再自己寫出來）

- 權重計算
  - 權重 0-0-0-0：
    - `*`
    - `+`、`>`、`~`
  - 權重 0-0-0-1：
    - `<div>`、`<ul>`、`<li>`、`<a>`、`<p>`、`<h1>` 等 Element
    - `:before`、`:after` 等偽元素
  - 權重 0-0-1-0；
    - Class
    - `:hover`、`:nth-child` 等偽類
    - `[type=email]` 等屬性選擇器
  - 權重 0-1-0-0：
    - Id
  - 權重 1-0-0-0：
    - Inline style，指的是在 Element 裡寫的 CSS
  - 權重 1-0-0-0-0：
    - !important

- 權重判斷
  - 越左邊數字越大的，權重就越重，因此權重大小是 `!important` > `inline style` > `Id` > `Class` > `Element` > `*`
  - 權重高的會蓋過權重低的
  - 權重可以相加，因此像是 `.app > ul > li` 就會是 0-0-1-2，只要能指定的越詳細越精確權重就會越大
  - 當遇到權重相同時，後寫的會蓋過先寫的 CSS
