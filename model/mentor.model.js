const mongoose = require('mongoose')

const MentorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const MentorModel = mongoose.model("mentors", MentorSchema)

module.exports = { MentorModel }