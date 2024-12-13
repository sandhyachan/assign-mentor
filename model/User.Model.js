const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    mentor: {
        type: String
    }
})

const UserModel = mongoose.model('users', UserSchema)

async function main() {
    const user = new UserModel({
        name: "Sandhya",
        age: 24,
        mentor: "Vihsnu"
    })
    user.save().then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err)
    })
}
main()

module.exports = {UserModel}