const mongoose = require('mongoose')

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

const StudentModel = mongoose.model('students', StudentSchema)

module.exports = { StudentModel }