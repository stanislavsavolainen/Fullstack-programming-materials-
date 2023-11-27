const http = require("http");
const express = require("express");
const fs = require("fs");

const app = express();

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);


app.get('/products', function (req, res, next) {

    let productObject = {};

    let path = process.cwd();
    let buffer = fs.readFileSync(path + "/response1.json");
    //console.log(buffer.toString());
    productObject = JSON.parse( buffer.toString() );	

    res.send(productObject);

});


app.get('/categories', function (req, res, next) {

    let categoriesObject = {};

    let path = process.cwd();
    let buffer = fs.readFileSync(path + "/response2.json");
    console.log(buffer.toString());
    categoriesObject = JSON.parse( buffer.toString() );	
   
    res.send(categoriesObject);

});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
   
    console.log("Example app listening at http://%s:%s", host, port)
})


