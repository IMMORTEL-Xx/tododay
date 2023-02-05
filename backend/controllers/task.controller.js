const taskService = require("../services/task.service")

const taskController = {
    addOne: async(req, res) => {
        try{
            console.log(req.body)
            //requête arrive avec 'user' ajouté via le middleware
            //'req.body.user = req.user.id' crée et initilise 'req.body.user'
            req.body.user = req.user.id
            console.log(req.body);
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
    },
    getAllByDay: async (req, res) => {
        try{
            const date = req.params.date
            const tasks = await taskService.getAllByDay(req.user.id, date)
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