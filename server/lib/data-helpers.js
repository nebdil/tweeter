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
    saveLikes: function(id, like, callback) {
      // console.log(ObjectId);
      // console.log(id);
      console.log("like.likes: " + like.likes);
      if (like.likes == 1) {
        db.collection("tweets").update({"_id" : ObjectId(`${id}`)}, {$set: {'likes': 0 }}, {upsert: true}, callback);
        // return like.likes = 1;
        console.log('decremented');
        like.likes = 0;
        console.log("new like.likes: " + like.likes);
      } else if (like.likes == 0) {
        db.collection("tweets").update({"_id" : ObjectId(`${id}`)}, {$set: {'likes': 1 }}, {upsert: true}, callback);
        // return like.likes = 0;
        console.log('incremented');
        like.likes = 1;
        console.log("new like.likes: " + like.likes);
      }
    }
  };
}
