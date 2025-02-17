import { RequestHandler } from "express"
import mongoose from "mongoose"
import User from "../models/user.model.ts";
import { AppError } from "../types/error.ts";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.ts";


/*
session 是 Mongoose 提供的一個「客戶端會話」（Client Session）物件，
通常是透過 mongoose.startSession() 取得。
它主要用於處理資料庫交易（transaction），
允許你將一系列資料庫操作包裝在一個原子性操作中，要麼全部成功提交（commit），
要麼在發生錯誤時全部回滾（abort）。在這段程式碼中，你利用 session 開始了一個交易，
然後在 try/catch 區塊中決定提交或回滾交易，確保資料庫操作的一致性。
*/
export const signUp:RequestHandler = async (req, res, next) => {
    // 註冊
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const {name, email, password} = req.body
        if (!JWT_SECRET || !JWT_EXPIRES_IN) throw new AppError("JWT_SECRET is not defined", 500);
        const existingUser = await User.findOne({email})
        if(existingUser) throw new AppError("帳戶已註冊", 409);
      
        
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUsers = await User.create([{name, email,password: hashedPassword}],{session})

        const token = jwt.sign(
            {userId: newUsers[0]._id}, 
            JWT_SECRET, 
            {expiresIn: JWT_EXPIRES_IN} as SignOptions
        );
        session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: "帳戶創建成功",
            data: {
                token,
                user: newUsers[0]
            }
        })
    }catch(error){
        session.abortTransaction();
        session.endSession();
        next(error)
    }
}

export const signIn:RequestHandler = async (req, res, next) => {
    // 登入
    try{
        if (!JWT_SECRET || !JWT_EXPIRES_IN) throw new AppError("JWT_SECRET is not defined", 500);
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user) throw new AppError("無此帳號", 404)
        
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) throw new AppError("帳號或密碼錯誤", 401)
        const token = jwt.sign(
            {userId: user._id}, 
            JWT_SECRET, 
            {expiresIn: JWT_EXPIRES_IN} as SignOptions
        );

        res.status(200).json({
            success: true,
            message: "登入成功",
            data:{
                token,
                user
            }
        })
    }catch(error){
        next(error)
    }
}

export const signOut:RequestHandler = async (req, res, next) => {
    // 登出
}