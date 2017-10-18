/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from tweets.json
// var data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];

//TIME
function calculateSince(datetime)
{
  var tTime=new Date(datetime);
  var cTime=new Date();
  var sinceMin=Math.round((cTime-tTime)/60000);
  if(sinceMin==0)
  {
      var sinceSec=Math.round((cTime-tTime)/1000);
      if(sinceSec<10)
        var since='less than 10 seconds ago';
      else if(sinceSec<20)
        var since='less than 20 seconds ago';
      else
        var since='half a minute ago';
  }
  else if(sinceMin==1)
  {
      var sinceSec=Math.round((cTime-tTime)/1000);
      if(sinceSec==30)
        var since='half a minute ago';
      else if(sinceSec<60)
        var since='less than a minute ago';
      else
        var since='1 minute ago';
  }
  else if(sinceMin<45)
      var since=sinceMin+' minutes ago';
  else if(sinceMin>44&&sinceMin<60)
      var since='about 1 hour ago';
  else if(sinceMin<1440){
      var sinceHr=Math.round(sinceMin/60);
  if(sinceHr==1)
    var since='about 1 hour ago';
  else
    var since='about '+sinceHr+' hours ago';
  }
  else if(sinceMin>1439&&sinceMin<2880)
      var since='1 day ago';
  else
  {
      var sinceDay=Math.round(sinceMin/1440);
      var since=sinceDay+' days ago';
  }
  return since;
};


//TIME

// var errorDB = {
//   emptyString: 'You are trying to submit an empty tweet',
//   longInput: 'You have exceeded the letter limit'
// }

var createTweetElement = function(tweet) {
  // Clone of the hidden article template from the DOM
  var $article = $('#article-template').clone();
  var time = calculateSince(tweet['created_at']);
  // var $errorM = $('#errorMessage').clone();
  // Remove hidden property from Clone
  $article.removeAttr('hidden');
  // Add full name
  $article.find('.full-name').text(tweet['user']['name']);
  $article.find('.handle').text(tweet['user']['handle']);
  $article.find('.duration').text(time);
  $article.find('.tweet').text(tweet['content']['text']);
  // cross-site scripting
  $article.find('.avatar').attr("src", (tweet['user']['avatars']['small']));
  return $article;
}

var renderTweets = function(tweets) {
  var loopedTweets = tweets.map(createTweetElement);
  $('#all-tweets').prepend(loopedTweets);
};

  // var $tweet = renderTweets(data);
  // // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // $('#all-tweets').append($tweet);
   // to add it to the page so we can make sure it's got all the right elements, classes, etc.
$(function(){
  $('#form').submit(function (event) {
    console.log('Button clicked, performing ajax call...');
    event.preventDefault();
    var textInput = $(this).find('textarea').val();
    var textInputLength = $(this).find('textarea').val().length;
    // console.log(textInputLength);
    if (!textInput) {
      alert('There is nothing to tweet!');
    } else if (textInputLength > 140) {
      alert('The tweet exceeds the letter limit');
    } else {
      $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: $(this).serialize(),
        success: function (newPost) {
          // console.log(newPost);
          renderTweets([newPost]);
        }
      });
      this.reset();
    }
  });
  // renderTweets(data);

  var loadTweets = function() {
    $.ajax({
      url: '/tweets/',
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        // console.log(res);
        renderTweets(res);
      }
    });
  };
  loadTweets();

  $('.compose').on('click', function() {
    $('.new-tweet').slideToggle("slow");
    $('textarea').focus();
  });
});
