const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')



// Register a user
// POST /api/users  (route)
//Public (access)
const registerUser =  asyncHandler( async (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error ('Please enter all the data')
    }

    //check if user exist

    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already Exists')
    }

    // Password Hashing 

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create a user

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})

// Authenticate a  user
// POST /api/users/login  (route)
//Public (access)
const loginUser =  asyncHandler( async (req, res) => {
    const { email, password } = req.body

    // checking the email of the user
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
             token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    } 
})

// Get user data
// GET /api/users/me  (route)
//Private (access)
const getMe =  asyncHandler( async (req, res) => {
       res.status(200).json(req.user)
})

// Generate JWT

const generateToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })


}


module.exports = {
    registerUser,
    loginUser,
    getMe
}