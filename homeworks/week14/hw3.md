## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？

DNS ( Domain Name System )
- 可以將域名直接轉換成 IP ，讓我們可以輸入看的懂的文字就好，不用背那一連串數字
- 就像電話簿一樣，把每個名子與數字（ip 位置）對應起來
- 如果 DNS 壞了還是可以輸入 IP 來連上網路

google 提供 DNS 的好處
- 可以知道每個網站的拜訪人次
- 透過上述訊息可以做廣告或提供其他服務來賺錢

對一般大眾的好處
- google 提供的 DNS 比較不會出現故障問題，更新也及時

## 什麼是資料庫的 lock？為什麼我們需要 lock？

資料庫的 lock
- transaction 的 隔離性 ( isolation )，讓多筆交易不會同時改到同一個值
- 你會覺得這個時候的資料庫是屬於你的
- 會有一點效能上的損耗

為什麼需要 lock？
- 如果沒 lock，以賣產品來舉例就是產品剩下 1 個的時候，如果這個時候突然有 2 個人同時下單有可能會發生同時成交的窘境，如果 lock 起來就會依順序先處理第一筆交易，完成後第二筆交易會因為看到剩餘數量為 0 而失敗，不會超賣。


## NoSQL 跟 SQL 的差別在哪裡？

NoSQL ( Not Only SQL )
- 沒有 schema，資料結構長的像 JSON ( key-value 資料型態)
- 無法使用 JOIN
- 使用 API 來操作資料
- 資料非常大時讀取速度較 SQL 快
- 擴充方便
- 會拿來存一些資料不固定的東西（像是 log）

SQL
- 有 schema，會用關聯的方式把資料切開
- 可以使用 JOIN 等複雜查詢
- 使用 SQL 語法操作資料
- 資料非常大時讀取速度慢


## 資料庫的 ACID 是什麼？

ACID 是資料庫寫入或更新資料時確保交易（transaction） 是可靠的，所具備的 4 種特性

1. 原子性 atomicity：
- 全部成功，否則全部失敗
- 今天去超商買東西，從架上拿了一瓶飲料之後去結帳，糟糕！錢不夠，這個時候店員應該要把飲料放回架上當作沒發生過，而不是成交一半。

2. 一致性 consistency：
- 當飲料買到後，超商的飲料會少一瓶，那瓶在我手上
  
3. 隔離性 isolation：
- 買東西就應該要排隊，當架上剩下一瓶飲料時，我拿走了我結帳就是我的，而不是同一瓶飲料一起拿、一起結帳（各付 1 瓶的錢），兩個人手都沒放開，但離開時 2 人手上都有一瓶飲料，架上變成負庫存（不合理阿 

4. 持久性 durability：
- 飲料買了就是我的，已經成交了不會被撤銷




## 部屬

- [部署 AWS EC2 遠端主機 + Ubuntu LAMP 環境 + phpmyadmin](https://github.com/Lidemy/mentor-program-2nd-yuchun33/issues/15)，寫的很清楚，基本上照著做就會成功了，除非一開始選東京，有些東西會灌不起來
- FileZilla
  - 要把協定改成 SFTP
  - 主機填 EC2 的 IPv4 Public IP
  - 登入方式選「金鑰檔案」
  - 使用者 ubuntu
  - 金鑰檔案按瀏覽選擇 .pem 的那個
  - 連上後去 /var/www/html 資料夾放檔案


## 超級挑戰題

對 Docker 完全不了解，查了一下發現還是不太了解，看到厲害同學 [ishin4554](https://github.com/Lidemy/mentor-program-3rd-ishin4554/pull/22/files) 有寫詳細的安裝流程所以想說來試試，於是就先下載 VirtualBox 和 ubuntu-18.04 的 Server 版試試，想說失敗只要砍掉就好 XD

跟連 EC2 一樣用 Git Bash 透過 SSH 進到我 VirtualBox 的 ubuntu-18.04，然後就照著指令貼
- 貼到第 25 行 $ sudo sed -i '$acomplete -F _docker docker' /etc/bash_completion.d/docker 會出現 sed: can't read /etc/bash_completion.d/docker: No such file or directory，我去資料夾也的確沒看到這個檔案
- 看了一下[官方文件](https://docs.docker.com/install/linux/docker-ce/ubuntu/)，一樣從頭開始安裝，一直安裝到 hello world 之後再回頭看 [ishin4554](https://github.com/Lidemy/mentor-program-3rd-ishin4554/pull/22/files) 第 41 行開始
- 第 61 行 $ docker ps 又卡住，出現 bash: docker: command not found，所以就先 $ exit 跳出去
- 之後試試 $ sudo docker run -d nickistre/ubuntu-lamp /bin/bash 會給一長串 ID
- 但 $ docker ps 一樣無法看到東西，只能用之前輸入過的 $ sudo docker images 看到，不過看到第 71 行說輸入完後會看到 root@disojoijfo:/#，咦？我剛剛在第 56 行的時候其實就看到了 XD，所以就直接跳到第 78 行繼續跟
- 第 89 行 apt install -y nginx php-fpm mysql-client mysql-server vim 會出錯，出現 Unable to locate package nginx，所以就先 apt-get update，再執行 apt install -y nginx php-fpm mysql-client mysql-server vim 就會成功
- 第 121 行 ‘<PASSWORD>’ 複製貼上後 ’ 會消失，要手動補上 ' '

- 好像都完成了，不過後來網路斷線就跳出來了（昏），不知道怎麼回去剛剛那裡，後來直接 $ sudo docker run -d -p 8800:80 --name webserver nginx 來安裝 nginx，$ sudo docker ps 看有在運行，不過連剛剛前面步驟看不到的 ubuntu 8080 port 都看到了，去 VirtualBox 設定一下 主機連接埠 8800 客體連接埠 8800，再去  http://localhost:8800 看到 Welcome to nginx! ，雖然沒完成，不過已經心滿意足了 XDDD，覺得沒有圖形會有一種抗拒感～
