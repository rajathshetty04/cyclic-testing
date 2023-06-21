const sendNotification = require('../sendNotification');
const ProductsToNotify = require("../models/productsSchema");
const Nightmare = require("nightmare");

const checkPriceContinuous = async () => {
  console.log("inside checkPriceContinuous");
  try {
    const products = await ProductsToNotify.find({});
    // console.log(products);
    for (const element of products) {
      //  console.log(element);
      const nightmare = Nightmare();

      const isPriceDropped = await nightmare
        .goto(element.productLink)
        .wait(".a-price-whole")
        .evaluate((element) => {
          let price = parseInt(
            document.querySelector(".a-price-whole").innerText.replace(",", "")
          );

          if (price < element.targetPrice) {
            return true;
          } else {
            return false;
          }
        }, element)
        .end();
     
        if (isPriceDropped) {
        console.log(`Price dropped , Object id : ${element._id}`);
        sendNotification(element)


      }
      //  else {
        // console.log("Price didn't dropped");
      // }
    }

  } catch (error) {
    console.log(error);
  }
};

// checkPriceContinuous()
module.exports = checkPriceContinuous;
