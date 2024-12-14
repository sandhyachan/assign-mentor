const { MentorModel } = require("../model/mentor.model");
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

const assignMentor = async (request, response) => {
    try {
        const mentorId = request.params.mentorId
        const studentId = request.body.studentId
        
        const mentor = await MentorModel.findById(mentorId)
        if(!mentor){
            return response.status(404).json({
                message: "Mentor not found"
            })
        }

        const students = await StudentModel.updateMany(
            { _id: { $in: studentId}, mentor: { $exists: false} },
            { $set: {mentor: mentorId} }
        )
        mentor.assigned_students.push(...studentId)

        await mentor.save()

        response.status(200).json({
            message: "Students assigned to mentor successfully",
            data: students
        })
    } catch (error) {
        response.status(400).json({ 
            message: 'Error assigning students to mentor', 
            error: error.message})
    }
}

module.exports = { createStudent, assignMentor }