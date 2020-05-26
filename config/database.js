const mongoose = require('mongoose')
require("dotenv").config();

const setupDB = () => {
    mongoose.connect(process.env.DATABASE,{
        useNewUrlParser : true,
        useCreateIndex : true,
        useUnifiedTopology: true
    }) 
    .then(() => {
        console.log("Database connected")
    })
}

module.exports = setupDB