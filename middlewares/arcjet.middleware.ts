import aj from "../config/arcjet.ts"
import { Request, Response, NextFunction } from "express";

const arcjetMiddleware = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const decision = await aj.protect(req, {requested: 1});

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()) return res.status(429).json({error: "超出流量限制"})
            if(decision.reason.isBot()) return res.status(403).json({error: "偵測為機器人"})
            return res.status(403).json({error: "存取拒絕"})
        }
        next()
    }catch(error){
        console.log(`Arcjet Middleware Error: ${error}`);
        next(error)
    }
}

export default arcjetMiddleware