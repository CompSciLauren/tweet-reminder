const Twitter = require("twitter");
const moment = require("moment");

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

let lastRelevantTweetID = "1020532668457418800";

const params = { screen_name: "compscilauren", since_id: lastRelevantTweetID };
client.get("statuses/user_timeline", params, function(error, tweets, response) {
  if (!error) {
    const tweetTexts = tweets.map(tweets => tweets.text);
    const tweetTimes = tweets.map(tweets => tweets.created_at);

    const filteredTweets = tweetTexts.filter(tweetTexts =>
      tweetTexts.includes("#100DaysOfCode")
    );

    if (filteredTweets != "") {
      for (let i = 0; i < filteredTweets.length; i++) {
        if (moment(tweetTimes[i]).isSame(moment(), "day")) {
          console.log("You have already tweeted the desired hashtag today.");
        } else {
          console.log("You have not tweeted the desired hashtag today.");
        }
      }
    } else {
      console.log("You have not tweeted the desired hashtag today.");
    }
  }
});
