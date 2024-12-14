const mongoose = require('mongoose')

// Function to connect to MongoDB using Mongoose
async function connectDB() {
    try {
        const connection = await mongoose.connect("mongodb://localhost:27017/mentor-assign", {
            serverSelectionTimeoutMS: 30000
        })
        if(connection){
            console.log("DB connection successful")
        } else {
            throw new Error("DB connecion could not be established")
        }
    } catch (error) {
        console.log("DB connection error:", error.message)
    }
}

module.exports = {connectDB}