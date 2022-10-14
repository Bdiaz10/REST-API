const mongoose = require('mongoose')

// creates a "schema" or "model" to represent a player s
const playerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    team:{
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true,
        default: 00
    }
})

module.exports = mongoose.model('Player', playerSchema)