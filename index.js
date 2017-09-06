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
//Returns wlan0 ip v4-, and ip v6-adresses for wlan0
app.get("/ip", function(req, res) {
  console.log("ip route hit...");

  Rpi.ip(function(ipData) {
    ipv4 = ipData[0].substring(5, ipData[0].length);
    ipv6 = ipData[1].substring(6, ipData[1].length);
    
    res.send({ip_adresses: {inet: ipv4, inet6: ipv6}});
  });
});

//Route /ipv4
//Returns ip v4-adress for wlan0
app.get("/ipv4", function(req, res) {
  console.log("ipv4 route hit...");

  Rpi.ip(function(ipData) {
    ipv4 = ipData[0].substring(5, ipData[0].length);
    
    res.send({inet: ipv4});
  });
});


//Route /essid
//Returns essid for wlan0
app.get("/essid", function(req, res){
  console.log("essid route hit...");

  Rpi.essid(function(essidData){
    es = essidData[0].substring(7, essidData[0].length-1);
    res.send({essid: es});
  });
});

app.get("/uptime", function(req, res) {
  console.log("uptime route hit...");

  Rpi.uptime(function(upData) {
    res.send({uptime: upData});
  });
});

app.get("/", function(req, res) {
  res.send("hey");
});


app.listen(3000, function() {
  console.log("server started");
  
});
