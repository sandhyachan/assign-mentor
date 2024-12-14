const mongoose = require('mongoose')

// Define the Mentor Schema using Mongoose
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

// Create the Mentor model based on  schema
const MentorModel = mongoose.model("mentors", MentorSchema)

module.exports = { MentorModel }