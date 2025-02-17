
import dayjs from "dayjs"
import { emailTemplates } from "./email-template.ts"
import transporter, { accountEmail } from "../config/nodemailer.ts"

export const sendReminderEmail = async ({to, type, subscription}) =>{
    if(!to || !type) throw new Error("缺少必要參數")
    const template = emailTemplates.find( t => t.label === type)
    if(!template) throw new Error("沒有此信件模板")
    
    const mailInfo = {
        userName: subscription.user.name,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.renewalDate).format("MMM D, YYYY"),
        planName: subscription.name,
        price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
        paymentMethod: subscription.paymentMethod
    }

    const message = template.generateBody(mailInfo)
    const subject = template.generateSubject(mailInfo)

    const mailOptions = {
        from: accountEmail,
        to: to,
        subject: subject,
        html: message
    }

    transporter.sendMail(mailOptions, (error, info) =>{
        if(error) return console.log(`ERROR sending email, ${error}`);
        console.log(`郵件寄出:  ${info.response}`);
    })
}