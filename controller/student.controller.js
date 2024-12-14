// Import the Mentor and Student models
const { MentorModel } = require("../model/mentor.model")
const { StudentModel } = require("../model/student.model")

// Controller function to create a student
const createStudent = async (request, response) => {
    try {
        // Create a new student instance using request data
        const student = new StudentModel({
            name: request.body.name,
            email: request.body.email,
            mentor: request.body.mentor // Mentor ID assigned to the student
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

// Controller function to assign a student to a mentor 
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

        // Update student(s) who don't have a mentor
        const students = await StudentModel.updateMany(
            { _id: { $in: studentId}, mentor: { $exists: false} },
            { $set: {mentor: mentorId} }
        )
        // Add student to mentor's assigned list
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

// Controller function to update a student's mentor
const updateMentor = async (request, response) => {
    try {
        const studentId = request.params.studentId
        const mentorId = request.body.mentorId

        const student = await StudentModel.findById(studentId)
        if (!student) {
            return response.status(404).json({
                message: "Student not found",
            })
        }

        const mentor = await MentorModel.findById(mentorId)
        if (!mentor) {
            return response.status(404).json({
                message: "Mentor not found",
            })
        }

        // If student already has a mentor, store their previous mentor in history
        if (student.mentor) {
            student.mentor_history.push({
                mentor_id: student.mentor,
                assigned_at: new Date(),
            })
        }
        student.mentor = mentorId // Assign new mentor to student
        await student.save()

        // Add student to new mentor's assigned students list
        if (!mentor.assigned_students.includes(studentId)) {
            mentor.assigned_students.push(studentId)
            await mentor.save()
        }

        response.status(200).json({
            message: "Mentor updated for the student successfully",
            data: student,
        })
    } catch (error) {
        console.error(error)
        response.status(400).json({
            message: 'Error assigning or changing mentor for student',
            error: error.message,
        })
    }
}

// Controller function to get previous mentor of a student
const getPreviousMentor = async (request, response) => {
    try {
        const studentId = request.params.studentId
        const student = await StudentModel.findById(studentId)
        if (!student) {
            return response.status(404).json({
                message: "Student not Found"
            })
        }

        if (student.mentor_history.length < 1) {
            return response.status(404).json({
                message: 'Previous mentor not found',
            })
        }

        // Get the previous mentor's ID and fetch their details
        const previousMentorId = student.mentor_history[student.mentor_history.length - 1].mentor_id
        const previousMentor = await MentorModel.findById(previousMentorId)
        return response.status(200).json({
            message: 'Previous mentor fetched successfully',
            data: previousMentor,
        })
    } catch (error) {
        console.error(error)
        response.status(400).json({
            message: 'Error fetching previous mentors for the student',
            error: error.message
        })
    }
}


module.exports = { createStudent, assignMentor, updateMentor, getPreviousMentor }
