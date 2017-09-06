var Exec = require('child_process').exec
var proc, temp;

var exports = module.exports = {};


function temp(tempCallback) {
  Exec("cat /sys/class/thermal/thermal_zone0/temp", function (err, stdout, stderr) {
  
  if (err !== null) {
     console.log("Error reading temp: " + err);
   }
   else {
     temp = parseFloat(stdout)/1000;
     tempCallback(temp);
   }
  });
}

exports.temp = temp;



