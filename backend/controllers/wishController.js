const asyncHandler = require('express-async-handler')

const Wish = require('../models/wishModel')
const User = require('../models/userModel')

// Get Wish
// GET /api/wish (route)
// Private (access)

const getWish =  asyncHandler(async (req, res) => {
    const wish = await Wish.find({ user: req.user.id})
    res.status(200).json(wish)
})

//create Wish
//POST /api/wish (route)
// Private (access)

const createWish =  asyncHandler(async (req, res) => {
   if(!req.body.text) {
    res.status(400)
    throw new Error('please add a text field')
   }

   const wish = await Wish.create({
        text: req.body.text,
        user: req.user.id
   })
    res.status(200).json(wish)
})

// Update Wish
// PUT /api/wish/:id  (route)
//Private (access)

const updateWish = asyncHandler(async (req, res) => {
    const wish = await Wish.findById(req.params.id)

    if(!wish){
        res.status(400)
        throw new Error('Wish not found')
    }


    //checking if the user exists
    if(!req.user) {
        res.status(401)
        throw new Error (`User doesn't exist`)
    }

    // checking if the logged user matches the wish user
    if(wish.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('The user not authorized')
    }

    const updatedWish = await Wish.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

   res.status(200).json(updatedWish)
})

// Delete Wish
// DELETE /api/wish/:id   (route)
// Private  (access)


const deleteWish =  asyncHandler(async (req, res) => {
    const wish = await Wish.findById(req.params.id)

    if(!wish){
        res.status(400)
        throw new Error('Wish not found')
    }

    

    //checking if the user exists
    if(!req.user) {
        res.status(401)
        throw new Error (`User doesn't exist`)
    }

    // checking if the logged user matches the wish user
    if(wish.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('The user not authorized')
    }
      await wish.remove()

    res.status(200).json({id: req.params.id})
})


module.exports = {
    getWish,
    createWish,
    updateWish,
    deleteWish
}