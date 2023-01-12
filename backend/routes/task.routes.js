const express = require('express')
const taskController = require("../controllers/task.controller")
const authMiddleware = require("../middleware/auth.middleware")
const taskRouter = express.Router()

taskRouter.get("/", taskController.getAll)
taskRouter.post("/", authMiddleware, taskController.addOne)

module.exports = taskRouter