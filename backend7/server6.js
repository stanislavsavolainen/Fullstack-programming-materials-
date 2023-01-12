const http = require("http");
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
const { send } = require("process");

var userConnectionArray = [];


function readProfileHTMLTemplate(){

    return new Promise((resolve, reject) => {
      //  fs.readFile(__dirname + "/public_html/profile1.html", function (error, html) {
        fs.readFile(__dirname + "/public_html/profile2.html", function (error, html) {
            if (error) {
            throw error;
            }         
            resolve(html);
        });

    })	 //Promise	

}


app.get("/profile/:connectionUUID", async function (req, res) {

    console.log("trigger profile endpoint ");

    let pageContent = "";
    let pageContentStr = "";
    let clientConnectionUUID = req.params.connectionUUID;
    let profileDataFound = false;
    let connectionIpAddressNotMatch = true;
    let clientIpAddress = req.socket.remoteAddress;

    pageContent = await readProfileHTMLTemplate();
   
    userConnectionArray.forEach( async function (connectionElement) {


        if( connectionIpAddressNotMatch ) {

        console.log("Connection element check param : "+ clientConnectionUUID + " vs " + connectionElement.connection_uuid );

         // connectionElement.connection_uuid;

        
        //don't allow other person connect to this authentication session
         if( clientIpAddress === connectionElement.clientIpAddress
            && clientConnectionUUID === connectionElement.connection_uuid
            ){
            connectionIpAddressNotMatch = false;
         } else connectionIpAddressNotMatch = true;
            


        if( clientConnectionUUID === connectionElement.connection_uuid ){
           
            pageContentStr = pageContent.toString();
            profileDataFound = true;
            console.log("connection found  !!!!!!!!!! ");

            let usr = connectionElement.connectionProfile.username;
            let last = connectionElement.connectionProfile.last_online_date;
            let reg =  connectionElement.connectionProfile.registered_date;
            let uid =  connectionElement.connectionProfile.user_uuid;


             //const user = "Node JS";
           pageContentStr = pageContentStr.replace("***username***", usr );
           pageContentStr = pageContentStr.replace("***lastonline***", last);
           pageContentStr = pageContentStr.replace("***register***", reg);
           pageContentStr = pageContentStr.replace("***uuid***", uid);
           	 
        }
    
        } // check ip-address

    });

    res.setHeader('Content-Type', 'text/html');
    if(profileDataFound &&  ! connectionIpAddressNotMatch)  res.send(""+pageContentStr);
    else if (profileDataFound && connectionIpAddressNotMatch){
        pageContentStr = "<html><body><div align='center'><font color='blue'><h1>ip-address not match with authentication-session</h1></font><<a href='/client1.html'>Back to login page</a></div></body></html>";
        res.send(pageContentStr);    
    }
    else {
        pageContentStr = "<html><body><div align='center'><font color='red'><h1>User not found</h1></font><a href='/client1.html'>Back to login page</a></div></body></html>";
        res.send(pageContentStr);   
    }


});


app.get("/publicusers", async function (req, res) {  

    let dbPublicUsers = await databaseFunctions.getAllUsersPublicInfoOnly()
    res.send(dbPublicUsers); 

})


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

    let clientIpAddress = req.socket.remoteAddress;
    console.log("client with ip address : " +clientIpAddress + "try to authenticate");
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

        if(dataFound){

            let userConnectionObject = {
                connection_uuid : serverUtilityFunctions.uuidToString(),
                clientIpAddress : clientIpAddress,
                connectionProfile : myProfile
                //user_uuid : myProfile.user_uuid,
                //auth_timestamp : serverUtilityFunctions.timestampToString(),
                //auth_password_hash : myProfile.password_hash_sha256
            };

            userConnectionArray.push( userConnectionObject );

            let lastTimeStr = serverUtilityFunctions.timestampToString()
            await databaseFunctions.setUserOnlineOrOfflineStatus( myProfile.user_uuid , 1, lastTimeStr );

            console.log("data found , connection object : "+ JSON.stringify(userConnectionObject) );
            //res.send({ msg: myProfile, method: "POST", apiCall :"/authenticate" });
            //res.redirect('/profile/'+userConnectionObject.connection_uuid);
        
            res.send({ url: '/profile/'+userConnectionObject.connection_uuid , msg: myProfile, method: "POST", apiCall :"/authenticate" });
        } 
      
        
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


