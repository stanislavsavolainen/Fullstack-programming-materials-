//https://www.geeksforgeeks.org/how-to-create-https-server-with-node-js/

var https_port = 3000;
var http_port = 3001;

// Requiring in-built https for creating
// https server
const https = require("https");
const http = require("http");
  
// Express for handling GET and POST request
const express = require("express");
const app = express();
  
// Requiring file system to use local files
const fs = require("fs");
  
// Parsing the form of body to take
// input from forms
const bodyParser = require("body-parser");
  
// Configuring express to use body-parser
// as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
  
// Get request for root of the app
app.get("/", function (req, res) {
  
  // Sending index.html to the browser
  res.sendFile(__dirname + "/public_html/index.html");
});
 
app.get("/profile", function (req, res) {
  
  let clientHost = req.get('host');
  let clientUrl = req.get('url');
  let clientProtocol = req.protocol;
  let serverResponse="";
  serverResponse +="<font color='green'>server response for :"+clientHost+ " and protocol:"+clientProtocol+ "</font>";
  if(clientProtocol === "https"){ 
    serverResponse += "<br> you're connection is secured";
    serverResponse += "<br><a href='"+clientProtocol+"://127.0.0.1:"+https_port+"/'> back to index page </a>";   
  }
  else if(clientProtocol === "http") { 
    serverResponse += "<br> you're connection is unsecure, we strongly recommend use https-protocol";
    serverResponse += "<br><a href='"+clientProtocol+"://127.0.0.1:"+http_port+"/'> back to index page </a>";  
  }
  else serverResponse += "<br> undefined web-protocol !";
    

  res.send(serverResponse);

});

  
// Creating object of key and certificate
// for SSL
const options = {
  key: fs.readFileSync("ssl_certificates/server.key"),
  cert: fs.readFileSync("ssl_certificates/server.cert"),
};
  
// Creating https server by passing
// options and app object
https.createServer(options, app)
.listen(https_port, function (req, res) {
  console.log("Server https started at port "+https_port);
});

http.createServer(options, app)
.listen(http_port, function (req, res) {
  console.log("Server http started at port"+http_port);
});
