import Booking from "../models/BookingSchema.js";
import Doctor from '../models/DoctorSchema.js'
import User from '../models/UserSchema.js'
import moment from 'moment'; 
// import Stripe from 'stripe';
// const stripe = Stripe(process.env.SECRET_STRIPE_KEY);
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51Nn1CqBiVEj2MdDU7mkyeors2mj34eB96aajsVJvbofA1g6mIRTWVs26uCPkGaZ7uqaFs3W4vxp5YdZsDmmH7eHq00f9CkjtP7');

export const createStripe = async(req, res)=>{
    if(!req.body.doctor) req.body.doctor = req.params.doctorId 
    if(!req.body.user) req.body.user = req.userId
    const newBooking = new Booking(req.body)
   
    const doctor = await Doctor.findById(req.params.doctorId )
    // const newBooking = new Booking(req.body)
    console.log(doctor) 
    console.log(process.env.SECRET_STRIPE_KEY)
    console.log(newBooking.ticketPrice)
    try {
        const savedBooking = await newBooking.save()
        // console.log(savedBooking._id)
        const doc = await Doctor.findByIdAndUpdate(req.body.doctor,{
            $push: {appointments: savedBooking._id}
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: doctor.name,
                            images: [doctor.photo]
                        },
                        unit_amount: (newBooking.ticketPrice)*100,
                    },
                    quantity: 1, 
                }
            ],
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",
            })
            // res.json({id: session.id})
            // res.json({url: session})
            res.status(200).json({success:true, message:'Your appointment is booked', url: session})

            console.log('done')
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


// GET BOOKINGS
export const getTransactions= async(req, res)=>{
    const query =  req.query.new
    console.log("Query",query)
    try{
        const bookings = query ? await Booking.find().sort({_id: -1}).limit(4) : await Booking.find().sort({_id: -1})  

        res.status(200).send(bookings)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

// Get Booking Stats
export const getStats= async(req, res)=>{
    const previousMonth = moment().month(moment()
        .month() - 1)
        .set("data", 1)
        .format("YYYY-MM-DD HH:mm:ss");
    // res.send(previousMonth)
    try{
        const bookings = await Booking.aggregate([
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
        res.status(200).send(bookings)
        
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

// Get Earning Stats
export const getEarningStats= async(req, res)=>{
    const previousMonth = moment().month(moment()
        .month() - 1)
        .set("data", 1)
        .format("YYYY-MM-DD HH:mm:ss");
        console.log(previousMonth)     
    try{
        const income = await Booking.aggregate([
            {
                $match: {createdAt: {$gte: new Date(previousMonth)}},
            },
            {
                $project: {
                    month: {$month: "$createdAt"},
                    sales: "$ticketPrice"
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: "$sales"}
                }
            }
        ]);
        res.status(200).send(income)
        
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

// Get 1 WEEK SALES
export const getWeekSales= async(req, res)=>{
    const last7Days = moment().day(moment()
        .day() - 7)
        .format("YYYY-MM-DD HH:mm:ss");
        console.log("last7Days",last7Days)     
    try{
        const income = await Booking.aggregate([
            {
                $match: {createdAt: {$gte: new Date(last7Days)}},
            },
            {
                $project: {
                    day: {$dayOfWeek: "$createdAt"},
                    sales: "$ticketPrice"
                }
            },
            {
                $group: {
                    _id: "$day",
                    total: {$sum: "$sales"}
                }
            }
        ]);
        res.status(200).send(income)
        
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

export const createBooking = async(req, res)=>{
    if(!req.body.doctor) req.body.doctor = req.params.doctorId 
    if(!req.body.user) req.body.user = req.userId  

    const newBooking = new Booking(req.body)
    
    try{
        const savedBooking = await newBooking.save()
        // console.log(savedBooking._id)
        await Doctor.findByIdAndUpdate(req.body.doctor,{
            $push: {appointments: savedBooking._id}
        })


        
        res.status(200).json({success:true, message:'Your appointment is booked', data:savedBooking})
    } catch (err){
        res.status(500).json({success:true, message:'internal server error'})
    }
};

// export const getBooking = async(req, res)=>{
//     const id = req.params.id

//     try {
//         const book = await Booking.findById(id)

//         res.status(200).json({success:true, message:'successful', data:book})
//     } catch (err) {
//         res.status(404).json({success:true, message:'not found'})
//     }
// }
export const updateBooking = async(req, res)=>{
    const id = req.params.id

    try{
        const updateAppointment = await Booking.findByIdAndUpdate(id, {$set: req.body}, {new:true})
        console.log(updateAppointment)

        res.status(200).json({success: true, message:'Successfully updated', data: updateAppointment})
    }   
    catch (error) {
        res.status(500).json({success: false, message:'Failed to update'})
    }
}

export const getAllBooking = async(req, res)=>{

    try {
        const books = await Booking.find({})

        res.status(200).json({success:true, message:'successful', data:books})
    } catch (err) {
        res.status(500).json({success:true, message:'internal server error'})
    }
}