const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;

const twilio = require("twilio");
const client = new twilio(accountSid, authToken);

module.exports = {
  sendText: function sendText() {
    client.messages.create({
      body: "You haven't tweeted your hashtag today!",
      to: process.env.PERSONAL_PHONE_NUMBER,
      from: process.env.TWILIO_PHONE_NUMBER
    });
  }
};
