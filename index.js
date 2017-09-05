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

  child = Exec("cat /sys/class/thermal/thermal_zone0/temp", function (err, stdout, stderr) {
    if (err !== null) {
       console.log("Error reading temp: " + err);
    } 
    else {
      var temp = parseFloat(stdout)/1000;
       res.send(JSON.stringify({temperature: temp }));
    }
  });

});


app.get("/", function(req, res) {
  res.send("hey");
});


app.listen(3000, function() {
  console.log("server started");
  console.log("cpu temp; " + Rpi.cpu_temp());

});
