const userService = require("../services/user.service")

const userController = {
    register: async(req, res) => {
        console.log(req.body)
        try{
            await userService.register(req.body)
            res.status(201).json({
                message: "User added"}) 
        }
        catch(err){
            console.log(err.message)
            res.status(500).json({error: err.message})
        }
    },

    login: async(req, res) => {
        const { email, password } = req.body
        const token = await userService.login(email, password)
        if(!token) res.status(500).json({error: "Password or email incorrect"})
        else res.status(200).json(token)
    }
}

module.exports = userController