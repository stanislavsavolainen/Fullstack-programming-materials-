const https = require("https");
const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
require('dotenv').config()
const path = require('path');
const { validationResult } = require('express-validator');

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

app.get("/users", async function (req, res) {    

   let dbData = { msg :  "data not found" }; 
   dbData = await databaseFunctions.getAllUsers();
    
    if(dbData.length == 0) dbData = { msg :  "data not found" }; 

    let DataArrayTemplate = {
        method :"GET",
        apiCall: "/users",
        msg : dbData
    }    

    res.send(DataArrayTemplate);

});

app.post("/authenticate", serverUtilityFunctions.authenticateValidate , async function (req, res) {

    console.log("authenticate triggered");

    let error = validationResult(req);

    if( error.isEmpty()){

        let checkPasswordSha256hash = serverUtilityFunctions.passwordSha256ToString(req.body.paramPassword);
        let checkUsername = req.body.paramLogin;
        let dbData = await databaseFunctions.getAllUsers();
        let myProfile = {};
        let dataFound = false;

        if( dbData.length != 0 ){

            dbData.forEach(function (dbElement) {

                let dbUserName = dbElement.username;
                let dbPasswordHash = dbElement.password_hash_sha256;

                if( dbUserName == checkUsername && dbPasswordHash == checkPasswordSha256hash ){
                    
                    myProfile = dbElement;
                    dataFound = true;
                }

            });
        }

        if(dataFound) 
        res.send({ msg: myProfile, method: "POST", apiCall :"/authenticate" });
        
        else res.send({ 
            msg: "auth validation passed, data not found", 
            method: "POST", 
            apiCall :"/authenticate" 
        });
    
    } else {

        res.send({ 
                    msg: "error in auth validation", 
                    method: "POST",
                    apiCall : "/authenticate", 
                    errorArr : error.array() 
        });
    }
  
});




app.post("/registration", serverUtilityFunctions.registerValidate , async function (req, res) {
    //res.send("write user = register user ");

    let error = validationResult(req);

    if( error.isEmpty()){
      
        if( req.body.paramPassword === req.body.paramPassword2 ){

            let foundUsernameDublicate = false;

            let dbData = await databaseFunctions.getAllUsers();

            //find username dublicate in exsisting database data
            if( dbData.length != 0 ){

                dbData.forEach(function (dbElement) {

                    let userName = dbElement.username;

                    if( userName === req.body.paramLogin ){
                        foundUsernameDublicate = true;
                    }

                });
            }


            if( ! foundUsernameDublicate ){

                /*  
                mysql> desc user_table1;
                +-----------------------+--------------+------+-----+---------+----------------+
                | Field                 | Type         | Null | Key | Default | Extra          |
                +-----------------------+--------------+------+-----+---------+----------------+
                | row_id                | int          | NO   | PRI | NULL    | auto_increment |
                | user_uuid             | varchar(36)  | YES  |     | NULL    |                |
                | password_hash_sha256  | varchar(64)  | YES  |     | NULL    |                |
                | user_is_blocked       | tinyint      | YES  |     | NULL    |                |
                | user_permission_level | tinyint      | YES  |     | NULL    |                |
                | user_is_online        | tinyint      | YES  |     | NULL    |                |
                | registered_date       | datetime     | YES  |     | NULL    |                |
                | last_online_date      | datetime     | YES  |     | NULL    |                |
                | user_maintenance_info | varchar(500) | YES  |     | NULL    |                |
                | username              | varchar(40)  | YES  |     | NULL    |                |
                +-----------------------+--------------+------+-----+---------+----------------+
                10 rows in set (0,01 sec)
                */


                var userObject = {
                    username: req.body.paramLogin,
                    password_hash_sha256: serverUtilityFunctions.passwordSha256ToString(req.body.paramPassword),
                    user_uuid: serverUtilityFunctions.uuidToString(),
                    user_is_blocked: 0,
                    user_permission_level: 0,
                    user_is_online: 0,
                    registered_date: serverUtilityFunctions.timestampToString(),
                    last_online_date: serverUtilityFunctions.timestampToString(),
                    user_maintenance_info: "default user, nothing to say",
                };

                await databaseFunctions.registerUser(userObject)
        
                res.send({ 
                    msg: "registration complete users in system is : " + dbData.length, 
                    
                    method: "POST",
                    apiCall : "/registration", 
                });


            } else {

                res.send({ 
                    msg: "error in registerion", 
                    method: "GET", 
                    apiCall : "/registration",
                    errorArr : [{"msg": "this username is already used !"}] 
                });

            }


        } else {

            res.send({ 
                msg: "error in register validation", 
                method: "POST", 
                apiCall : "/registration",
                errorArr : [{"msg": "passwords not match"}] 
            });

        }

    } else {

        res.send({ 
            msg: "error in register validation", 
            method: "POST", 
            apiCall : "/registration",
            errorArr : error.array() 
        });
       
    }

});


app.get("/user/:userUUID", serverUtilityFunctions.validateUUID , async function (req, res) {

    let error = validationResult(req);

    if( error.isEmpty()){
        let paramUserUUID = req.params.userUUID;
        console.log("get user by id triggered with param :" + paramUserUUID);

       let dbObject =  await databaseFunctions.getSelectedUserByUUID( paramUserUUID )

        res.send({ msg: dbObject , method: "GET", apiCall : "/user/:userUUID" });
    } else {

        res.send({ 
                    msg: "error in UUID validation ", 
                    action: "GET", 
                    errorArr : error.array() 
                });
    }
  
   
});


app.put("/user/:userUUID", async function (req, res) {

    let paramUserUUID = req.params.userUUID;

    console.log("update user triggered with param  : " + paramUserUUID);

    //this service is unavailable at the moment
    //let dbData = await databaseFunctions.updateUser(paramUserUUID)

    res.send({ msg: "user is updated uuid " + paramUserUUID, method: "PUT" })
});




app.delete("/user/:userUUID", async function (req, res) {

    let paramUserUUID = req.params.userUUID;

    console.log("delete user triggered with param  : " + paramUserUUID);

    //this service is unavailable at the moment
    //let dbData = await databaseFunctions.deleteUser(paramUserUUID);

    res.send({ msg: "user is updated uuid " + paramUserUUID, method: "DELETE" })
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

