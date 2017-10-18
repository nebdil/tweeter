/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from tweets.json
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];




var renderTweets = function(tweets) {
  var $loopedTweets = tweets.map(createTweetElement);
  return $loopedTweets;
};

var createTweetElement = function(tweet) {
  // Clone of the hidden article template from the DOM
  var $article = $('#article-template').clone();
  // Remove hidden property from Clone
  $article.removeAttr('hidden')
  // Add full name
  $article.find('.full-name').text(tweet['user']['name'])
  $article.find('.handle').text(tweet['user']['handle'])
  $article.find('.duration').text(Date(tweet['created_at']))
  $article.find('.tweet').text(tweet['content']['text'])
  $article.find('.avatar').attr("src", (tweet['user']['avatars']['small']))
  return $article
}

$(function() {
  var $tweet = renderTweets(data);
  //
  // // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#all-tweets').append($tweet);
   // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});
