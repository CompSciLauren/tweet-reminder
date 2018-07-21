const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
console.log("accountSid", process.env.ACCOUNTSID)
console.log("authToken", process.env.AUTHTOKEN);
const twilio = require('twilio');
const client = new twilio(accountSid, authToken);
console.log(client);
client.messages.create({
    body: 'Hello from CompSciLauren!!!',
    to: process.env.PERSONAL_PHONE_NUMBER,
    from: process.env.TWILIO_PHONE_NUMBER
})
.then((message) => console.log(message.sid));