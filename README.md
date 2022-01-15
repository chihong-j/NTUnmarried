# NTUnmarried — NTㄩㄇ
## 第 16 組
- 組員：
    - 電機四 B07901067 吳浩瑜
    - 資工五 B06303036 朱家慶
    - 工管四 B07701222 莊啟宏
### Deployed link: https://ntunmarried110-1.herokuapp.com/
### Demo link： https://youtu.be/ldpA3360Taw

## 介紹
台大生專屬的交友軟體，提供單身的台大學生進行交友媒合的服務。使用者可以設定自己的照片、個人資料、興趣等。頁面上會顯示其他與你相異性別的人，使用者可以點擊喜歡或是不喜歡，若雙方都向對方點擊喜歡，則會進行配對，就可以進一步地與配對到的使用者聊天。

## 功能說明：
### 註冊與登入
- 使用者可以使用台大信箱來進行註冊，此處並沒有連結真正的台大信箱來做驗證，只需要使用台大信箱作為帳號即可
- 密碼長度至少為 8，且包含至少一個英文字母
- 此處註冊與登入的密碼有進行加密處理，後端只會接收到加密過的密碼
### 修改個人資料
- 新的使用者登入後建議先到個人資料頁面上傳至少一張個人照片。若使用者沒有上傳任何照片，在配對畫面時會顯示一張預設的照片，上面有 `這個人沒有照片` 這些文字
- 可以隨時修改個人資料
### 配對
- 在首頁可以看到其他與你相異性別的使用者，可以對他人點擊喜歡或是不喜歡，已點擊過的人不會再次出現，因此請好好的考慮每一次的點擊！
- 若雙方都對對方點擊喜歡，則在通知頁面會自動產生一則 `某某人` 與你配對到的通知
### 聊天
- 雙方配對之後，會自動產生一個與該對象專屬的一對一聊天室，可以隨時與對方傳送訊息
### 登出
- 若要離開此服務，可以點擊登出

## 環境設置與執行方式：
### 後端設定
將 `backend` 中的 `.env.defaults` 複製一份並取名為 `.env`  
並在 `.env` 中填入以下的值：
- MONGO_URL：**mongodb 的 url**，填入自己的 MONGO_URL 進行測試
- SECRET：填入任意數字，e.g. `123`

### 更改 node.js 版本
由於在此系統中，上傳照片的功能只支援 node v12，而目前大多人使用的版本為 node v14，因此需要執行以下指令以更改 node.js 版本為 node v12（提醒：使用完這個系統之後，記得將自己的 node 版本轉為自己原本使用的 node 版本）
#### 若沒有安裝過 n，則需要先安裝 n，再將版本轉為 node v12 
```
npm install -g n
sudo n 12
``` 
#### 若已經有安裝過 n，則可以直接執行
```
sudo n 12
```
### 安裝套件
到 `frontend`、`backend` 兩個資料夾中分別執行
```
npm install
```
### 執行程式碼
#### 後端
在根目錄或是 `backend` 底下執行
```
yarn server
```
#### 前端
在根目錄或是 `frontend` 底下執行
```
yarn start
```
接著就可以開始使用服務，若要在本地端測試的話，可以註冊兩位以上不同性別的使用者，並且上傳照片，就可以享受配對與聊天的服務囉！


### 使用之第三方套件、框架、程式碼
#### 第三方套件、框架
- Frontend
    - React
    - apollo
    - antd
    - Material-UI
    - bcryptjs
    - reactstrap
- Backend
    - graphql-yoga
    - bcryptjs
    - jsonwebtoken
    - mongoose
    - dotenv-defaults
- Database
    - MongoDB
- Deploy
    - Heroku
#### 參考程式碼
- [Material-UI 登入、登出介面模板](https://mui.com/zh/getting-started/templates/)
    
### 專題製作心得
- 吳浩瑜
    - 第一次跟別人合作維護一個project，跟自己一個人寫專案是完全不同的體驗，需要非常頻繁的溝通來確定彼此的接口接得起來。中間也遇到很多次莫名其妙的bug，但這時團隊合作的好處就體現了，透過互相檢查彼此的code也比較容易找到盲點，很開心這學期0-100學會架設一個網站，雖然以後的工作不知道會不會跟這些相關，但我相信這也是一個相當有用的技能。
- 朱家慶
    - 我是負責後端的部分，滿多時間是花在查找資料，很多時候自己在playgorund 上面測試正確，但是連上前端之後會出現一些特殊的bug，也就是表示自己沒有考慮完整，這次期末專題的經驗讓我了解前後端的分工過程，是個難得的經驗。
- 莊啟宏
    - 在一學期之內從 0 開始學習了前、後端，最後在期末做出了一個自己還算滿意的 APP，雖然蠻累的，不過也挺有成就感的。在這一堂課以及期末報告中常常需要自己上網查各種資料來使用，有時候 debug 到快吐出來，不過還是修完了這門課，也做完了這份報告。不過結束了這門課之後，覺得挺不錯的，學到了很多東西，也做出了自己覺得有趣的網頁。

### 分工
- 吳浩瑜
    - Backend
    - Frontend
    - Deploy
- 朱家慶
    - Backend
    - Deploy
    - Demo
- 莊啟宏
    - Frontend
    - Demo

    