var Exec = require('child_process').exec

var exports = module.exports = {};

function uname(unameCallback) {
  Exec("uname -a", function (err, stdout, stderr) {
    
    if (err !== null) {
       console.log("Error reading uname: " + err);
     }
     else {
       un = stdout;
       unameCallback(un);
     }
    });
}

exports.uname = uname;

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



