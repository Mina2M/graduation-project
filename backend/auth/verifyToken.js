import jwt from 'jsonwebtoken'
import Doctor from '../models/DoctorSchema.js'
import User from '../models/UserSchema.js'

export const authenticate = async (req, res, next)=>{
    // get token from header authorization
    const authToken = req.headers.authorization

    // check token is exists or not
    if(!authToken || !authToken.startsWith('Bearer')){
        return res.status(401).json({success:false, message: 'No token, authorization denied'})
    }    

    try{
        // console.log(authToken)
        const token = authToken.split(' ')[1];

        // verify token => decode token with secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        // extract payload
        req.userId = decoded.id
        req.role = decoded.role

        next()
    } catch (err) {
        if(err.name === 'TokenExpiredError'){
            return res.status(401).json({message:'Token is expired'})
        }
        return res.status(401).json({success:false, message:'Invalid token'})
    }
};

export const restrict = roles => async (req, res, next)=>{
    const userId =  req.userId;
    
    let user;

    const patient = await User.findById(userId);
    const doctor = await Doctor.findById(userId); 
    const admin = await User.findById(userId); 

    if(patient){
        user = patient;
    }

    if(doctor){
        user = doctor;
    }
    if(admin){
        user = admin;
    }
    console.log(roles)
    if(!roles.includes(user?.role)){
        return res.status(401).json({success: false, message: "You 're not authorized"})
    }

    next();
}