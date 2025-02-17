import { Response, NextFunction } from "express";
import jwt,{ JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "../config/env.ts"
import User from "../models/user.model.ts"
import { AuthorizeRequest } from "../types/authorizeRequest.ts";


const authorize = async (req:AuthorizeRequest, res:Response, next:NextFunction) =>{
    try{
        let token:string | undefined
        const authHeaders = req.headers.authorization
        if(authHeaders && authHeaders.startsWith("Bearer")){
            token = authHeaders.split(" ")[1]
        }
        if(!token) return void res.status(401).json({message: "Unauthorized"})
        const decoded = jwt.verify(token, JWT_SECRET as jwt.Secret) as JwtPayload;

        const user = await User.findById(decoded.userId)
        if(!user) return void res.status(401).json({message: "Unauthorized"})

        req.user = user
        next()
    }catch(error){
        return void res.status(401).json({message: "Unauthorized"})
    }
}


export default authorize