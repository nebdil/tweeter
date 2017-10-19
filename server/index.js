"use strict";

// MONGODB setup:
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

// Basic express setup:
const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.log(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  // Connection to the "tweeter" db
  console.log(`Connected to mongodb: ${MONGODB_URI}`);
    // Interface to the database of tweets
    const DataHelpers = require("./lib/data-helpers.js")(db);
    // Define routes that use the DataHelpers object to interact with the data layer
    const tweetsRoutes = require("./routes/tweets")(DataHelpers);
    // Mount the tweets routes at the "/tweets" path prefix
    app.use("/tweets", tweetsRoutes);
    // db.close();
  });

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
