const mongoose = require('mongoose')

module.exports = mongoose.model('Book', {
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    press: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    inventory: {
        type: Number,
        required: false
    }
})

