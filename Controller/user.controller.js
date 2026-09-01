// register controller
import User from "../modules/user.model.js"
import bcrypt from 'bcrypt'


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

        return res.status(201).json({message : 'User Registered', user: newUser})
        
    } catch (error) {
        res.status(500).json({message:'Server crashed', error: error.message})
    }
    


}