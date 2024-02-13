const mongoose = require('mongoose')

const doctorSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'First Name is required']
    },
    lastName:{
        type:String,
        required:[true,'Last Name is reauired'],
    },
    phone:{
        type:String,
        required:[true,'Phone is required'],
    },
    email:{
        type:String,
        required:[true,'Email is required'],
    },
    website:{
        type:String,
    },
    address:{
        type:String,
        required:[true,'Address is required'],
    },
    specialization:{
        type:String,
        required:[true,'Specialization is required'],
    },
    experience:{
        type:String,
        required:[true,'Experience is required'],
    },
    feePerConsultation:{
        type:Number,
        required:[true,'Fee per visit is required'],
    }, 
    status:{
        type:String,
        default:"pending",
    },
    timings:{
        type:Object,
        required:[true,'Timings is required'],
    }
},{timestamps:true})
const doctorModel=mongoose.model('doctor',doctorSchema);
module.exports=doctorModel;