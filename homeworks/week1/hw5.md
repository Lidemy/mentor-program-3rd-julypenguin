## 請解釋後端與前端的差異。
前端就是瀏覽器看的到的部分，寫了什麼字，畫面怎麼排這樣
後端就是我們看不到的東西，比如說資料庫

## 假設我今天去 Google 首頁搜尋框打上：JavaScri[t 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。
1. 按下 enter 後，瀏覽器會發一個 request 到 server
2. server 會跟資料庫存取資料
3. 存取完後會把資料丟回 server
4. server 處理完再送一個 response 回瀏覽器
5. 我們就會看到瀏覽器呈現出來的樣子了

## 請列舉出 5 個 command line 指令並且說明功用
1. git help：可以查看所有指令
2. git cherry-pick：可以撿某個分支來合併
  假如有個分支已經commit了很多次，由舊至新有 aaa111、bbb222、ccc333、ddd444 這 4 個版本編號了，但另一個分支只想要 ccc333 而不要前面的 aaa111、bbb222，也不要後面的 ddd444，可以直接 git cherry-pick ccc333，單獨把 ccc333 接過來
3. git blame：可以看到誰編輯的、版號還有編輯時間




