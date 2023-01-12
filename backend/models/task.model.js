const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const TaskSchema = new Schema({
    nom : { type: String, required: true },
    // date : { type: String, required: true },
    // debut : { type: String, required: true }, 
    description : {type: String, default: "" },
    user : { type: ObjectId, ref: "User", required: true } 
})

module.exports = mongoose.model('Task', TaskSchema)