var express = require('express');
var path = require('path');
var app = express();

var port = 8082;

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}

app.use(express.static("public"));

app.get("*", function( req, res){
  res.sendFile(path.join (__dirname, "public", "index.html"))
});

app.use(allowCrossDomain);

app.listen(port, function(){
	console.log("Hosting Onlineshop react project " + port);
})
