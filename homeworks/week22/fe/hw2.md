## React Router 背後的原理你猜是怎麼實作的？

- HashRouter：利用 hashtag 不會換頁的特性，監聽 onhashchange 事件，再透過 window.location.hash 來讀取 # 後面的值
- BrowserRouter： 使用了 HTML5 history API (pushState, replaceState, popState) 來使內容隨 Url 改變而改變

## SDK 與 API 的差別是什麼？

- API：Application Programming Interface，定義方法讓其他的人可以取用內部的資料或資源，只要依照使用規則就可以使用資料
- SDK：Software Development Kit，協助建立或測試應用程式的套件，通常會包含許多組的 API。

## 在用 Ajax 的時候，預設是不會把 Cookie 帶上的，要怎麼樣才能把 Cookie 一起帶上？

- 只要在 Ajax 發出的 request 帶上 withCredentials: true 就可以了，不過 server 端也需要開 Access-Control-Allow-Credentials 權限
