const Twitter = require("twitter");
const moment = require("moment");

const index = require("./index");

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

module.exports = {
  checkIfPosted: async function checkIfPostedForDay() {
    let lastRelevantTweetID = "1009109400051576800";

    const params = {
      screen_name: "compscilauren",
      since_id: lastRelevantTweetID
    };

    return new Promise((resolve, reject) => {
      client.get("statuses/user_timeline", params, function(error, tweets) {
        if (error) {
          return reject(error);
        }

        const tweetTexts = tweets.map(tweets => tweets.text);
        const tweetTimes = tweets.map(tweets => tweets.created_at);

        const filteredTweetTimes = [];
        for (let i = 0; i < tweetTimes.length; i++) {
          if (tweetTexts[i].includes("#100DaysOfCode")) {
            filteredTweetTimes.push(tweetTimes[i]);
          }
        }

        const isThereTweetForCurrentDay = filteredTweetTimes.some(tweetTime =>
          moment(tweetTime).isSame(moment(), "day")
        );
        resolve(isThereTweetForCurrentDay);
      });
    });
  },
  createEvents: async function createEventsForCalendar(
    twitterhandle,
    hashtag,
    testSMS,
    phonenumber
  ) {
    const params = {
      screen_name: twitterhandle
    };

    return new Promise((resolve, reject) => {
      client.get("statuses/user_timeline", params, function(error, tweets) {
        if (error) {
          return reject(error);
        }

        const dateMap = {};
        for (let i = 0; i < tweets.length; i++) {
          const date = moment(tweets[i].created_at);
          const dateStr = date.format("MM-DD-YYYY");

          if (!dateMap[dateStr]) {
            dateMap[dateStr] = { hasHashTag: false };

            if (tweets[i].text.includes("#" + hashtag)) {
              dateMap[dateStr] = { hasHashTag: true, id_str: tweets[i].id_str };
            }
          }
        }
        if (testSMS == "Yes") {
          index.sendText(phonenumber);
        }
        resolve(dateMap);
      });
    });
  }
};
