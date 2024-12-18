// Import required modules and functions
const { createMentor, showStudents } = require('./controller/mentor.controller')
const { createStudent, assignMentor, updateMentor, getPreviousMentor } = require('./controller/student.controller')
const {connectDB} = require('./dbConfig')
const express = require('express')
const { MentorModel } = require('./model/mentor.model')
const { StudentModel } = require('./model/student.model')
const server = express()

// Connect to the database  
connectDB()

// Middleware to parse JSON data in the request body
server.use(express.json())

// Routes for creating mentors and students,
server.post('/createMentor', createMentor)
server.post('/createStudent', createStudent)

// Endpoint to get all mentors
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

// Endpoint to get all students
server.get('/students', async (request, response) => {
    try {
        const result = await StudentModel.find()
        response.status(200).json({
            message: "Students fetched successfully",
            data: result
        })
    } catch (error) {
        response.status(400).json({
            message: "Something went wrong",
            error: error.message,
        })
    }
})

// Endpoint to get students assigned to a mentor
server.get('/showStudents/:mentorId', showStudents)

// Endpoint to get the previous mentor of a student 
server.get('/getPreviousMentor/:studentId', getPreviousMentor)

// Endpoint to assign students to a mentor
server.patch('/assignMentor/:mentorId', assignMentor)

// Endpoint to update a student's mentor
server.patch('/updateMentor/:studentId', updateMentor)

// Basic landing page with available API routes
server.get('/', (request, response) => {
    response.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Mentor-Student API</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
                a { display: inline-block; margin: 10px; padding: 10px 20px; text-decoration: none; background-color: rgb(106, 166, 214); color: white; border-radius: 5px; }
                a:hover { background-color:rgb(137, 179, 213); }
                h1 { color: #333; }
                p { font-size: 18px; }
            </style>
        </head>
        <body>
            <h1>Welcome to the Mentor-Student API</h1>
            <p>Click on the links below to view available endpoints:</p>
            <a href="/mentors">View All Mentors</a>
            <a href="/students">View All Students</a>
            <a href="/students/mentor/:mentorId">View Students by Mentor</a>
            <a href="/mentor/student/:studentId">View Mentor for a Student</a>
        </body>
        </html>
    `)
})

// Start the Express server on port 3000
server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000")
})