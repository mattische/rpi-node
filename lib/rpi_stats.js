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


function ip(ipCallback) {
  Exec("ifconfig wlan0 | grep inet | awk '{ print $1 \" \" $2 }'", function (err, stdout, stderr) {
    
    if (err !== null) {
       console.log("Error reading temp: " + err);
     }
     else {
       ipdata = stdout.split("\n");
       ipCallback(ipdata);
     }
    });
}
exports.ip = ip;


function essid(essidCallback) {
  Exec("iwconfig wlan0 | grep ESSID | awk '{ print $4 }'", function (err, stdout, stderr) {
    
    if (err !== null) {
       console.log("Error reading temp: " + err);
     }
     else {
       essidData = stdout.split("\n");
       essidCallback(essidData);
     }
    });
}
exports.essid = essid;

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



