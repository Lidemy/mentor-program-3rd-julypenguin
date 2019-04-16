## 教你朋友 CLI

Command line 是操作電腦的一種方法，他不像我們熟悉的圖形化介面（GUI）用滑鼠點一點就能操作，這是一種文字視窗，透過下指令的方式來操作電腦。
- 好處是：要用的功能都可以簡單快速的打出來
- 壞處是：要記指令，沒這麼直覺
既然你誠心誠意的發問了，我就教你 command line如何使用吧！首先， windows 系統先去下載 cmder full版，Mac 的話可以用 terminal 就好，你看看我輸入的結果：
  「輸入 `pwd`，就知道你現在的路徑在哪裡」
  「輸入 `ls -al`，就能詳細看到資料夾下面有哪些檔案和資料夾，你看有個叫 test的資料夾」
  「輸入 `cd test`，就進到 test 資料夾內了」
  「輸入 `touch index.html`，就建立了一個 index.html 檔案」
  「輸入 `cp index.html hello.html`，就複製了一個和 index.html 一樣的 hello.html 出來了」
  「輸入 `mkdir temp`，就建立了一個 temp 資料夾」
  「輸入 `mv index.html temp`，index.html 就被放到 temp 資料夾」
  「輸入 `vim hello.html`，會進到編輯器，按 i 之後開始編輯，按 ESC 回到一般模式，要離開時想存檔就按 :x 或 ZZ，不想存檔就按 :q! 或 ZQ ，我都按ZZ或ZQ，先輸入幾行字後按 ZZ 給你看」
  「輸入 `cat hello.html`可以直接檔案裡面的字直接印出來」
  「輸入 `grep t hello.html` 可以把 hello.html 裡面有 t 字的那行都印出來」
  「輸入 `echo 123`可以印出 123」
  「輸入 `echo 123 > num`，可以新增一個檔案 num ，並寫入 123」
  「輸入 `cat hello.html | grep t`，就能印出所有 hello.html 文字並把t抓出來」
  「輸入 `rm hello.html`，就把 hello.html 檔案刪除了」
  「輸入 `rm -r temp`，就可以把temp資料夾刪掉」
  「輸入 `clear`，你的畫面就會變得很乾淨」

所以你想要建立一個叫做 wifi 的資料夾，並且在裡面建立一個叫 afu.js 的檔案，很簡單，3 步驟就完成了
1. 「輸入 `midir wifi`，建立 wifi 資料夾」
2. 「輸入 `cd wifi`，進到 wifi 資料夾」
3. 「輸入 `touch afu.js`，建立 afu.js 檔案」
簡單吧~其實你剛剛已經把平常你會用的都學起來了

