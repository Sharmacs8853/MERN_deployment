const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email : {type: String, require: true},
    password :{type: String, require: true},
    age:{type: Number, require: true}
})
const UserModel = mongoose.model('user', userSchema);

module.exports = {UserModel}