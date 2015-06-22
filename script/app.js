var express = require("express");
var app = express();


app.get("/", function(request,response){
  response.send("Hello World");
});

var server = app.listen(2332, function(error){
  if(error){
    console.log(error.message);
  }else{
    console.log("Server started successfully at 2332!");
  }
});
