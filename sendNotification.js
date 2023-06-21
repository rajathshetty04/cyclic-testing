const webPush = require("web-push");
require("dotenv").config();
const Public_Key =
  "BORcIsTPjn_CHcIHKuOIx7IypYpB8_6ndqAGG4hvNwzrSgbcjw-WTV4rTWe6mYkV0cgrslFDNl2qaPLrMrxhpsU";

const Private_Key = process.env.PRIVATE_KEY;
webPush.setVapidDetails(
  "mailto:ec051rajath@gmail.com",
  Public_Key,
  Private_Key
);

const sendNotification = (element) => {
  const payload = JSON.stringify({
    title: "Price dropped!",
    body: element.productLink,
  });
  const subscription = element.subscription;
  webPush
    .sendNotification(subscription, payload)
    .catch((err) => console.log(err));
};

module.exports = sendNotification;
