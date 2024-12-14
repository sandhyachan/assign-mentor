const { MentorModel } = require("../model/mentor.model")
const { StudentModel } = require("../model/student.model")

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

const showStudents = async (request, response) => {
    try {
        const mentorId = request.params.mentorId
        const mentor = await MentorModel.findById(mentorId)
        if(!mentor){
            return response.status(404).json({
                message: "Mentor not Found"
            })
        }
        const students = await StudentModel.find({
            _id: { $in: mentor.assigned_students }
        })
        if(students.length < 1){
            return response.status(200).json({
                message: "No students found for this mentor",
                data: []
            })
        }
        response.status(200).json({
            message: "Students fetched successfully",
            data: students
        })
    } catch (error) {
        console.error(error);
        response.status(400).json({
            message: 'Something went wrong',
            error: error.message
        })
    }
}

module.exports = {
    createMentor, showStudents
}