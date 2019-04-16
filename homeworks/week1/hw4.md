## 跟你朋友介紹 Git

Git是一種版本控制系統，可以讓你的檔案回到指定時間點的狀態，你可以知道檔案的內容是怎麼做變化的，也可以知道每一行程式碼是誰寫的，現在就讓我教你怎麼寫吧！先到你放笑話的資料夾吧
  「輸入 `gti init`，初始化會建立一個.git 資料夾」
  「輸入 `git status`，可以看到 git 的狀態，會發現有很多的笑話檔案都在Untracked」
  「輸入 `touch .gitignore`，再輸入 `vim gitignore` 新增想忽略的檔案名子後存檔，可以讓某些被忽略」
  「輸入 `git add .`，可以一次把你這個資料夾下的笑話全集一次加進來」
  「輸入 `git status`，可以看到笑話檔案們進入 Change to be committed」
  「輸入 `git commit -m “init”`，就可以commit並且留下版本的 message」
  「輸入 `git log`，可以看到版本紀錄」
  「輸入 `git branch temb`，可以新增 temb 名稱的 branch」
  「輸入 `git branch -v`，可以看到現在有哪些 branch」
  「輸入 `git checkout temb`，可以控制 temb 這個 branch」
  「輸入 `git branch –m temp`，可以把剛剛打錯的 temb 改成 temp」

當temp分支檔案內容改變之後
  「輸入 `git status`，會看到改變的檔案在 Change not staged for commit」
  「輸入 `git diff`，你可以看到改變了什麼」
  「輸入 `git commit –am “add joke”`，可以把改變的檔案 commit 並留下 message」
  「輸入 `git checkout master` 再輸入 `git merge temp`，可以把 temp 分支 merge 到 master」
  「輸入 `git branch -d temp`，可以把 temp 分支刪掉」

在GitHub網站新增一個repository，假設名稱為gitTest
  「輸入 `git remote add origin https://github.com/julypenguin/gitTest.git`，再輸入 `git push -u origin master`，輸入名稱及密碼就能把檔案push到github」
  「輸入 `git pull origin master`，可以把 github 上的 master 下載下來，不過有更新再載就可以了，現在一樣新」

你發現我在 github 也有放笑話而且超好笑，快把你笑死，你可以偷偷進我的 github 然後按 Clone or download 複製網址
  「輸入 `git clone 網址`，可以把我整個笑話抓下來」，但我不想開權限給你修改，所以你要 fork 一份到你自己那，日後才能繼續做版本控制，祝你成為電視笑話冠軍囉

