const mongoose = require('mongoose')

const wishSchema = mongoose.Schema(
    {
        user : {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        
        text : {
        type: String,
        required: [true, 'please enter the text']
    }
},
    {
    timestamps: true

    }
)

module.exports = mongoose.model('Wish' , wishSchema)