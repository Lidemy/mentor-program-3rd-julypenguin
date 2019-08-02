# API 文件

Base URL: http://julypenguin.tw/week19/api.php

| 說明        | Method | path  |   參數                                   |
|-------------|--------|-------|-----------------------------------------|
| 獲取所有Todo | GET    |   /   | 無                                      |
| 獲取單一Todo | GET    | /:id  | 無                                      |
| 新增Todo     | POST   |   /   | content: 內容                           |
| 刪除Todo     | DELETE | /:id  | 無                                      |
| 編輯Todo     | PATCH  | /:id  | content: 內容、state: -1 未完成、 1 完成 |

## 範例

### 獲得所有 Todo

`curl -X GET http://julypenguin.tw/week19/api.php`

### 獲得 id = 6 的 Todo

`curl -X GET http://julypenguin.tw/week19/api.php/6`

### 新增 Todo

`curl -X POST http://julypenguin.tw/week19/api.php -i -H "Content-Type:application/json" -H "Accept:application/json" -d '{"content" : "week19"}'`

### 刪除 id = 6 的 Todo

`curl -X DELETE http://julypenguin.tw/week19/api.php/6`

### 編輯 id = 6 的 Todo 內容並改為完成

`curl -X PATCH http://julypenguin.tw/week19/api.php/6 -i -H "Content-Type:application/json" -H "Accept:application/json" -d '{ "content" : "week19 done", "state" : 1 }'`
