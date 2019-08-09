## 十六到二十週心得

### 第 16 週

- 這週開始學習使用 CSS 預處理器及 PostCSS，一開始覺得要把已經寫好的 CSS 改成 SASS 好麻煩，但實際開始寫了之後發現 @mixin 滿好玩的，感覺有點像在整理程式碼，而且因為很多 CSS 是自己習慣用的，寫好之後，未來我就只要複製貼上來使用就好，不過 CSS 預處理器目前只有先體驗 SASS 和 SCSS 而已，其他打算要使用到時再來研究

- PostCSS 一開始的體驗就很不錯，因為他不需要自己去改已經寫好的 CSS，在找怎麼使用的時候是先去 Google 搜尋 GitHub PostCSS Autoprefixer，輸入關鍵字很順利的就找到了，裡面也有說明要怎麼使用，照著輸入完之後就看到 CSS 被加上了前綴，真的是超級方便

- 這週還學了 Stack 和 Queue 兩種資料結構，在學的時候其實不太懂學這個是有什麼用途，難道只是把 push()、pop() 兩個詞濃縮為一個詞來講而已？一直到 17 週的 Event Loop 才了解原來是程式的運作方式，不過也是後來才知道原來 Stack 和 Call Stack 不一樣，不知道 Stack 還有什麼地方會使用到？

### 第 17 週

- 這週在學習 Event Loop 還有複習 scope、hoisting、closure、prototype、this，主要就是把一些原本觀念一直模模糊糊的東西做一個加強，很特別的是以前覺得這些東西很困難，雖然看過但沒辦法好好消化，這週竟然聽過就記得了！在寫作業的時候又強化了一次信心

- 這週的課程內容 + 作業感覺比較偏少，因為這是 17 週來第一次只花一天就把課程上完連同作業都一起寫完，不過交完作業之後再看挑戰題 [Dmitry Soshnikov 這個部落格](http://dmitrysoshnikov.com/) 的 ECMA-262-3 in detail 與 ECMA-262-5 in detail 這 2 個組題就花上很多時間，原本想好好看 [ES3 文件](https://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%203rd%20edition,%20December%201999.pdf)，不過內容實在太多了，最後就只有從已經學過的內建函式開始看起，再加減往下滑看還有什麼功能這樣，但裡面也有些看不懂原理的東西，比如說

>#### 15.2.4.2 Object.prototype.toString ( )
>
> When the toString method is called, the following steps are taken:
>
> 1. Get the `[[Class]]` property of this object.
> 2. Compute a string value by concatenating the three strings `"[object ", Result(1), and "]"`.
> 3. Return Result(2).

這樣就轉成字串了！？

### 第 18 週

- 這週學習 Gulp 和 Webpack，以前遇到陌生的東西很直覺的就是去 Google 看看別人都怎麼去描述它，但這週是從官網開始看，因為老師說影片是舊版的，實作請參考官方文件，而去官網之後發現有滿滿的範例，很多東西都可以直接把程式碼複製過來跑跑看其實真的滿不錯的

- 在寫 Gulp 的時候，打開 Gulp 官網首頁就差不多可以把作業完成了（概念大概都有寫到），覺得是一個很好上手的工具

- 而 Webpack 的功能就超級多，複雜度高上很多，了解 Webpack 所花的時間是 gulp 的好幾倍（Gulp 真的學超級快，從打開官網到完成作業也沒花到 1 小時），不過學會 Webpack 之後也覺得滿好用的，能 import 的感覺滿好的，而且很多功能 Webpack 都能包辦

- 這週也學習用 map 方法來 render 畫面，以前寫作業時都沒想到有這種用法，這次嘗試之後發現非常好用 XD，而且把資料和畫面拆開來寫 Todo List 感受真的很不一樣！

### 第 19 週

- 這週又重新把 [零基礎的小明要如何成為前端工程師？](https://medium.com/hulis-blog/frontend-engineer-guide-297821512f4e)、[跟著小明一起搞懂技術名詞：MVC、SPA 與 SSR](https://medium.com/@hulitw/introduction-mvc-spa-and-ssr-545c941669e9) 這 2 篇文章看過一次，前幾週在看這文章時覺得好像知道文章想說什麼，但是對於專有名詞很陌生，這週在看的時候體悟又更深了一點，尤其是對 SPA 這一塊，但是 MVC 還是很陌生，不過第 20 週時有查了一下資料，大概就是 Model 能跟資料庫溝通、View 能在畫面顯示東西、Controller 能跟 Model 要資料然後呈現給 View 這樣，感覺有點小複雜。

- 這週的作業分別要寫 Todo List API 和前端畫面，其實時間大多花在後端，但也發現自己之前寫的 class 滿好用的，檔案整個貼過來再稍微改個 SQL 就完成差不多了，剩下就只是要怎麼抓到 GET、POST、PATCH、DELETE 這些動詞而已，前端的部分就直接把上一週的作業貼過來再 Fetch 去抓個資料就結束了，覺得後端好像比較忙，要顧慮的東西很多，比如說我網址要怎麼設計，我要傳什麼資料給前端、還有 HTTP Status Code 要設計、資安問題要防護、資料輸入也要驗證格式是否正確，而前端感覺需要顧慮的東西就比較沒這個多了，只要專心把畫面呈現好這樣！

### 第 20 週

- 這週花很多時間在看課外書籍，想看看那些厲害的作者們到底是怎麼寫 code 的，希望能提升自己的寫 code 技巧，覺得寫 function 真的滿重要的，有些 code 雖然只有一行，但是單獨看的時候可能需要想一下他到底想表達什麼意思，但寫成 function 把名稱寫清楚就能大概猜出他是什麼意思，還有 for 迴圈我以前都會直接寫 `let i = 0` 當作開始，有第二層就會寫 `let j = 0` 當作開始，但如果變數可以取一些有意義的名子而不是 i 或 j 的話，下次回頭看很快就會理解了，還有一些使用 class 的時機還在消化當中

- 下週開始進入到框架，說真的滿期待的，去學習別人寫程式的智慧～
