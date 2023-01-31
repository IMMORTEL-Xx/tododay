const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const DaySchema = new Schema({
    date : { type: String, required: true },
    user : { type: ObjectId, ref: "User", required: true },
    tasks : [{ type: ObjectId, ref: "Task" }]
})

module.exports = mongoose.model('Day', DaySchema)