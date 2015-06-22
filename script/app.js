var express = require("express");
var app = express();
var twitterAPI = require('node-twitter-api');

var twitter = new twitterAPI({
    consumerKey: 'unknown',
    consumerSecret: 'unknowm',
    callback: 'oob'
});
var params = { nonce : 'DCBgDRabcdefghihdjskjsdfjksdafkjhadfjkhsadkjfh', timestamp: 1434946770};

app.get("/twitter_access", function(request,response){
  twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
    if (error) {
        response.send(error);
    } else {
        response.redirect(301,"https://twitter.com/oauth/authenticate?oauth_token="+requestToken);
    }
  });
});
app.get("/", function(request,response){
  response.send("<a href=\"twitter_access\">Check the Twitter Access</a>");
});


var server = app.listen(2332, function(error){
  if(error){
    console.log(error.message);
  }else{
    console.log("Server started successfully at 2332!");
  }
});
