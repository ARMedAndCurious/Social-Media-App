import express from 'express'
import { registerUser } from '../Controller/user.controller.js'

const userRoutes = express.Router()

userRoutes.post('/register', registerUser)

export default userRoutes