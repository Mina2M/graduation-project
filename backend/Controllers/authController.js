import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import validator from 'validator'
const generateToken = user => {
    return jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET_KEY, { expiresIn:'15d' });
}

export const register = async(req, res)=>{

    const {email, password, name, role, photo, gender} = req.body

    try{
        let user = null

        if(role==='patient' || role==='admin'){
            user = await User.findOne({email})
        }
        else if(role==='doctor'){
            user = await Doctor.findOne({email})
        }
        
        // check if user exist
        if(user){
            return res.status(400).json({message: 'User already exist'})
        }
        // if(!validator.isEmail(email)){
        //     return res.status(400).json({message: 'Email not valid'})
        // }
        // if(!validator.isStrongPassword(password, { 
        //         minLength: 8, minLowercase: 1, 
        //         minUppercase: 1, minNumbers: 1, minSymbols: 1 
        //     })){
        //     return res.status(400).json({message: 'Password not strong enough'})
        // }`
        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        if(role==='patient' || role==='admin'){
            user = new User({
                name,
                email,
                password:hashPassword,
                photo,
                gender,
                role,
            })
        }
        if(role==='doctor'){
            user = new Doctor({
                name,
                email,
                password:hashPassword,
                photo,
                gender,
                role,
            })
        }

        await user.save()

        res.status(200).json({success:true, message:'User successfully created'})

    } catch(err) {
        res.status(200).json({success:false, message:'Internal server error, Try again'})
    }
}

export const login = async(req, res)=>{

    const {email} = req.body      

    try{

        let user = null;

        const patient = await User.findOne({email});
        const doctor = await Doctor.findOne({email});

        if(patient){
            user = patient
        }
        if(doctor){
            user = doctor
        }

        // check if user exist or not
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        
        // compare password
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password) 
        console.log(isPasswordMatch);
        if(!isPasswordMatch){   
            return res.status(400).json({status:false, message: "invalid credentials"});
        }
        // get auth token
        const token = generateToken(user);

        const {password, role, appointments, ...rest} = user._doc
        console.log(user._doc)
        res.status(200).json({
            status:true, 
            message: "Successfully login", 
            token, 
            data: { ...rest }, 
            role,
        }); 
        // res.cookie('accessToken', token, {
        //     httpOnly: true,
        //     expires: token.expiresIn
        // }).status(200).json({
        //     status:true, 
        //     message: "Successfully login",  
        //     token,
        //     data: { ...rest }, 
        //     role,
        // });

    } catch(err) {
        res.status(500).json({status:false, message: "Failed to login"});
    }
}

