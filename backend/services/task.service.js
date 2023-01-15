const Task = require("../models/task.model")
const User = require("../models/user.model")

async function addOne(task){
    //'task' ressemble donc à { nom: 'faire blabla', user: '63bfce9dad19806c6558a56b' }
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

async function getAll(){ //getAll(userId)
    const tasks = await Task.find()
    return tasks
    //const user = await User.findById(userId).populate("tasks", "nom description -_id")
    // return user.tasks
}

module.exports = {
    addOne,
    getAll
}