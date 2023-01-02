const express = require('express')
const router = express.Router()
const { 
        getWish,
        createWish,
        updateWish, 
        deleteWish 
    } = require('../controllers/wishController')

const { protect } = require('../middleware/authMiddleware')



router.route('/').get(protect, getWish).post(protect, createWish)
router.route('/:id').put(protect, updateWish).delete(protect, deleteWish)


module.exports = router