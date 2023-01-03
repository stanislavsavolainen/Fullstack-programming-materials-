const https = require("https");
const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
require('dotenv').config()
const path = require('path');

app.use(bodyParser.json());

//share some html files in backend server -> document are available inside this folder
app.use(express.static("public_html"));

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
        userId: serverUtilityFunctions.uuidToString(),
        username: "admin",
        passwordSha256: serverUtilityFunctions.passwordSha256ToString(process.env.TEST_PASSWORD),
        registerDate: serverUtilityFunctions.timestampToString(),
        lastOnlineDate: serverUtilityFunctions.timestampToString(),
        isBlocked: "false",
        dbElement: dbData
    }

    // reject(`Network error when trying to reach ${url}`);
    res.send(dataObj);

});


app.get("/user", async function (req, res) {

    console.log("User triggerd without params")

    res.send([{ msg: "all users", action: "GET" }])

});


app.get("/user/:userUUID", async function (req, res) {

    let paramUserUUID = req.params.userUUID;

    console.log("get user by id triggered with param :" + paramUserUUID);

    res.send({ msg: "user is updated uuid " + paramUserUUID, action: "GET" });
});
app.post("/user", async function (req, res) {
    res.send("write user = register user ");
});


app.put("/user/:userUUID", async function (req, res) {

    let paramUserUUID = req.params.userUUID;

    console.log("update user triggered with param  : " + paramUserUUID);

    //this service is unavailable at the moment
    //let dbData = await databaseFunctions.updateUser(paramUserUUID)

    res.send({ msg: "user is updated uuid " + paramUserUUID, action: "PUT" })
});




app.delete("/user/:userUUID", async function (req, res) {

    let paramUserUUID = req.params.userUUID;

    console.log("delete user triggered with param  : " + paramUserUUID);

    //this service is unavailable at the moment
    //let dbData = await databaseFunctions.deleteUser(paramUserUUID);

    res.send({ msg: "user is updated uuid " + paramUserUUID, action: "DELETE" })
});

const options = {
    key: fs.readFileSync(process.env.SSL_KEY),
    cert: fs.readFileSync(process.env.SSL_CERT),
};

https.createServer(options, app)
    .listen(process.env.HTTPS_PORT, function (req, res) {
        console.log("Server https started at port " + process.env.HTTPS_PORT);
        console.log(__dirname);
    });