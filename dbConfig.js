const mongoose = require('mongoose')

async function connectDB() {
    try {
        const connection = await mongoose.connect("mongodb://localhost:27017/ZenClass", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
        })
        
        if(connection){
            console.log("DBconnection success")
        } else {
            throw new Error("db connecion could not be astablished")
        }
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {connectDB}