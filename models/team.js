const mongoose = require('mongoose')

// create a schema for a team in the db
const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    city: {
        type: String,
        required: true

    },
    wins: {
        type: Number,
        required: true

    },
    losses: {
        type: Number,
        required: true

    },
    
    
})

module.exports = mongoose.model('Team', teamSchema)