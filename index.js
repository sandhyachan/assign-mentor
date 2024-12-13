const { createMentor } = require('./controller/mentor.controller')
const { createStudent } = require('./controller/student.controller')
const {connectDB} = require('./dbConfig')
const express = require('express')
const { MentorModel } = require('./model/mentor.model')
const { StudentModel } = require('./model/student.model')
const server = express()

connectDB()
server.use(express.json())

server.post('/createMentor', createMentor)

server.get('/mentors', async (request, response) => {
    try {
        const result = await MentorModel.find()
        response.status(200).json({
            message: "Mentors fetched successfully",
            data: result
        })
    } catch (error) {
        response.status(400).json({
            message: "Something went wrong",
            error: error.message,
        })
    }
})




server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000")
})