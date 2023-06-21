// const nightmare = require("nightmare")();

//Example links
//https://amzn.eu/d/6Do2Yan";
//"https://amzn.eu/d/5tDnfjY"
//"https://www.amazon.in/dp/B0BZ466BWW?ref_=cm_sw_r_apan_dp_CMV1HG8W04TYCP539Z26&th=1";
//https://www.amazon.in/dp/B07MKMFKPG?re

const checkPrice = async (link) => {
  const nightmare = require("nightmare")();
  //string formatting
  link = link.slice(link.indexOf("https://"), link.length);

  const curNamePriceString = await nightmare
    .goto(link)
    .wait(".a-price-whole")
    .evaluate(() => {
      return [
        document.querySelector("#productTitle").innerText,
        document.querySelector(".a-price-whole").innerText,
      ];
    })
    .end();

  const productName = curNamePriceString[0];
  const curPrice = parseInt(curNamePriceString[1].replace(",", ""));
  return { status: true, name: productName, currentPrice: curPrice };
};

//For validating...

// async function myFunction() {
//   console.log(await checkPrice('https://amzn.eu/d/6Do2Yan'));
// }
// myFunction();
//  setTimeout(async () => {
//   console.log(await checkPrice('https://amzn.eu/d/6Do2Yan'))
//  }, 60000);

module.exports = checkPrice;
