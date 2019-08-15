# hw2：簡答題

### 1. 使用 CodeIgniter 之後跟原本寫純 PHP 有什麼不一樣的地方嗎？你比較喜歡哪一個？

- CodeIgniter 是 MVC 的框架，會把資料庫、畫面以及主要的程式邏輯拆開，之前在練習寫 Class 的時候就把 SQL 語法的部分拆開來寫了，所以 Model 體驗其實差不多，而畫面跟程式邏輯拆開來寫會覺得畫面乾淨很多，只要認真把 Controller 寫好就好了

- View 可以使用 form_helper 來寫表格很方便，不過都不使用 PHP 語法來寫 View 的話好像也用不到，而 form validation 可以自動幫我們做驗證很方便，但如果一開始不是傳 FormData 資料而是用 JSON 的話，之後做驗證時不只要改 JavaScript 還要改 model input 資料的寫法，要改很多有點小麻煩～

- 使用起來當然是比較喜歡 CodeIgniter，資料夾都幫我們建好了，還能自動化的載入東西真的滿方便的！
