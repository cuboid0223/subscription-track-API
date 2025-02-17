import User from "../models/user.model.ts";
import { RequestHandler } from "express"
import { AppError } from "../types/error.ts";


export const getUsers: RequestHandler = async (req, res, next) =>{
    try{
        const users = await User.find()

        res.status(200).json({
            success: true,
            data: users
        })
    }catch(error){
        next(error)
    }
}

export const getUser: RequestHandler = async (req, res, next) =>{
    try{
        const user = await User.findById(req.params.id).select("-password") // 回傳user資料(但不顯示 pawword 欄位)
        if(!user) throw new AppError("查無此帳戶", 404)
        res.status(200).json({
            success: true,
            data: user
        })
        return;
    }catch(error){
        next(error)
    }
}