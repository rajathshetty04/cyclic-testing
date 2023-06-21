const mongoose = require("mongoose")
const ProductsSchema = new mongoose.Schema({
    productLink:{
        type:String,
        required:[true,"must provide product link"],
        trim:true
        
    },
    targetPrice:{
        type:Number,
        required:[true,"must provide Target Price"]
    },
    subscription:{
        type:Object,
        required:[true,"must provide the notification subscription"]
    }

})

module.exports = mongoose.model("ProductsToNotify",ProductsSchema)