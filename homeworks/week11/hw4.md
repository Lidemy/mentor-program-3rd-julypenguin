## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫

雜湊：
1. 無法逆向解出原始輸入（不可逆）
2. 會輸出固定字數，不論原文長短
3. 相同的字經過相同的雜湊函式會有相同的輸出
4. 可能出現「碰撞」，指不同的字用相同的雜湊函式產生相同的輸出

加密：
1. 加密需要密鑰，密鑰可以透過邏輯運算推演出來（可逆性）
2. 密鑰如果被破解，內文就會暴露出來

因為密碼極為重要，且密碼不應該被還原，除了自己以外不應該有任何人知道（包含資料庫的主人），如果是「加密」的方法，資料庫被入侵後，當密鑰被破解之後就會直接看到密碼，但如果使用「雜湊」，資料庫被入侵後只會取得一組亂碼，且因為不可逆的關係，駭客是不可能知道你原始密碼的。


## 請舉出三種不同的雜湊函數

1. MD5，已經不安全了
2. SHA-512
3. bcrypt


## 請去查什麼是 Session，以及 Session 跟 Cookie 的差別

Session
1. Server 端的一種機制，可以在 server 存想存的資訊
2. 像是一個名冊，記錄著每個 session_id 和使用者資訊的對應關係
3. 當用戶登入時，response 時可以在 cookie 中放入 session_id 傳給使用者
4. 可以用來記住登入者的身分，只要比對 Client 端 request 時帶上的 cookie，session_id 與 server 所存取的相符則認定是某個使用者
5. session_id 也可以用作為紀錄多少人造訪這個網頁（只要有人到這網頁，無論有沒有登錄都產生一組 session_id，看 session_id 的數量就可以知道有多少人來過）

Cookie
1. 存在 Client 端瀏覽器中
2. 用於存放資料


##  `include`、`require`、`include_once`、`require_once` 的差別

都可以引入指定的文件
- require：出錯時會停止程式執行，所以通常會放在 PHP 文件的最前面，一旦引入的文件有錯就只會顯示錯誤訊息而不會往後執行
- include：出錯時程式還是會繼續向下執行，所以當引入的 PHP 文件出錯時，顯示錯誤訊息後還是會繼續把未執行完的程式碼跑完
- include_once 及 require_once：各自功能與上述相同，但如果載入的文件有引入其他相同的文件則只會引入一次，不會重複引入
