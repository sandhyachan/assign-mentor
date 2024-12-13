const mongoose = require('mongoose')

const MentorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    assigned_students: [{
        type: String,
        ref: 'Student'
    }],
    specialization: {
        type: String,
        required: false
    }
})

const MentorModel = mongoose.model("mentors", MentorSchema)

module.exports = { MentorModel }