app.get("/logout/:userUUID", serverUtilityFunctions.validateUUID , async function (req, res) {

    let error = validationResult(req);

    let clientIpAddress = req.socket.remoteAddress;

    if( error.isEmpty()){
        let paramUserUUID = req.params.userUUID;
        console.log("logout triggered with param :" + paramUserUUID);

        userConnectionArray.forEach( async function (item, index, object) {

            if( item.connection_uuid == paramUserUUID ){

                let userUUID = item.connectionProfile.user_uuid;

                object.splice(index, 1);
                let lastTimeStr = serverUtilityFunctions.timestampToString()
                await databaseFunctions.setUserOnlineOrOfflineStatus( userUUID , 0 , lastTimeStr );


                res.send({ 
                    msg: "user successfully logged out ", 
                    action: "GET",
                    apiCall : "/logout",
                    url: "/client1.html",
                    connectionUUID : "connection uuid : "+paramUserUUID +" is not valid anymore, please relogin"
                });

            } else {

                res.send({ 
                    msg: "logout problem", 
                    action: "GET",
                    apiCall : "/logout",  
                    errorArr : [{"msg" : "error in logout can't find user connection "}]
                });

            }

        });
       
    } else {

        res.send({ 
            msg: "error in UUID validation ", 
            action: "GET",
            apiCall : "/logout",  
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


app.get("/connections", async function (req, res) {
    res.send(userConnectionArray)
});


app.delete("/user/:userUUID", async function (req, res) {

    let paramUserUUID = req.params.userUUID;

    console.log("delete user triggered with param  : " + paramUserUUID);

    //this service is unavailable at the moment
    //let dbData = await databaseFunctions.deleteUser(paramUserUUID);

    res.send({ msg: "user is updated uuid " + paramUserUUID, method: "DELETE" })
});


app.get("/allmessages", async function (req, res) {

    let messageCollections = await databaseFunctions.readAllMessages();
    //res.send(messageCollections)

    res.send({ 
        msg: messageCollections, 
        action: "GET", 
        apiCall : "/allmessages",
       
    });

});


app.get("/readallmessages/:connectionUUID", async function (req, res) {

    let error = validationResult(req);
    let connectionUUIDVerified = false;
    let messageFilterModel = [];
    let selectedConnectionElement = {};

    if( error.isEmpty()){

        let messageCollections = await databaseFunctions.readAllMessages();
        let clientIpAddress = req.socket.remoteAddress;
        let clientConnectionUUID = req.params.connectionUUID;

        userConnectionArray.forEach( async function (connectionElement) {

            if( 
                clientConnectionUUID === connectionElement.connection_uuid 
                &&
                clientIpAddress == connectionElement.clientIpAddress
            ){
                connectionUUIDVerified = true;  
                selectedConnectionElement = connectionElement;
            }

        }); // for-each connections

        if(connectionUUIDVerified) {

            messageCollections.forEach( async function (messageElement) {
            /*
            mysql> desc message1;

            +------------------------+---------------+------+-----+---------+----------------+
            | Field                  | Type          | Null | Key | Default | Extra          |
            +------------------------+---------------+------+-----+---------+----------------+
            | row_id                 | int           | NO   | PRI | NULL    | auto_increment |
            | message_content        | varchar(5000) | YES  |     | NULL    |                |
            | sender_uuid            | varchar(36)   | YES  |     | NULL    |                |
            | person_receiver_uuid   | varchar(36)   | YES  |     | NULL    |                |
            | group_receiver_uuid    | varchar(36)   | YES  |     | NULL    |                |
            | timestamp              | datetime      | YES  |     | NULL    |                |
            | message_receiver_type  | varchar(16)   | YES  |     | NULL    |                |
            | message_visible_status | tinyint       | YES  |     | NULL    |                |
            +------------------------+---------------+------+-----+---------+----------------+
            8 rows in set (1,55 sec)

            mysql> 
            */

                let msgType = messageElement.message_receiver_type;
                let msgSender = messageElement.sender_uuid;
                let msgReceiver = messageElement.person_receiver_uuid;

                console.log(">>>>>>>>>>>>> read all messages <<<<<<<<<<<<<<<<<<");
                console.log(JSON.stringify(messageElement))
                console.log(">>>>>>>>>>>>>>>>>>>> <<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
                //always display all messages, if you are author
                if(msgSender === selectedConnectionElement.connectionProfile.user_uuid ) {
                    messageFilterModel.push(messageElement);
                    console.log(">>>>>>>>>>>>> read own messages <<<<<<<<<<<<<<<<<<");
                    console.log("Found my own messages")
                    console.log(">>>>>>>>>>>>>>>>>>>> <<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
                } 
                //if you are not author of message, then limit message view
                else {
                    
                    
                    console.log(">>>>>>>>>>>>> read not my messages <<<<<<<<<<<<<<<");
                    console.log("Found my own messages")
                   

                    //means that friend send you message
                    if(msgType === "private"){
                        if( msgReceiver === selectedConnectionElement.connectionProfile.user_uuid ){
                            messageFilterModel.push(messageElement);
                            console.log("private");
                        }
                    }
                    //personal means that you send message only for yourself, means only you can view message
                    //probaply not required ( because display always sender message )
                    else if(msgType === "personal"){
                        if( 
                            msgReceiver === selectedConnectionElement.connectionProfile.user_uuid 
                            &&
                            msgSender === selectedConnectionElement.connectionProfile.user_uuid
                            &&
                            msgReceiver === msgSender
                        ){
                            console.log("personal");
                            messageFilterModel.push(messageElement);
                        }
                    }

                    else if(msgType == "public"){
                        console.log("public");
                        messageFilterModel.push(messageElement);
                    }

                    else if(msgType == "group"){
                        console.log("group");
                        // you have to be member of this group to view message
                    }


                    console.log(">>>>>>>>>>>>>>>>>>>> <<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
                    
                }


            }); //for-each messageCollection

            res.send({ 
                msg: messageFilterModel, 
                action: "GET", 
                apiCall : "/readallmessages",
               
            });


        } else {

            res.send({ 
                msg: "cannot read messages, connection not found", 
                action: "GET", 
                errorArr : error.array() 
            });

        }

    } else {

        res.send({ 
            msg: "error in UUID validation ", 
            action: "GET", 
            errorArr : error.array() 
        });

    }

    //res.send(userConnectionArray)
});


app.post("/sendmessage/:connectionUUID", async function (req, res) {
   
    console.log("Send message triggered with connection uuid : " + req.params.connectionUUID);
   
    console.log("content " +  req.body.content);
    console.log("type " +  req.body.type);

    let error = validationResult(req);

    if( error.isEmpty()){

        let personReceiverParam = "";
        let groupReceiverParam = "";
        let userConnection = false;
        let clientIpAddress = req.socket.remoteAddress;
        let clientConnectionUUID = req.params.connectionUUID;
        let connectionObject = {};

        userConnectionArray.forEach( async function (connectionElement) {
                   
            if( 
                clientConnectionUUID === connectionElement.connection_uuid 
                &&
                clientIpAddress == connectionElement.clientIpAddress
            ){
                userConnection = true;
                connectionObject = connectionElement;
            }

        }); //for - each userConnectionArray


        if( userConnection ) {

                /*
                mysql> desc message1;
                +------------------------+---------------+------+-----+---------+----------------+
                | Field                  | Type          | Null | Key | Default | Extra          |
                +------------------------+---------------+------+-----+---------+----------------+
                | row_id                 | int           | NO   | PRI | NULL    | auto_increment |
                | message_content        | varchar(5000) | YES  |     | NULL    |                |
                | sender_uuid            | varchar(36)   | YES  |     | NULL    |                |
                | person_receiver_uuid   | varchar(36)   | YES  |     | NULL    |                |
                | group_receiver_uuid    | varchar(36)   | YES  |     | NULL    |                |
                | timestamp              | datetime      | YES  |     | NULL    |                |
                | message_receiver_type  | varchar(16)   | YES  |     | NULL    |                |
                | message_visible_status | tinyint       | YES  |     | NULL    |                |
                +------------------------+---------------+------+-----+---------+----------------+
                8 rows in set (0,03 sec)
                
                mysql> 
                */

                /*

                	sender: messageSender,
			        receiver: messageReceiver,
			        content: messageContent,
			        type: messageType

                */

                    ;

                    if( req.body.type == "public" ){ 
                        personReceiverParam = "empty"; 
                        groupReceiverParam = "empty"
                    }    
                    else if( req.body.type == "group" ){
                        personReceiverParam = "empty";
                        groupReceiverParam = "group-not-implemented"
                    } 
                    else { 
                        personReceiverParam = req.body.receiver;
                        groupReceiverParam = "empty" 
                    }   
    
                    var messageObject = {
                        sender_uuid : connectionObject.connectionProfile.user_uuid,
                        //person_receiver_uuid : req.body.messageReceiver,
                        person_receiver_uuid : personReceiverParam,
                        message_content : req.body.content,
                        message_receiver_type : req.body.type,
                        timestamp : serverUtilityFunctions.timestampToString(),
                        group_receiver_uuid : groupReceiverParam,
                        message_visible_status : 1,
                    };
    

                    console.log("============= write message =============");
                    console.log(JSON.stringify(messageObject));
                    console.log("=========================================");
                    console.log("Message type : " + req.body.type);
                    console.log("Sender : " + req.body.sender);
                    console.log("Receiver : " + req.body.receiver);
                    console.log("=========================================");


                    await databaseFunctions.writeMessage(messageObject);
    
                    res.send({ 
                        msg: "Message send succesfully", 
                        action: "POST",
                        apiCall: "/sendmessage", 
                       
                    });

        } else {
           
            res.send({ 
                msg: "Failed write message", 
                action: "POST", 
                apiCall: "/sendmessage", 
                errorArr : [{ msg : "user connection not found , failed write message"}]
            });

        }


    } else {
        
        res.send({ 
            msg: "error in UUID validation ", 
            action: "POST", 
            apiCall: "/sendmessage", 
            errorArr : error.array() 
        });

    }
    //res.send(userConnectionArray)
});


app.get("/confirmOnlineStatus/:connectionUUID", async function (req, res) {

    let error = validationResult(req);
    let connectionFound = false;
    let connectionIndex = -1;


    if( error.isEmpty()){


        let paramUserUUID = req.params.connectionUUID;
        console.log("confirmOnlineStatus triggered with param :" + paramUserUUID);
        let currentTime = serverUtilityFunctions.timestampToString();

        userConnectionArray.forEach( async function (item, index, object) {

            if( item.connection_uuid === paramUserUUID ){

                console.log("confirmOnlineStatus -> connection uuid found !");
                //let userUUID = item.connectionProfile.user_uuid;

                connectionFound = true;
                connectionIndex = index;
                
            }
            
        }); 
        
        
        if(connectionFound) {

            let dbUserUUD = userConnectionArray[connectionIndex].connectionProfile.user_uuid;

            await databaseFunctions.setUserOnlineOrOfflineStatus( dbUserUUD , 1 , currentTime );

            userConnectionArray[connectionIndex].connectionProfile.last_online_date = currentTime;
            userConnectionArray[connectionIndex].connectionProfile.user_is_online = 1;

            res.send({ 
                msg: "Online check passed", 
                action: "GET",
                apiCall: "/confirmOnlineStatus", 
               
            });


        }
        
        else {

            res.send({ 
                msg: "Error in connection ", 
                action: "GET", 
                apiCall: "/confirmOnlineStatus", 
                errorArr : { msg: "Connection not found "}
            });

        }

    } else {

        res.send({ 
            msg: "error in UUID validation ", 
            action: "GET", 
            apiCall: "/confirmOnlineStatus", 
            errorArr : error.array() 
        });

    }

});


function DropUsersInactivityScheduler(){

    let userConfirmTimer = process.env.DROP_USER_INACTIVITY_CHECK_DELAY;

    console.log("Starting DropUsersInactivityScheduler  max drop timer  -> " + userConfirmTimer);

    setInterval(function () {
    
        userConnectionArray.forEach( async function (item, index, object) {

            let userUUID = item.connectionProfile.user_uuid;
            let lastOnlineConnParam = item.connectionProfile; //.last_online_date;
            //let lastOnlineDate = serverUtilityFunctions.parseTimestampToDate(lastOnlineConnParam);

            let lastOnlineDate = new Date(lastOnlineConnParam.last_online_date);
            let currentDate = new Date(serverUtilityFunctions.timestampToString());
            let timedifference = (currentDate.getTime() - lastOnlineDate.getTime()) / 1000;

            let username = userConnectionArray[index].connectionProfile.username;
            let onlineStatus = userConnectionArray[index].connectionProfile.user_is_online;

            if ( timedifference > process.env.DROP_USER_INACTIVITY_MAX_DELAY && onlineStatus == 1 ) {

                //set user offline in database
                //await databaseFunctions.setUserOnlineOrOfflineStatus( userUUID , 0 , currentTime );
                //delete user from connection session
                object.splice(index, 1);
                console.log("DropUsersInactivityScheduler()  -> username= "+username +", lastonline="+lastOnlineDate.toDateString() + ", status="+onlineStatus)
                
            }

        });
        


    }, userConfirmTimer);     
    

}


async function checkDatabaseDeadConnection(){

    let userConfirmTimer = process.env.DROP_USER_INACTIVITY_CHECK_DELAY;

    setInterval(async function () {

        let dbUsers = await databaseFunctions.getAllUsers();
        dbUsers.forEach( async function (item, index, object) { 

            let myobj = JSON.stringify(item);
            let pmyobj = JSON.parse(myobj); 
            let onlineStatus = item.user_is_online;
            let username = item.username; 
            let userUUID = item.user_uuid;
            let lastOnline = item.last_online_date;    

            let lastOnlineDate = serverUtilityFunctions.parseTimestampToDate(pmyobj);
            let currentDate = new Date(serverUtilityFunctions.timestampToString());
            

            let timedifference = (currentDate.getTime() - lastOnlineDate.getTime()) / 1000;

            //console.log("checkDatabaseDeadConnection()  -> username= "+username +", lastonline="+lastOnlineDate.toDateString() + ", status="+onlineStatus + ", timedifference="+ timedifference); 

            if ( timedifference > process.env.DROP_USER_INACTIVITY_MAX_DELAY && onlineStatus == 1 ) {

                console.log("checkDatabaseDeadConnection()  -> username= "+username +", lastonline="+lastOnlineDate.toDateString() + ", status="+onlineStatus + ", timedifference="+ timedifference)
                //set user offline in database
                await databaseFunctions.setUserOnlineOrOfflineStatus( userUUID , 0 , lastOnline );
            
                
            }    

        });

    }, userConfirmTimer);  

}


const options = {
    key: fs.readFileSync(process.env.SSL_KEY),
    cert: fs.readFileSync(process.env.SSL_CERT),
};

https.createServer(options, app)
    .listen(process.env.HTTPS_PORT, function (req, res) {
        console.log("Server https started at port " + process.env.HTTPS_PORT);
        console.log(__dirname);
        DropUsersInactivityScheduler();
        checkDatabaseDeadConnection();
    });

http.createServer(options, app)
    .listen(process.env.HTTP_PORT, function (req, res) {
      console.log("Server http started at port"+process.env.HTTP_PORT);
    });

