var Exec = require('child_process').exec
var exports = module.exports = {};

exports.get_temp = Exec("cat /sys/class/thermal/thermal_zone0/temp", function (err, stdout, stderr) {
  var tmp = this; 
  var temp = 0;
  if (err !== null) {
     console.log("Error reading temp: " + err);
   }
   else {
     temp = parseFloat(stdout)/1000;
   }
   tmp.temp = temp;
   return tmp.temp;
  });



