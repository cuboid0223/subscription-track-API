import mongoose from "mongoose";


const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minLength: 2,
        maxLength: 100
    },
    price:{
        type: Number,
        required: [true, "Subscription price is required"],
        trim: true,
        min: [0, "價格必須大於 0"]
    },
    currency:{
        type: String,
        enum: ["USD", "EUR", "NTD"],
        default: "NTD"
    },

    frequency:{
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
        default: "monthly"
    },
    category:{
        type: String,
        enum: ["sports", "news", "entertainment", "lifestyle", "techology", "finance", "politics", "other"],
        required: true
    },
    paymentMethod:{
        type: String,
        required: true,
        trim: true
    },
    status:{
        type: String,
        enum: ["active", "cancelled", "expired"],
        default: "active"
    },
    startDate:{
        type: Date,
        required: true,
        validate:{
            validator: (value)=> value <= new Date(),
            message: "Start Date must in past"
        }
    },
    renewalDate:{
        type: Date,
        required: true,
        validate:{
            validator:  function(value){ return value > this.startDate},
            message: "Renewal date must be after the start date"
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    }


}, {timestamps: true})



subscriptionSchema.pre("validate", function(next){
    // 若無更新日期則 自動計算 更新日期
    if(!this.renewalDate){
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        }

        this.renewalDate = new Date(this.startDate)
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency])
    }

    
    // 當 renewalDate 過期時自動更新狀態
    if(this.renewalDate < new Date()){
        this.status = "expired"
    }

    next()
})




const Subscription = mongoose.model("Subscription", subscriptionSchema)

export default Subscription