import { Request } from "express";
import { Document } from "mongoose";


export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    // 如果還有其他屬性，請在這裡定義
}

export interface AuthorizeRequest extends Request {
    user?: IUser;
}
