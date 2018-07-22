const express = require("express");
const app = express();
const moment = require("moment");

const twitterTesting = require("./twitterTesting");

app.use(express.static("static"));
app.set("view engine", "ejs");
app.set("views", process.cwd() + "/views");

app.get("/", async function(req, res) {
  const result = await twitterTesting.checkIfPosted();
  res.render("index", { posted: result });
});

app.get("/tweetStatus", (req, res) => {
  const { twitterhandle, hashtag, testSMS, phonenumber } = req.query;

  twitterTesting.createEvents(twitterhandle, hashtag, testSMS, phonenumber).then(dateMap => {
    res.json(dateMap);
  });
});

app.listen(5000, function() {
  console.log("Dev app listening on port 5000!");
});

// setInterval(function sendTextMessageOnInterval() {
//   if (moment().hours() == 20) {
//     twitterTesting.checkIfPosted().then(result => {
//       if (result == true) {
//         console.log("User tweeted today.");
//       } else {
//         index.sendText();
//         console.log("Sent user SMS reminding them to tweet today.");
//       }
//     });
//   }
// }, 60000);
