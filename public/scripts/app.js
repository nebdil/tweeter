// Timestamp to normal time:

function calculateSince(datetime) {
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


// Constructing the new tweet HTML via cloning the HTML template that was made in index.html, which is hidden

var createTweetElement = function(tweet) {
  let time = calculateSince(tweet['created_at']);
  // Clone of the hidden article template from the DOM
  let $article = $('#article-template').clone();
  // Remove hidden property from Clone
  $article.removeAttr('hidden');
  // Retrieve and add user & tweet info
  $article.find('.full-name').text(tweet['user']['name']);
  $article.find('.handle').text(tweet['user']['handle']);
  $article.find('.duration').text(time);
  $article.find('.tweet').text(tweet['content']['text']);
  $article.find('.avatar').attr("src", (tweet['user']['avatars']['small']));
  $article.find('#like-button').attr('data-id', tweet['_id']);
  $article.find('.like-counter').text(tweet['likes']);
  $article.find('.like-counter').attr('data-likes', tweet['likes']);
  // Decide whether the tweet has a like or not
  if (tweet['likes'] === 1) {
    $article.find('#like-button').removeClass('fa-heart-o').addClass('fa-heart');
  }
  if (tweet['likes'] === 0) {
    $article.find('#like-button').removeClass('fa-heart').addClass('fa-heart-o');
  }
  return $article;
}

// Take in an array and prepend them into the container by making use of the createTweetElement function

const renderTweets = function(tweets) {
  let loopedTweets = tweets.map(createTweetElement);
  loopedTweets.forEach(function(e) {
    $('#all-tweets').prepend(e);
    bindLikeButton();
  });
};

// Like button function

var bindLikeButton = function () {
  $('#like-button').click(function () {
    let likes = parseInt($(this).parent().parent().find('.like-counter').html());
    let likesObj = {'likes': likes};
    let id = $(this).attr('data-id');
    $(this).toggleClass('fa-heart-o fa-heart');
    let $likeCounter = $(this).parent().parent().find('.like-counter');
    $.ajax({
      url: `/tweets/${id}`,
      method: 'POST',
      dataType: 'json',
      data: likesObj,
      success: function(info) {
        $likeCounter.attr('data-likes', info);
        $likeCounter.html(info);
      }
    })
  });
}

// Start using JQuery when the document is ready
$(function(){
//once the new tweet is submitted by the user:
  $('#form').submit(function (event) {
    event.preventDefault();
    //do it async, page shouldn't be redirected
    var textInput = $(this).find('textarea').val();
    var textInputLength = $(this).find('textarea').val().length;
    if (!textInput) { //if nothing was written
      alert('There is nothing to tweet!');
    } else if (textInputLength > 140) {
      alert('The tweet exceeds the letter limit');
    } else { //if everything is correct: send the new tweet to the db
      $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: $(this).serialize(),
        success: function (newPost) {
          renderTweets([newPost]);
        }
      });
      this.reset(); //erase the tweet from the textarea
      $('.counter').text(140);
    }
  });

// Get the tweets on the page once you navigate to the page

var loadTweets = function() {
   $.ajax({
     url: '/tweets/',
     method: 'GET',
     dataType: 'json',
     success: function(res) {
       renderTweets(res);
     }
   });
 };
 loadTweets();

// Once clicked, compose button will show the form to write a tweet & automatically the textarea is focused

  $('.compose').on('click', function() {
    $('.new-tweet').slideToggle("slow", function() {
      $('textarea').focus();
    });
  });

});
