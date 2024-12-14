const mongoose = require('mongoose')

// Define the Student Schema using Mongoose
const StudentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mentor: {
        type: String,
        required: false
    },
    mentor_history: [{
        mentor_id: {
            type: String,
            ref: 'Mentor',
        },
        assigned_at: {
            type: Date,
            default: Date.now,
        },
    }],
})

// Create the Student model based on the schema 
const StudentModel = mongoose.model('students', StudentSchema)

module.exports = { StudentModel }