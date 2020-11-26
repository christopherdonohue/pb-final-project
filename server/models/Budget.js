const mongoose = require("mongoose")
const { authMiddleware } = require("../controllers/UserController")




const budgetSchema = new mongoose.Schema({

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {
        type: String,
        trim: true,
        required: true,
        uppercase: true,
    },
    budgetVal: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,


    }

})

module.exports = mongoose.model('Budget', budgetSchema)
