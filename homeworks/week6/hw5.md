## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

1. 粗體：
- <b> 或語意化的 <strong>，直接在想要粗體的文字前後加上 <strong> </strong> 或 <b> </b>，不過建議用 <strong>，如果要使用 <b> 這樣沒含意的粗體不如直接用 CSS 來調整

2. 斜體：
- <i> 或語意化的 <em>，直接在想要斜體的文字前後加上 <em> </em> 或 <i> </i>，建議使用<em>，如果要使用 <i> 這樣沒含意的斜體不如直接用 CSS 來調整

3. 語意化的文章標籤
- <article>，網頁的頭用<header>、尾用<footer>，而文章可以用 <article> 來取代 <div>。

4. 空白
- &nbsp; ，<p>我要空 格</p>，會發現打再多空格都無法在網頁上空格，可以試試看 <p>我要空&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</p>，能達到空格效果

5. 畫一條水平線
- <hr>，在任何一個位置只要放上一個 <hr>，就可以畫一條線分離上下兩部份的水平線，也可以拿來當作設計



## 請問什麼是盒模型（box modal）

盒模型主要涵蓋了幾個東西，由內而外分別為 content、pandding、border、margin，而盒模型就是由這些的寬、高所組合而成的

1. content：盒模型的最內層，也是我們一開始設定內容 width、heigh 所顯示出來的區域
2. padding：內距，在 border 和 content 之間，會吃到背景色，所以當 padding 設定的越大時，視覺上也會覺得 content 好像長大了
3. border：邊框，在 margin 和 padding 之間，邊框會直接在 padding 外面加大，邊框設的越粗，content 看起來也會變得越大
4. margin：外距，盒模型的最外層，border 向外推的區域，這個區域不會吃到背景色

每次設定 content 時都要用預期的 width 和 height 去減掉 border 和 padding 的寬、高來算出正確的 content 大小，這麼做有點麻煩，因此可以把 box-sizing : content-box 改成 border-box，這樣 padding 和 border 所帶來的寬、高不會往外加，可以省去很多麻煩



## 請問 display: inline, block 跟 inline-block 的差別是什麼？

block：
1. 預設會撐滿一整行，撐好撐滿，如果用 width 設定成比較小一點會發現看到的部份的確會縮小，不過實際上它還是撐好撐滿
2. 沒有人可以跟他在同一行
3. 寬、高、margin、padding 都可以調整，隨心所欲

inline：
1. 會以橫排的方式排列，預設是由左而右，排滿會由上而下進到下一行
2. 寬、高會看內容多大就顯示多大，調寬、高也不會有所改變，不要白費力氣了！
3. 可以用 margin 調左右的邊距，用 padding 可以改變背景的高但不會影響其他元素的位置

inline-block：
1. 會以橫排的方式排列，預設是由左而右，排滿會由上而下進到下一行（與 inline）相同
2. 寬、高、margin、padding 都可以調整，隨心所欲（與 block 相同）
3. </div> 與 <div> 之間若有換行，水平相鄰之間會有 4 px 或 8 px 的空格（看瀏覽器）



## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

static：
1. 是預設的排版方式
2. 不會去找參考點做定位，而且也不會被特別定位

relative：
1. 會依照它自己原本的位置為參考點去做移動
2. 移動時不會改變其他元素的位置（只會蓋上去或被蓋掉）

absolute：
1. 會往上層找參考點（找不是 static 的元素），都找不到的話就只好跟著 <body> 走
2. 設 absolute 之後就不會在排版中排隊，像阿飄一樣，而原本排在後面的元素會補上位置

fixed：
1. 抓螢幕為參考點
2. 螢幕不管怎麼拉，它都在那個位置
