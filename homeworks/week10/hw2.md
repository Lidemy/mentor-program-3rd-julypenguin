# r3:0 異世界網站挑戰心得
有雷
有雷
有雷
有雷
有雷
有雷
有雷








## lv0 會拿到一個 token：r30:start

## lv1 透過 token 將怪物的名字轉成十八進位傳給 m3nt0r
怪物的名子：100101001001100001110
打開 devtool 輸入 `let binary = parseInt('100101001001100001110', 2)` 轉成看得懂的 10 進位，再輸入 `let answer = binary.toString(18)` 轉成 18 進位，輸入 `console.log(answer)` 會印出 "bad18"。

## lv2 請找出藏在畫面裡面的怪物並用 token 傳給女神
聽起來很像要看一下 CSS ，所以就打開 devtool 把 CSS 註解掉，出現 {divsurprise}

## lv3 請找出潛藏在瀏覽器中的第二個怪物
打開 devtool 把 CSS 全部註解，但沒發現什麼改變，console 也空空的，最後切到 Elements 看到 {commentfaker}

## lv4 token {tRaNspar3nT} 已經給你了
超坦白的說 token 已經給我了當然要試試阿 XD，結果貼上真的馬上過關，但網址變成 token=csspersona!，什麼巫術！？回頭看才發現原來有一個偽元素，不過如果沒注意看貼上了什麼好像也不會很注意這個，沒想到偽元素複製不到就這樣過關了 XDDD，算是誤打誤撞吧！

## lv5 找出跳關的把戲，得到 token
一進關卡網址就跳走了，上面描述也是說要找出跳關的把戲，老習慣先把 CSS 全部註解但沒發現任何東西，之後打開 devtool 找一下 referer 看一下上一個網址是什麼（想說會不會跳很多次），發現只有跳一次之後就再進一次 lv5，左手按 Enter 連網址，同時右手用最快的手速點 Sources 頁籤右邊的暫停鍵（Pause script execution），會先看到一個名稱 lv5.php?token=csspersona! 的檔案，裡面有 2 個 `<script>`，一個 kaspersky 、一個 js/lv5.js，所以就一直按 F10 按到 lv5.js 這個檔案跳出來，只有一行程式就直接把他註解掉，出現 {windowhack}，雖然聽起來很輕鬆，不過我好像也按了 3、4 次吧 ...|||，手速有夠慢。

## lv6 解出檔案裡面顏文字的秘密，或找到 window 裡面隱藏的 token 資訊。
打開 devtool 看一下，lv6.js 最下面放了一大堆顏文字完全看不懂 XDD，但還滿可愛的，馬上求救大賢者，大賢者說這是 aaencode，於是 google 了一下發現只要把最後一個 `('_')` 去掉也許就可以了，所以立馬把他貼到 console 裡面，出現
`ƒ anonymous(
) {
window.__IamToken = "emojicute"
}`
哈，真的很 cute

## lv7 找到放在包包深處的餅乾
cookie 有一個 TokenIsMe，真直白的名子 XDD，value=%7Bcookieyumyum%7D，結果貼上 token 直接 game over！把前後看起來有點對稱的字刪掉後剩 cookieyumyum 終於過關

## lv8 response 找出無頭騎士
這個比較單純，Headers 有一個 Tokenisme: {headshot}

## lv9 請解開留在 html 裡面的 php
這裡卡了一下，想說 html 裡的 php 我真的有辦法直接解開來測嗎？怎麼試都無法，如果直接打 `<?php>` 就會被註解，如果打 `&lt;? php ?&gt;` 就會被硬轉成字串輸出，很硬的那種，想自己加上 `"` 來限制瀏覽器的雙引號都完全沒辦法，後來想說直接用 JS 來抓，暴力一點多抓幾次，使用 `request.open()`、`request.send()`，結果回傳結果都跑出一樣的東西而且沒什麼內容 XDD （只有跳過對話那一些），最後束手無策好好的看公式想說些什麼，`if (strlen($token) !== 8) return false;`，所以 token 會有 8 個字，有夠長！不過 mentor03 不就剛好 8 個字嗎！？測試了一下結果 game over，又回來好好看公式寫些什麼，`(ord($token[$i]) * ord($token[$i - 1])) % $i !== 0`，8 位字串中，依順序每 2 個轉成 ASCII code 後的數字相乘，相乘結果依序除以 1、3、5、7 會整除，於是就 google 了一下 ASCII code，最簡單的找法當然就是 3、5、7 都可以整除的，所以看了一下只有 105 的 i，所以就輸入 token=iiiiiiii，看到破關畫面 XD，當然也可以輸入 token=NIGHTKFC，跟他說晚上吃肯德基一樣會過關 XD

## lv10 破關
因為這裡就沒有關卡了，很好奇的又呼叫了一次大賢者，大賢者叫我找找看公倍數 XD，應該是上一關的，能做出遊戲真的好厲害！感覺內容很用心，沒想到在前面衝刺還可以邊照顧我們這些後面的，感謝 Huli & minw 用心開發遊戲，覺得很好玩 XD

