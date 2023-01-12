const taskService = require("../services/task.service")

const taskController = {
    addOne: async(req, res) => {
        try{
            req.body.user = req.user.id
            const id = await taskService.addOne(req.body)
            res.status(201).json({
                message: "Task added",
                            id 
            })
        }
        catch(err){
            res.status(500).json({
                erreur: err.message
            })
        }
    },
    getAll: async (req, res) => {
        const tasks = await taskService.getAll()
        res.status(200).json(tasks)
    }
}

module.exports = taskController