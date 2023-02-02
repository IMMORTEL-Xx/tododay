const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const TaskSchema = new Schema({
    date : { type: String, required: true },
    name : { type: String, required: true },
    // start: { type: String, required: true},
    // end: { type: String, required: true},
    description : {type: String, default: "" },
    user : { type: ObjectId, ref: "User", required: true } 
})

module.exports = mongoose.model('Task', TaskSchema)