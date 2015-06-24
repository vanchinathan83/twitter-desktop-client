var express = require("express");
var app = express();
var http = require('http')
var twitterAPI = require('node-twitter-api');
var session = require('express-session');
var gui = require('nw.gui');
var twitter = new twitterAPI({
    consumerKey: '4nIqngF4BsRGolE2N1E0AHDby',
    consumerSecret: 'LAV4yIEqZFYxdKp3AmRhR7ECpzZUAl6Wax6zStwePkGDDyp3j9',
    callback: 'oob'
});

//Intializing express js
app.use(express.static('public'));
app.set('view engine','jade');

var params = { nonce : 'DCBgDRabcdefghi34hdjskjsdfjksdafkjhadfjkhsadkjfh', timestamp: Math.floor(Date.now() / 1000)};

app.get("/twitter_access", function(request,response){
  twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
    if (error) {
        response.send(error);
    } else {
        session.requestToken = requestToken;
        response.redirect(302,"https://api.twitter.com/oauth/authorize?oauth_token="+requestToken);
    }
  });
});

app.get("/", function(request,response){
  gui.App.clearCache();
  response.render('index', { title: 'Hey', message: 'Hello There', login: 'twitter_access'});
});


var server = app.listen(2335, function(error){
  if(error){
    console.log(error.message);
  }else{
    console.log("Server started successfully at 2335!");
  }
});
