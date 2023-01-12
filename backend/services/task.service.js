const Task = require("../models/task.model")
const User = require("../models/user.model")

async function addOne(task){
    const newTask = new Task(task)

    const user = await User.findById(task.user)
    user.tasks.push(newTask._id)

    console.log(newTask)

    await newTask.save()
    await user.save()

    console.log("user2-v")
    console.log(user)

    return newTask._id
}

async function getAll(){
    const tasks = Task.find()
    return tasks
}

module.exports = {
    addOne,
    getAll
}