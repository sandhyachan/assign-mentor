const { StudentModel } = require("../model/student.model");

const createStudent = async (request, response) => {
    try {
        const student = new StudentModel({
            name: request.body.name,
            email: request.body.email,
            mentor: request.body.mentor
        })
        const result = await student.save()
        response.status(201).json({
            message: "Student created successfully",
            data: result
        })
    } catch (error) {
        response.status(400).json({ 
            message: 'Error creating student', 
            error: error.message})
    }
}

module.exports = { createStudent }