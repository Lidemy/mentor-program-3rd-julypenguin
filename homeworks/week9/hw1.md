資料庫名稱：comments

| 欄位名稱    | 欄位型態     |    說明    |
|------------|--------------|-----------|
|  id        | integer      | 留言 id    |
| username   | VARCHAR(16)  | 帳號       |
| content    | TEXT         | 留言內容   |
| created_at | DATETIME     | 留言時間   |


資料庫名稱：users

| 欄位名稱    | 欄位型態     |    說明    |
|------------|--------------|-----------|
|  id        | integer      | user id   |
| username   | VARCHAR(16)  | 帳號      |
| password   | VARCHAR(16)  | 密碼      |
| nickname   | VARCHAR(64)  | 暱稱      |
| created_at | DATETIME     | 註冊時間   |


首頁：(index.php)
1. 輸入留言的 textarea
2. 顯示前 50 筆內容（users.nickname, comments.content）
3. 顯示留言時間 (comments.created_at)
4. 顯示留言以「新→舊」排序
5. 還未登入時 navBar 顯示"登入"及"加入會員" ，且無法留言
6. 登入時 navBar 顯示 "nickname" 及"登出"，可以留言
7. 留言資料會 post 給 handle_add_comment.php 處理

會員註冊：(register.php)
1. 輸入資訊
   - 暱稱 (nickname)
   - 帳號 (username)
   - 密碼 (password)
2. 沒輸入資料或輸入資料不完整就送出會跳出對話框，"請輸入帳號密碼"
3. 會員資料會 post 給 handle_register.php 處理

會員登入：(login.php)
1. 輸入資訊
   - 帳號 (username)
   - 密碼 (password)
2. 沒輸入資料就送出會跳出對話框，"請輸入帳號密碼"
3. 帳號或密碼錯誤會跳出對話框，"帳號或密碼錯誤"
4. 一個往會員註冊頁面的連結
5. 會員資料會 post 給 handle_login.php 處理

會員登出：(logout.php)
1. 就～登出(把 cookie 刪掉)

連線資料庫：(conn.php)
1. 連線資訊設定
