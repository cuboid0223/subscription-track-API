import { createRequire } from "module"
import Subscription from "../models/subscription.model.ts"
import dayjs, { Dayjs } from "dayjs"
import { sendReminderEmail } from "../utils/send-email.ts"
const require = createRequire(import.meta.url)
const {serve} = require("@upstash/workflow/express")
// import { serve } from "@upstash/workflow/express"

const REMINDERS = [7, 5, 2, 1]

export const sendReminders = serve(async (context)=>{
    const {subscriptionId} = context.requestPayload
    const subscription = await fetchSubscription(context, subscriptionId)

    if(!subscriptionId || subscription.status !== "active") return
    const renewalDate = dayjs(subscription.renewalDate)
    if(renewalDate.isBefore(dayjs())){
        console.log(`已過訂閱到期日 (${subscriptionId}) 停止 workflow`);
        return
    }
    for(const daysBefore of REMINDERS){
        const reminderDate = renewalDate.subtract(daysBefore, "day")
        // 如果該提醒日期還未到達（即仍在未來），先調用 sleepUntilReminder 讓流程暫停等待到指定時間。
        if(reminderDate.isAfter(dayjs())){
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate)
        }
        if( dayjs().isSame(reminderDate, "day")){
            await triggerReminder(context, `${daysBefore} days before reminder`, subscription)
        }
    }



})

const fetchSubscription = async (context, subscriptionId: string) =>{
    return await context.run("get subscription", async () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email') //只取 name 與 email
    })
}

const sleepUntilReminder = async (context, label: string, date :Dayjs) =>{
    console.log(`Sleeping until ${label} reminder at ${date}`);

    await context.sleepUntil(label, date.toDate())
}

const triggerReminder = async(context, label: string, subscription) => {
    return await context.run(label, async () => {
        console.log(`Triggering ${label} reminder`);
        // 寄信
        await sendReminderEmail({
            to: subscription.user.email,
            type: label,
            subscription
        })
    })
}