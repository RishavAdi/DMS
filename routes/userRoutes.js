const express = require('express');
const {loginController,registerController,authController,applyDoctorController,getAllNotificationController,deleteAllNotificationController}=require('../controllers/userCtrl')
const authMiddleware=require('../middlewares/authMiddleware');



//router object
const router=express.Router()

//routes
//login||Post
router.post('/login',loginController)

//Register||Post
router.post('/register',registerController)


//Auth||Post
router.post('/getUserData',authMiddleware,authController)


//Apply Doctor|| Post
router.post('/applydoctor',authMiddleware,applyDoctorController);

//Notification doctor||Post
router.post('/getallnotification',authMiddleware,getAllNotificationController);

//Delete Notification ||Post
router.post('/deleteAllNotification',authMiddleware,deleteAllNotificationController);
module.exports=router;



