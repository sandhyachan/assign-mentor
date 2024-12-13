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
    }
})

const StudentModel = mongoose.model('students', StudentSchema)

module.exports = { StudentModel }