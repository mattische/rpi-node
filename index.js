var Express = require("express");
var Bodyparser = require("body-parser");
var Exec = require("child_process").exec, child;
var fs = require("fs");

var Rpi = require("./lib/rpi_stats");

var app = Express();
app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({ extended: true }));

//Route /temp
//Returns CPU temperature
app.get("/temp", function(req, res) {
  console.log("temp route hit...");
  Rpi.temp(function(tempData) {
    res.send({rpi_cpu_temperature: tempData});
  });
});

//Route /uname
//Returns uname -a (proc architecture etc)
app.get("/uname", function(req, res) {
  console.log("uname route hit...");

  Rpi.uname(function(unameData) {
    res.send({uname: unameData});
  });
});

//Route /ip
//Returns ip v4-, and ip v6-adresses
app.get("/ip", function(req, res) {
  console.log("ip route hit...");

  Rpi.ip(function(ipData) {

    res.send({ip_adresses: {ipv4: ipData[0], ipv6: ipData[1]}});
  });
});

app.get("/", function(req, res) {
  res.send("hey");
});


app.listen(3000, function() {
  console.log("server started");
  
});
