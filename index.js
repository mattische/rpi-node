var Express = require("express");
var Bodyparser = require("body-parser");
var Exec = require("child_process").exec, child;
var fs = require("fs");

var Rpi = require("./lib/rpi_stats");

var app = Express();
app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({ extended: true }));


app.get("/temp", function(req, res) {
  console.log("temp route hit...");
  Rpi.temp(function(tempData) {
    res.send({temperature: tempData});
  });
});

app.get("/uname", function(req, res) {
  console.log("uname route hit...");

  Rpi.uname(function(unameData) {
    res.send({uname: unameData});
  });
});


app.get("/", function(req, res) {
  res.send("hey");
});


app.listen(3000, function() {
  console.log("server started");
  
});
