

## Feature
實施 Arcjet 偵測機器人並限制請求流量
實施 JSON Web Token 授權 

```
# "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2IxMjQyMjQzY2EwYWNjNTRhZDYxYjkiLCJpYXQiOjE3Mzk2NjU3OTYsImV4cCI6MTczOTc1MjE5Nn0.wOh6wontDUgsI-M6AjYsBCbftiYol3ID-edCXwqb7DI"
# 67b1242243ca0acc54ad61b9
```




POST `http://localhost:5500/api/v1/subscriptions`
```json
{

  "name": "Netflix Premium",
  "price": "480",
  "currency": "NTD",
  "frequency": "monthly",
  "category": "entertainment",
  "startDate": "2025-02-16T17:16:20.248Z", // new Date(toISOString())
  "paymentMethod": "Credit Card"
  
}
```