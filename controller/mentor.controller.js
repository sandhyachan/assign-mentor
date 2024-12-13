const { MentorModel } = require("../model/mentor.model");

const createMentor = async(request, response) => {
    try {
        const mentor = new MentorModel({
            name: request.body.name,
            email: request.body.email,
            assigned_students: request.body.students,
            specialization: request.body.specialization
        })
        const result = await mentor.save()
        response.status(201).json({
            message: 'Mentor created successfully', 
            data: result
        })
    } catch (error) {
        response.status(400).json({ 
            message: 'Error creating mentor', 
            error: error.message})
    }
}

module.exports = {
    createMentor
}