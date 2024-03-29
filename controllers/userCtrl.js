const userModel=require('../models/userModel')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const doctorModel = require('../models/doctorModel')

//register callback
const registerController=async(req,res)=>{
    try{
        const existingUser=await userModel.findOne({email:req.body.email})
        if(existingUser){
            return res.status(200).send({message:`User Already Exist`,success:false})
        }
        const password = req.body.password;
        if (!password) {
            return res.status(400).send({ message: `Password is required`, success: false });
        }
        const salt = await bcrypt.genSalt(10);
        if (!salt) {
            return res.status(500).send({ message: `Error generating salt`, success: false });
        }

        const hashedPassword = await bcrypt.hash(password, salt);
        if (!hashedPassword) {
            return res.status(500).send({ message: `Error hashing password`, success: false });
        }
        req.body.password = hashedPassword
        const newUser=new userModel(req.body)
        await newUser.save()
        res.status(201).send({message:`Register Sucessfully`,sucess:true})
    }catch(error){
        console.log(error)
        res.status(500).send({sucess:false,message:`Register controller ${error.message}`})
    }
}
const loginController=async(req,res)=>{
    try{
        const user=await userModel.findOne({email:req.body.email})
        if(!user){
            return res.status(200).send({message:'user not fount',success:false})
        }
         const isMatch= await bcrypt.compare(req.body.password,user.password)
         if(!isMatch){
            return res.status(200).send({message:'Invalid Email or Password',success:false})
         }
         const token= jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
         res.status(200).send({message:'Login Sucessful',success:true,token})
    }catch(error){
        console.log(error)
        res.status(500).send({message:`Error in Login CTRL ${error.message}`})
    }
}
const authController=async(req,res)=>{
    try{
        const user=await userModel.findById({_id:req.body.userId});
        user.password=undefined;
        if(!user){
            return res.status(200).send({
                message:'user not found',
                success:false,
            })
        }else{
            res.status(200).send({
                success:true,
                data:user
            })
        }
    }catch(error){
        console.log(error)
        res.status(500).send({
            message:"auth error",
            success:false,
            error,
        })
    }
}

//Doctor ctrl
// Doctor ctrl
const applyDoctorController = async (req, res) => {
    try {
        const newDoctor = await doctorModel({ ...req.body, status: 'pending' });
        await newDoctor.save();

        const adminUser = await userModel.findOne({ isAdmin: true });
        const notification = adminUser.notification;

        notification.push({
            type: 'apply-doctor-request',
            message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a Doctor Account`,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastName,
                onClickPath: '/admin/doctors'
            }
        });

        await userModel.findByIdAndUpdate(adminUser._id, { notification });

        res.status(201).send({
            success: true,
            message: 'Doctor account applied successfully.',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error while applying for doctor',
        });
    }
};

//notification ctrl
const getAllNotificationController=async(req,res)=>{
    try{
        const user=await userModel.findOne({_id:req.body.userId})
        const seennotification=user.seennotification
        const notification=user.notification
        seennotification.push(...notification);
        user.notification=[]
        user.seennotification=notification
        const updatedUser=await user.save();
        res.status(200).send({
            success: true,
            message:"All notification marked as read",
            data:updatedUser,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            message:'Error in notification',
            success: false,
            error
        })
    }
}

//Delete notification ctrl
const deleteAllNotificationController=async(req,res)=>{
    try{
        const user=await userModel.findOne({_id:req.body.userId})
        //This code is written to check that user object is not null
        // if (!user) {
        //     return res.status(404).send({
        //         success: false,
        //         message: "User not found",
        //     });
        // }
        // user.notification=[]
        user.seennotification=[]
        const updatedUser=await user.save();
        updatedUser.password=undefined;
        res.status(200).send({
            success:true,
            message:"Notifications deleted successfully",
            data:updatedUser,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Unable to delete all notifications",
            error,
        })
    }
}

module.exports={loginController, registerController,authController,applyDoctorController,getAllNotificationController,deleteAllNotificationController}