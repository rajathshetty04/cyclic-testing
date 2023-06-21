require('dotenv').config()
const express = require("express");
const webPush = require('web-push')
const mongoose = require('mongoose')
const connectDB=require('./db/connect')
const checkPriceContinuous = require('./controllers/checkPriceContinuous')
const ProductsToNotify = require('./models/productsSchema')
const checkPrice = require('./controllers/pricechecker')
const app = express();

app.use(express.json());
app.use(express.static('./public'))


app.post("/api/v1/getProductData", async (req, res) => {
   console.log(req.body.link);

   res.json({
    status: true,
    name: "No product found",
    currentPrice: 12999
   })

//   try {
//     const data = await checkPrice(req.body.link);
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" , status:false });
//   }

});



//a
const Public_Key = 'BORcIsTPjn_CHcIHKuOIx7IypYpB8_6ndqAGG4hvNwzrSgbcjw-WTV4rTWe6mYkV0cgrslFDNl2qaPLrMrxhpsU'
const Private_Key=process.env.PRIVATE_KEY

webPush.setVapidDetails('mailto:ec051rajath@gmail.com',Public_Key,Private_Key)

app.post('/api/v1/setProductsToNotify',async (req,res)=>{
    // const subscription = req.body;
    // console.log(subscription)
    // res.status(201).json({message:"success"})
    console.log(req.body)
//     try {
//       await ProductsToNotify.create(req.body)
      res.status(201).json({message:"success"})
//   } catch (error) {
//     console.error(error)
//       res.status(500).json({msg:"Something error occurred"})
//   }

    // const payload = JSON.stringify({title :'Push test',body:"hello world 1"})
    // setTimeout(() => {
    //     webPush.sendNotification(subscription,payload).catch(err=>console.log(err));
    // }, 50000);
})





const port = process.env.PORT || 3000

const start = async()=>{
    try {
        // await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server started in port ${port} .....`))
        // setInterval(() => {
        //   checkPriceContinuous()
        // }, 300000);
    } catch (error) {
        console.log(error)
    }
}
start()



