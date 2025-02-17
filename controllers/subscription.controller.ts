import { Response, NextFunction } from "express";
import Subscription from "../models/subscription.model.ts"
import { AuthorizeRequest } from "../types/authorizeRequest.ts"
import { AppError } from "../types/error.ts";
import { SERVER_URL } from "../config/env.ts";
import { workflowClient } from "../config/upstash.ts";



export const createSubscription = async (req: AuthorizeRequest, res:Response, next:NextFunction) =>{
    try{
        if(!req.user) return void res.status(401).json({message: "Unauthorized"})

        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        })

        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body:{
                subscriptionId: subscription.id
            },
            headers:{
                "content-type": "application/json"
            },
            retries: 0
        })

        res.status(201).json({success: true, data:  { subscription, workflowRunId }})
    }catch(error){
        next(error)
    }
}


export const getUserSubscriptions = async (req, res, next) => {
    try{
        if(req.user.id !== req.params.id)throw new AppError("您非該帳戶擁有者", 401)
        
        const subscriptions = await Subscription.find({user: req.params.id})

        res.status(200).json({success: true, data: subscriptions})
    }catch(error){
        next(error)
    }
}