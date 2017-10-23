"use strict";

const userHelper    = require("../lib/util/user-helper");
const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {
  // Call the getTweets function from DataHelpers, throw an error if anything goes wrong, if not print out the tweets
  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
          res.json(tweets);
        }
      })
    });
  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }
    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now(),
      likes: 0
    };
    // Call the saveTweet function from DataHelpers, throw an error if anything goes wrong, if not save the tweet
    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json(tweet);
      }
    });
  });
  // Call the saveLikes function from DataHelpers, throw an error if anything goes wrong, if not save the like
  tweetsRoutes.post('/:id', function(req, res) {
    if (req.body.heart == 0) {
      DataHelpers.saveLikes(req.params.id, req.body, 1, (err) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          // let num = parseInt(req.body.likes);
          res.status(201).json(req.body);
        }
      })
    }
    if (req.body.heart == 1) {
      DataHelpers.saveLikes(req.params.id, req.body, -1, (err) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.status(201).json(req.body);
        }
      })
    }
  });
  return tweetsRoutes;
};
