const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const UserSchema = new Schema({
    email : { type: String, unique: true, required: true },
    password : { type: String, required: true },
    tasks : [{ type: ObjectId, ref: "Task" }] 
})

module.exports = mongoose.model('User', UserSchema)