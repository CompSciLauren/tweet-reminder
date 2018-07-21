const Twitter = require('twitter');
 
const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

const params = {screen_name: 'compscilauren', count: '10'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    const userTweets = tweets.map(tweets => tweets.text);
    const filteredUserTweets = userTweets.filter(userTweets => userTweets.includes('#100DaysOfCode'));
    console.log(filteredUserTweets);
  }
});