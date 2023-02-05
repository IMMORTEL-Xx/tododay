const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const TaskSchema = new Schema({
    date : { type: String, required: true },
    name : { type: String, required: true },
    start: { type: Number, required: true},
    end: { type: Number, required: true},
    description : {type: String, default: "" },
    user : { type: ObjectId, ref: "User", required: true } 
})

module.exports = mongoose.model('Task', TaskSchema)