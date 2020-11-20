const mongoose = require("mongoose")

const budgetSchema = new mongoose.Schema({
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
