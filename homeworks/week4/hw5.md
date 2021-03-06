## 請以自己的話解釋 API 是什麼
API (Application Programming Interface) 應用程式介面
- 是一種「介面」，能和別人換取資料的一個介面
- 因為資料庫不可能隨便給人進進出出找資料，也不可能讓別人隨便就擁有權限，所以會需要 API 來讓對方存取
- 在這個介面可以定義那些東西是可以給別人的，能對自己的資料庫做把控

## 請找出三個課程沒教的 HTTP status code 並簡單介紹
303：當 網站 暫時移到一個新的位置，會用 GET 再發一次請求到 Location 中的位置
307：當 網站 暫時移到一個新的位置，會用 原本的 POST / PUT / DELETE 再發一次請求到 Location 中的位置，與 303 的差異是 303 只能使用 GET 再發一次請求
401：需要驗證身分才能請求回應，像在做 twitch 作業時，如果不給他 Client-ID 他就會顯示 401 並拒絕你，把 Client-ID 填上正確的之後就可以了



## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

- 介紹
歡迎使用 julypenguin's 餐廳 API 文件，想掌握各分館名稱、地址、空位、菜單等詳細資訊那就要好好研讀我啦！

URL
https://api.julypenguin/api/restaurant

-說明文件
一、GET / 查詢
1. Detail
   好想知道 julypenguin's 餐廳現在所有分館的詳細資訊
2. Branch/number
   好想知道某個館的資訊
3. Menu/number
   客官來看菜單喔
4. Tables/number 
   沒座位也可以站旁邊唷

示範範例：
回傳 1 號餐廳資料
curl GET https://api.julypenguin/api/restaurant/branch/1

response:
{
  "id": 1,
  "館名": "別死阿小強",
  "地址": "新北市xxx區xxx路xx號1樓",
  "熱門餐點": "黯然銷魂飯",
  "來客人次": 9527
},
...


二、DELETE / 刪除
1. Branch/number
   餐廳如果倒了記得要刪，但我會復活的不要忘記我
2. Dishes/number
   可以刪掉某道菜，你是不是挑食

示範範例：
刪除 1號餐廳
curl DELETE https://api.julypenguin/api/restaurant/branch/1


三、POST / 新增
1. Branch
   新開分館囉，記得新增
2. Dishes
   可以新增菜餚，但要在項目上的唷，雖然我都會做

示範範例：
新增一個餐廳
curl -d '{"id": 5, "館名": "今晚打老虎"} -X POST https://api.julypenguin/api/restaurant/branch

四、PATCH / 更改
1. Branch/number
   改館名，但我通常將錯就錯
2. Dishes/number
   改菜餚，但也是要在項目上的唷

示範範例：
更改餐廳
curl -d '{"id": 5, "館名": "皮亞卡箱"} -X POST https://api.julypenguin/api/restaurant/branch/5






