const taskService = require("../services/task.service")

const taskController = {
    addOne: async(req, res) => {
        try{
            //requête arrive avec 'user' ajouté via le middleware
            //'req.body.user = req.user.id' crée et initilise 'req.body.user'
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
        try{
            const tasks = await taskService.getAll(req.user.id)
            res.status(200).json(tasks)
        }
        catch(err){
            res.status(500).json({
                erreur: err.message
            })
        }
    }
}

module.exports = taskController