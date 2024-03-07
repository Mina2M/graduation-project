import Message from '../models/MessageSchema.js';


// get all messages
export const getAllMessage = async(req, res)=>{

    try{
        const messages = await Message.find({})

        res.status(200).json({success: true, message:'Successful', data:messages})
    } catch (err) {
        res.status(404).json({success: false, message:'Not found'})
    }
};



// create messages
export const createMessage = async (req, res)=>{

    if(!req.body.user) req.body.user = req.userId    

    const newMessage = new Message(req.body)

    try{
        const savedMessage = await newMessage.save()
        // console.log(savedReview._id)

        res.status(200).json({success:true, message:'Message submitted', data:savedMessage})
    }
    catch (err){
        res.status(500).json({success:false, message: err.message})
    }
} 