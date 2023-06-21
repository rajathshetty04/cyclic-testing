const mongoose = require('mongoose')

const connectDB = (url)=>{
        mongoose.set('strictQuery',false)
        mongoose.connect(url)
        console.log("Connected to DB....")
}

module.exports = connectDB;