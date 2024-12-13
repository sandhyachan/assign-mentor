const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: Number,

})

const UserModel = mongoose.model('users', UserSchema)

function main() {
    const user = new UserModel({
        name: "",
        age: "",
    })
    user.save().then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err)
    });
}
main()

module.exports = {
    UserModel
}