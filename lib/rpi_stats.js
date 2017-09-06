var Exec = require('child_process').exec

var exports = module.exports = {};

/**
 * Returns result from uname -a
 * @param {*callback} unameCallback 
 */
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

/**
 * Returns stdout result wlan0 ipv4 and ipv6 addresses
 * @param {*callback} ipCallback 
 */
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


/**
 * Returns stdout result for ESSID for wlan0
 * @param {*callback} essidCallback 
 */
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


/**
 * Returns result of stdout for cpu temperature
 * @param {*callback} tempCallback 
 */
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



