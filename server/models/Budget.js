const mongoose = require("mongoose")

const colorValidator = (x) => (/^#([0-9a-f]{6})$/i).test(x);

const chartSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        uppercase: true,
    },
    value: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
        validate: [colorValidator, 'Error color is not valid']
    }

}, { collection: 'chart'})

module.exports = mongoose.model('chart', chartSchema)
