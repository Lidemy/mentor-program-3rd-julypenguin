# PostCSS

- PostCSS 可以把我們寫的 CSS 檔輸出成加工過的 CSS 檔，比如說有些 CSS 在不同的瀏覽器需加上一些前綴才能使用，但自己寫會花上很多時間，這個時候就可以透過 PostCSS 幫你自動修改好，而且因為輸出是 CSS 檔，所以可以直接讓瀏覽器讀取，很方便
- 體積很小，想要的功能自己掛上去就好了，使用上很有彈性，如果要說缺點的話大概就是要自己去找符合需求的 plugin 去做測試會比較花時間

### 使用方法 (以 Autoprefixer 為例)

- 最簡單的方法就是安裝 postcss-cli 去跑 Autoprefixer，可以先開一個資料夾把 CSS 檔丟進去，然後執行下面指令（外層的資料夾要先做好 npm init ）
`npm install postcss-cli autoprefixer`
`npx postcss *.css --use autoprefixer -d build/`
- 原本的 CSS 檔就會被轉成處理過的 CSS 檔並另存在 build 資料夾內
- 不過當然不可能每次改檔案都去 terminal 下指令轉換，這時候就可以請 Webpack 來幫忙
- 參考資料：[Autoprefixer](https://github.com/postcss/autoprefixer)

### 為什麼我們需要 PostCSS

- 可以節省很多寫 CSS 的時間
- 可以和 CSS 預處理器搭配使用，讓我們維護比較輕鬆
- 可以寫自己的 plugin
- 用標準的 CSS 語法來寫，所以哪一天真的瀏覽器都支援各種 CSS 時，只要把上述介紹的 plugin 拔掉就好了，很方便
