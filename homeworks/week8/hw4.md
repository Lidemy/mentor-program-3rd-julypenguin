## 什麼是 Ajax？

Ajax (Asynchronous JavaScript And XML)，非同步的Javascript及XML
- 所謂的非同步就是指程式碼不會因為某一行需要等待就卡住，而是可以繼續往下執行，是一種一次可以做很多事情的感覺
  - 同步：聊天時會等對方回應再繼續聊
  - 不同步：跟對方說到家打給我，但我不用守在電話旁，我可以做其他事
  - setTimeout() 也是一種非同步的概念，不用等秒數到了才執行下面的程式碼，而是下一行的程式碼會繼續執行
- 用 Ajax 可以不需要更新整個頁面來取得有更動的資料 (畫面可以只有部分改變而已，不會有頁面整個重新讀取的感覺)
- 只要 javascript 和 server 用非同步的方式來交換資料都可以稱之為 Ajax


## 用 Ajax 與我們用表單送出資料的差別在哪？

- 表單送出資料會整個跑出一個新的畫面並將程式碼整個重新跑過
- Ajax 不會換頁，只會有部分畫面更動成新的

## JSONP 是什麼？

- JSONP 是一種交換資料的方式
- 由於受到同源政策的影響，存取資料時會受到阻礙，但 HTML 標籤中的 <script> 並不受到同源政策阻饒，因此可以透過 javascript動態產生的 JSON 資料來讓其他人存取資料 


## 要如何存取跨網域的 API？

有 2 個方法
1. 不要透過瀏覽器，直接使用 node.js 來 request 及接收 response
2. 若要使用瀏覽器，Server 必須在 response 的 Hearder 上加上 access-control-allow-origin，當瀏覽器收到 response 之後會檢查 access-control-allow-origin 的內容有沒有 request 的 origin，有的話程式就會順利接收到 response


## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

因為瀏覽器會管，有同源政策的限制
- 第四週是使用 node.js 來發送 request 及 接收 response，不會受到同源政策的影響
- 這週是使用瀏覽器來操作，雖然一樣會發送 request，而伺服器也會送 response 回來，可是瀏覽器只要看到你們不同源，也沒有 access-control-allow-origin 這個 Header，他就不會給你看 response 放了哪些東西