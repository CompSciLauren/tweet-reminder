const express = require("express");
const app = express();

const twitterTesting = require("./twitterTesting");
const index = require("./index");

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/views");

const checkIfPostedToday = () => true;

app.get("/", function(req, res) {
  const result = checkIfPostedToday();
  res.render("index", { posted: result });
});

app.listen(5000, function() {
  console.log("Dev app listening on port 5000!");
});

setInterval(function sendTextMessageOnInterval() {
  twitterTesting.checkIfPosted().then(result => {
    if (result == true) {
      console.log("User tweeted today.");
    } else {
      index.sendText();
      console.log("Sent user SMS reminding them to tweet today.");
    }
  });
}, 10000);
