"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  const ObjectId = require('mongodb').ObjectId;
  return {
    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, callback);
    },
    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback);
    },
    // Save the like count when the tweet is liked or disliked
    saveLikes: function(id, like, by, callback) {
      like.likes = parseInt(like.likes);
      // console.log(like.likes);
      like.likes += by;
      db.collection("tweets").update({"_id" : ObjectId(`${id}`)}, {$set: {'likes': like.likes}}, callback);
      // console.log(like.likes);
      }
    }
  };
