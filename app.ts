import express, { RequestHandler } from "express";
import { PORT } from "./config/env.ts"
import userRouter from "./routes/user.routes.ts";
import authRouter from "./routes/auth.routes.ts";
import subscriptionRouter from "./routes/subscription.routes.ts";
import connectToDatabase from "./database/mongodb.ts";
import errorMiddleware from "./middlewares/error.middleware.ts";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middlewares/arcjet.middleware.ts";
import workflowRouter from "./routes/workflow.routes.ts";


const app = express();

app.use(express.json()) //當收到 Content-Type 為 "application/json" 的請求時，它會自動解析 JSON 資料並把結果放到 req.body。
app.use(express.urlencoded({extended: false})) // 解析 Content-Type 為 "application/x-www-form-urlencoded" 的請求主體。
app.use(cookieParser() as RequestHandler) // 該函式會讀取請求標頭中的 Cookie 字串並把解析後的 key/value 資料放到 req.cookies
app.use(arcjetMiddleware as RequestHandler)


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)
app.use('/api/v1/workflows', workflowRouter)

app.use(errorMiddleware)

app.get("/", (req, res) => {
    res.send("www")
})



app.listen(PORT, async()=>{
    console.log(`跑在 http://localhost: ${PORT}`);

    // 連線至 mongodb
    await connectToDatabase()
})


export default app