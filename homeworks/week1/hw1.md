## 交作業流程

1. 開一個新 branch：`git branch hw1`
2. 切換到 branch：`git checkout hw1`
3. 寫作業：把作業完成並存檔
4. 將 hw1 修改的資料 commit：`git commit -am “write hw1”`
5. 上傳 github：`git push hw1`
6. Pull requests：按 Compare & pull request 按鍵，輸入作業標題及描述
7. 留 issue：在作業專用 repo 點 issues，依照格式寫標題及內文，在放上剛剛 Pull request 後的網址
8. merge：Huli看完後會merge到master，並把hw1這個branch刪除
9. 切換回 master：`git checkout master`
10. 把 merge 後的 master 下載下來：`git pull origin master`
11. 刪除 hw1：`git branch -d hw1`

