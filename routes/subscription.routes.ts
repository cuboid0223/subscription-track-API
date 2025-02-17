import { Router } from "express";
import authorize from "../middlewares/auth.middleware.ts";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.ts";


const subscriptionRouter = Router()



subscriptionRouter.get("/", (req,res)=>{
    res.send({
        title:"GET all subscriptions"
    })
})

subscriptionRouter.get("/:id", (req,res)=>{
    res.send({
        title:"GET subscription detail"
    })
})

subscriptionRouter.post("/", authorize, createSubscription)

subscriptionRouter.put("/:id", (req,res)=>{
    res.send({
        title:"UPDATE subscription"
    })
})

subscriptionRouter.delete("/:id", (req,res)=>{
    res.send({
        title:"DELETE subscription"
    })
})

subscriptionRouter.get("/user/:id", authorize ,getUserSubscriptions)

subscriptionRouter.put("/:id/cancel", (req,res)=>{
    res.send({
        title:"CANCEL subscription"
    })
})

subscriptionRouter.get("/upcoming-renewals", (req,res)=>{
    res.send({
        title:"GET upcoming renewals"
    })
})



export default subscriptionRouter