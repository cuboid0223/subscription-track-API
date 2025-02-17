
# 訂閱管理 API
使用 `express` + `node.js` 實作訂閱管理 API 

實作 `JWT` 認證、資料庫(`mongodb`)建模、API 架構、安全性(`Arcjet`)、自動化傳送訂閱到期信件(`Upstash workflow`)


## Feature
1. 實施 Arcjet 偵測機器人並限制請求流量
2. 實施 JSON Web Token 認證
3. 導入 Arcjet 機器人檢測、速率限制
4. 導入 Qstash workflow 自動化寄信

---
> 導入 Arcjet 機器人檢測、速率限制
![導入 Qstash workflow 自動化寄信](/public/image2.png)


## Image

>  導入 Qstash workflow 自動化寄信
![導入 Qstash workflow 自動化寄信](/public/image1.png)



## Example
(POST) `http://localhost:5500/api/v1/subscriptions`
```json
{

  "name": "Netflix Premium",
  "price": "480",
  "currency": "NTD",
  "frequency": "monthly",
  "category": "entertainment",
  "startDate": "2025-02-16T17:16:20.248Z",
  "paymentMethod": "Credit Card"
  
}
```