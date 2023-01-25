 require("dotenv").config()
 var cors = require("cors")
 const express = require("express")
 const initializeDB = require("./config/db")
 const userRouter = require("./routes/user.routes")
 const authMiddleware = require("./middleware/auth.middleware")
 const taskRouter = require("./routes/task.routes")

 const app = express()

 app.use(cors())
 app.use(express.json())

 initializeDB()

 app.use("/user", userRouter)
 app.use("/task", taskRouter)

 app.get("/hello", (req, res)=>{
    res.json({message: 'Hello'})
 })

 app.listen(process.env.PORT, ()=>{
    console.log(`Server listening on port ${process.env.PORT}`)
 })