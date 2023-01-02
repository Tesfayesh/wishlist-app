const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler( async(req, res, next) => {
    let token

     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
     {
    try {
       
            // having token from header
        token = req.headers.authorization.split(' ')[1]

        // token verification

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        // user from the token
        req.user = await User.findById(decoded.id).select('-password')

        next()
    }
        
     catch (error) {
        console.log(error)
        res.status(401)
        throw new error('Not authorized')
        
    }
     }
    if(!token) {
        res.status(401)
        throw new Error ('Not authorization without having token')
    }
    

})


module.exports = { protect }