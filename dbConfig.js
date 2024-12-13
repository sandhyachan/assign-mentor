const mongoose = require('mongoose')

async function initialDBConnection() {
    try {
        mongoose.connect("mongodb://27017")
        if(connection){
            console.log("DBconnection success")
        } else {
            throw new Error("db connecion could not be astablished")
        }
    } catch (error) {
        console.log(error.message)
    }
}