import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import moment from 'moment'; 

export const getStats= async(req, res)=>{
    const previousMonth = moment().month(moment()
        .month() - 1)
        .set("data", 1)
        .format("YYYY-MM-DD HH:mm:ss");
        console.log(previousMonth)
    // res.send(previousMonth)        
    try{
        const users = await User.aggregate([
            {
                $match: {createdAt: {$gte: new Date(previousMonth)}},
            },
            {
                $project: {
                    month: {$month: "$createdAt"}
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: 1}
                }
            }
        ]);
        console.log(users)
        res.status(200).send(users)
        
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

export const updateUser = async(req, res)=>{
    const id = req.params.id

    try{
        const updateUser = await User.findByIdAndUpdate(id, {$set: req.body}, {new:true})
        console.log(updateUser)

        res.status(200).json({success: true, message:'Successfully updated', data: updateUser})
    }   
    catch (error) {
        res.status(500).json({success: false, message:'Failed to update'})
    }
}

export const deleteUser = async(req, res)=>{
    const id = req.params.id

    try{
        await User.findByIdAndDelete(id);

        res.status(200).json({success: true, message:'Successfully deleted'})
    }   
    catch (error) {
        res.status(500).json({success: false, message:'Failed to delete'})
    }
}

export const getSingleUser = async(req, res)=>{
    const id = req.params.id

    try{
        const user = await User.findById(id).select("-password ");

        res.status(200).json({success: true, message:'User found', data: user})
    }   
    catch (error) {
        res.status(404).json({success: false, message:'User Not Found'})
    }
}

export const getAllUser = async(req, res)=>{

    try{
        const users = await User.find({}).select("-password ");

        res.status(200).json({success: true, message:'Users found', data: users})
    }   
    catch (error) {
        res.status(404).json({success: false, message:'Not Found'})
    }
}

export const getUserProfile  = async(req, res)=>{
    const userId = req.userId

    try {
        const user = await User.findById(userId)
        if(!user) {
            return res.status(404).json({success:false, message:'User not found'})
        }
        
        const {password, ...rest} = user._doc

        res.status(200).json({success:true, message: 'Profile info is getting', data:{...rest}})

    } catch (err){
        res.status(500).json({success: false, message:'Something went wrong, cannot get it'})
    }
};

export const getAdminProfile  = async(req, res)=>{
    const userId = req.userId

    try {
        const admin = await User.findById(userId)
        console.log(admin)
        if(!admin) {
            return res.status(404).json({success:false, message:'User not found'})
        }

        const {password, ...rest} = admin._doc

        res.status(200).json({success:true, message: 'Profile info is getting', data:{...rest}})

    } catch (err){
        res.status(500).json({success: false, message:'Something went wrong, cannot get it'})
    }
};

export const getMyAppointments = async(req,res)=>{
    try{
        //1. retrieve appointment from booking for specific user
        const bookings = await Booking.find({user:req.userId})

        //2. extract doctor ids from appointment bookings
        const doctorIds = bookings.map(ele=> ele.doctor)
        
        //3. retrieve doctors using doctor ids
        const doctors = await Doctor.find({_id: {$in:doctorIds}}).select("-password") 


        res.status(200).json({success:true, message:'Appointments are getting', data:doctors})
    } catch(err){
        res.status(500).json({success: false, message:'Something went wrong, cannot get it'})
    }
}

