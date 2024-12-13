const express = require('express')
const {client, dbName, ObjectId} = require('./dbConf')
const server = express()
const {connectDB} = require('./dbConfig')
const {UserModel} = require('./model/User.Model')

connectDB()

server.get('/', async (request, response) => {
    try {
        await client.connect()

        const result = await client.db(dbName).collection("users").find().toArray()
        client.close()

        return response.status(200).json({
            message: "Users fetched successfully",
            data: result
        })

    } catch (error) {
        return response.status(500).json({
            message: "Failed to fetch"
        })
    }

})

server.get('/user/:userId', async (request, response) => {
    await client.connect()

    await client.db(dbName).collection("users").findOne({ _id: new ObjectId(request.params.userId)})
        .then((result) => {
            if(result){
                return response.status(200).json({
                    message: "Users fetched successfully",
                    data: result
                })
            } else {
                return response.status(404).json({
                    message: "No User Found"
                })
            }
        }).catch((error) => {
            console.log(error)
            return response.status(400).json({
                message: "Something went wrong"
            })
        }).finally(() => {
            client.close()
        })
})

server.use(express.json())

server.post('/create', async (request, response) => {
    try {
        const user = new UserModel({
            name: request.body.name,
            age: request.body.age,
            mentor: request.body.mentor,
        })

        const result = await user.save()

        return response.status(201).json({
            message: "User created successfully",
            data: result,
        })
    } catch (err) {
        console.error(err)
        return response.status(400).json({
            message: "Something went wrong",
            error: err.message,
        })
    }
})


server.patch('/user/:userId/update', async(request, response) => {
    await client.connect()
    try {
        const result = client.db(dbName).collection("users").findOneAndUpdate(
            {_id: new ObjectId(request.params.userId)}, 
            {$set: request.body})
        client.close()
        if(result){
            response.status(200).json({
                message: "User updated successfully "
            })
        }else{
            return response.status(404).json({
                message: "Document with specifed Id not found"
            })
        }
    } catch (error) {
        return response.status(400).json({
            message: "Something went wrong"
        })
    }
})

server.delete('/delete/:userId', async(request, response) => {
    try {
        await client.connect()
        const result = client.db(dbName).collection("users").findOneAndDelete(
            {_id: new ObjectId(request.params.userId)})
        client.close()
        if(result){
            return response.status(200).json({
                message: "User deleted "
            })
        }else{
            return response.status(404).json({
                message: "Document with specifed Id not found"
            })
        }
    } catch (error) {
        response.status(400).json({
            error: error.message,
            message: "Something went wrong"
        })
    }
})

server.use(express.json())

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000')
})