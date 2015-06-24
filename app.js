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
        response.render('auth', { title: 'Authorize via Twitter', message: 'Copy the below link, using a browser and get a auth token', auth: "https://api.twitter.com/oauth/authorize?oauth_token="+requestToken , action:"get_access_token"});
        //response.redirect(302,"https://api.twitter.com/oauth/authorize?oauth_token="+requestToken);
    }
  });
});

app.get("/get_access_token", function(request, response){
  response.render("access_token");
});

app.post("/get_access_token", function(request, response){
  response.send("Page to validate the access code");

});

app.get("/", function(request,response){
  gui.App.clearCache();
  if (process.platform === "darwin") {
    var mb = new gui.Menu({type: 'menubar'});
    mb.createMacBuiltin('RoboPaint', {
      hideEdit: false,
    });
    gui.Window.get().menu = mb;
  }
  response.render('index', { title: 'Hey', message: 'Hello There', login: 'twitter_access'});
});


var server = app.listen(2335, function(error){
  if(error){
    console.log(error.message);
  }else{
    console.log("Server started successfully at 2335!");
  }
});
