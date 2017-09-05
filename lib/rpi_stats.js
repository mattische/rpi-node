var Exec = require('child_process').exec
var exports = module.exports = {};

exports.get_temp = function() {

  Exec("cat /sys/class/thermal/thermal_zone0/temp", function (err, stdout, stderr) {
   if (err !== null) {
     console.log("Error reading temp: " + err);
   }
   else {
     return parseFloat(stdout)/1000;
   }
  });
}


