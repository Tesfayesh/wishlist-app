
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type : String,
        required: [true, 'please enter the user name']    
    },
    email: {
        type: String,
        required: [true, 'please enter an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please enter password'],
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)