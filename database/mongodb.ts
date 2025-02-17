import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.ts";


if(!DB_URI) throw new Error("請在.env 檔新增 DB_URI")


const connectToDatabase = async () =>{
    try{
        await mongoose.connect(DB_URI as string);
        console.log(`在 ${NODE_ENV} 模式下成功連線至 DB `);
    }catch(error){
        console.error("連線至 DB 錯誤",error);
        process.exit(1)
    }
}

export default connectToDatabase