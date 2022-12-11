const https = require("https");
const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
require('dotenv').config()

app.use(bodyParser.json());

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

const serverUtilityFunctions = require('./utils.js');
const databaseFunctions = require('./databasehandler.js');

app.get("/profile", async function (req, res) {

    let dbData = await databaseFunctions.testMSG();

    let dataObj = {
        userId : serverUtilityFunctions.uuidToString(),
        username : "admin",
        passwordSha256: serverUtilityFunctions.passwordSha256ToString(process.env.TEST_PASSWORD),
        registerDate:   serverUtilityFunctions.timestampToString(),
        lastOnlineDate: serverUtilityFunctions.timestampToString(),
        isBlocked : "false",
        dbElement : dbData
	}
	
     // reject(`Network error when trying to reach ${url}`);
     res.send(dataObj);	 

});

const options = {
    key: fs.readFileSync(process.env.SSL_KEY),
    cert: fs.readFileSync(process.env.SSL_CERT),
};

https.createServer(options, app)
.listen(process.env.HTTPS_PORT, function (req, res) {
    console.log("Server https started at port "+process.env.HTTPS_PORT);
});