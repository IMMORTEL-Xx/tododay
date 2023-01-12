const mongoose = require('mongoose');

const initializeDB = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect("mongodb://127.0.0.1:27017/tododay", (err) =>{
        if(err) return console.log("Error" + err.message)
        console.log("Connection with Mongoose!")
    })
}

module.exports = initializeDB