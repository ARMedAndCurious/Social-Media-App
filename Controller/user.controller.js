// register controller
import User from "../modules/user.model.js"
import bcrypt from 'bcrypt'
import genToken from "../utils/generateToken.js"


const cookieOptions ={
    httpOnly:true
}

export const registerUser = async(req,res)=>{

    try {
        
        const {name, username, email, password}= req.body

        if(!name || !username || !email || !password){
            return res.status(400).json({message : 'All fields are Required'})
        }

        if(password.length <=6){
             return res.status(400).json({message : 'Password should be greater than six characters'})
        }

        const userExist = await User.findOne({username})

        if(userExist){
            return res.status(409).json({message : 'User already exists'})
        }

        const emailExist = await User.findOne({email})

        if(emailExist){
            return res.status(409).json({message : 'User already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            name,
            username,
            email,
            password: hashedPassword
        })

        const token = genToken(newUser._id)
        res.cookie('token', token, cookieOptions)

        return res.status(201).json({message : 'User Registered', user: newUser})
        
    } catch (error) {
        res.status(500).json({message:'Server crashed', error: error.message})
    }
    


}

export const loginUser = async(req,res)=>{
    try {
        const{identifier, password} = req.body

        if(!identifier || !password){
            return res.status(400).json({message : "Username/email and password are required"})
        }
        const user = await User.findOne({
            $or: [
                { email: identifier },
                { username: identifier }
            ]
        });

        if(!user){
            return res.status(404).json({message : 'User not found'})
        }
       const passwordMatched = await bcyrpt.compare(password, user.password)
       if(!passwordMatched){
        return res.status(401).json({message: 'Password did not match'})
       }

       const token = genToken(user._id);

        res.cookie("token", token, cookieOptions);

        return res.status(200).json({
            message: "User logged in",
            user
        });

       

    } catch (error) {
        res.status(500).json({message:'Server crashed', error: error.message})
    }
}

export const getMe = (req,res)=>{
    const authenticatedUser = req.user
    res.status(200).json({authenticatedUser})
}

export const logoutUser = async(req,res)=>{
    res.clearCookies("token", cookieOptions)

    return res.status(200).json({
        message:"User logged out successfully"
    })
}