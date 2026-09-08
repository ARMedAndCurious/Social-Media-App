import express from 'express'
import { loginUser, registerUser,getMe, logoutUser } from '../Controller/user.controller.js'
import { isAuthenticated } from '../middlewares/auth.middleware.js'

const userRoutes = express.Router()

userRoutes.post('/register', registerUser)
userRoutes.post('/login',loginUser )
userRoutes.get('/me', isAuthenticated, getMe)
//Implement log out route
userRoutes.post('/logout', logoutUser)

export default userRoutes