## 請說明 SQL Injection 的攻擊原理以及防範方法

1. 攻擊原理：

    1. injection 是透過插入一段程式碼讓語意改變的方式來攻擊，以生活上的解釋大概就是有人說「今天吃了超好吃的大」，結果中斷處有人插一個字「便」，之後原 po 才完成剩下的話語「腸包小腸」，聽起來就像是「今天吃了超好吃的大便」，用這種方式來達到攻擊效果。
    2. 正常的 SQL 語法： "SELECT * FROM users WHERE username = '$username' AND password = '$password'"
    3. 駭客會透過輸入框來插入一些程式碼，導致語意改變
    4. 被駭客插入後： "SELECT * FROM users WHERE username = ' `' or 1 = 1 --` ' AND password = 'abc'"
    5. 由於 1 = 1 是 true，而且 -- 是註解，可以無視後面的程式碼，所以 SQL 就會調出所有使用者的資料

2. 防範方法：

    1. Query Parameterization，先產生 Execution plan 再帶入使用者輸入的參數
        1. 由於資料庫不會把參數的內容視為 SQL 的一部分處理，是在完成 SQL 編譯後才套入參數，因此不會受到惡意程式碼攻擊

## 請說明 XSS 的攻擊原理以及防範方法

1. 攻擊原裡：

    1. 由於網站沒有驗證使用者的輸入，讓程式碼可以直接輸出到網頁上，讓點擊到該網頁的人被攻擊
    2. Reflective XSS：
        1. 在網址上插入`<script>?</script>`，可以透過轉址加上 document.cookie 來盜走他人的 cookie
    3. Store XSS：
        1.惡意的程式碼存在資料庫裡而不是當下被輸入的，留言內容可能有 `<script>?</script>` 標籤，只要連到留言板的人都會受到攻擊
    4. Dom-based XSS：
        1. 攻擊原裡與 Reflective XSS 類似，但 Dom-based XSS 只發生在 Client 端
        2. 網頁上有一些程式碼是比較不安全的，例如：eval()、innerHTML、onclick() ...等
    5. 是非常嚴重的網站漏洞，一旦有 XSS 漏洞，駭客的程式碼就會被視為和你的程式碼「同源」，因此所有防範駭客的邏輯也會被輕易的破壞

2. 防範方法：

    1. 先進行編碼，再輸出，把一些有危險的符號編碼，例如 < 會變成 &lt，要養成良好的程式撰寫習慣
    2. 盡量不要用過濾特定字元的方式來防禦，因為可能會有多層惡意字串的方式攻擊突破，除非真的是有讓使用者輸入程式碼的需求，不過即使是有公信力的函式庫還是有可能過濾不夠乾淨
    3. 瀏覽器加上 Header
        1. X-XSS-Protection: 1; mode=block
        2. Content-Security-Policy，且不要使用 unsafe-inline
        3. HTTP Only、secure，保護 cookie

## 請說明 CSRF 的攻擊原理以及防範方法

1. 攻擊原理：

    1. 駭客可以透過自己的網站做一些設計，比如說做一個心理測驗，有一個按鈕寫「開始測驗」
    2. 而這顆按鈕的實作是一個 submit，一按下去 form 就會 post 給購物網站說我要訂一台電腦（當然壞一點的還可以寫 `<script>` 來自動按 submit）
    3. 同源政策並不會阻擋 HTML 所發送的 request，跨來源的請求就這樣成功了
    4. 由於是使用者自己的電腦發送 request，所以瀏覽器也很貼心的就把同 domain 的 cookie 一起送去給購物網站，購物網站也認為是妳本人
    5. 訂完之後駭客因為不想讓你發現，所以把交易成功的訊息導到 `<iframe>` 並且設 display="none";，然後你心理測驗測完後覺得好準好準還會分享給你的親朋好友，大家就這樣不知不覺中各買了一台電腦
    6. 用 `<image>` 來發 HTTP GET request 也是很常見的方法

2. 防範方法：

    1. Synchronizer Token Pattern
        1. 設一個 CSRF token 放在 form 的隱藏欄位一併送出
        2. 或者設一個 CSRF token 放在 HEADER 的 meta 欄位，再用 JS 送出
        3. Server 端存放 CSRF token
    2. Double-Submit Cookie
        1. 同上，但 Server 端不存放 CSRF token．而是將 CSRF token 存在 cookie 裡面
    3. Triple-Submit Cookie
        1. 綜合了 Synchronizer Token Pattern 及 Double-Submit Cookie 的方法
        2. CSRF token 分為 name 及 value 分別存在 Server 與 Clint 端
    4. GET 的 API 設計要盡量簡單，不要涉及資料的更改（雖然這樣的防範並不完整，但可以避免部分攻擊）
    5. content type 不要設 application/x-www-form-urlencoded、 multipart/form-data 以及 text/plain（不過這並不是一個好方法，這只能擋住 form 的 request，但難保自己未來不會需要使用 form，這樣反而讓自己很不方便）
    6. 檢查 Referrer，這方法也不好，因為某些瀏覽器允許 JS 修改 Referrer 欄位，而且也不是所有網站都有 Referrer 欄位
