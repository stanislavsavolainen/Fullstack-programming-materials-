const express = require('express');
const bodyparser = require('body-parser');

const crypto = require('crypto');
const hash = crypto.createHash('sha256');

const uuidv1 = require('uuid/v1');

var profileObject = undefined;

//------------------------------------ mongodb ----------------------

var MongoClient = require('mongodb').MongoClient;  
const mongoose = require('mongoose');

var Schema = mongoose.Schema;

// CONNECT TO DBSERVER
//

var mongo_url = "mongodb://localhost:27017/test";
mongoose.connect('mongodb://localhost:27017/test');

// Create schema for each collection
var ownerSchema = new Schema({
	name: String,
	age: Number
}, {collection: "Owner", versionKey: false});

// map schema to collection
var Owner = mongoose.model('ownermodel', ownerSchema);

// this schema can now be called 
// in other nodejs files
module.exports = Owner;
// END DBSERVER CONNECT

//--------------------------------------------------------------------

/*
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        database: 'fullstack2020db1',
        timezone: '+00:00'
    },
    debug: true
    //connection: process.env.PG_CONNECTION_STRING
}, (e) => {
    console.log(e);
});
*/

// Express framework with Node.JS
var app = express();

// Register bodyparser with json support
app.use(bodyparser.json());

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);

app.use(express.static('host_client'));


var profileObject = undefined;

var userConfirmTimer = 10000; //check and update user status each 10 seconds and drop user if over 1 minute inactivity
var userTableName = "user_table1"


// ================ load user profile ==========================

app.get('/loadUserProfile', function (req, res, next) {

    //make Session for special user special profile

    res.send(profileObject);

});



// =============== check user is still online (heartbeat) ======

app.get('/confirmOnlineStatus', function (req, res, next) {

    //this ajax call after user is successfully logged in

    console.log("heartbeat check timestamp  : " + (new Date()).toString());

    //check last online status, and set user offline if heartbeat not happen anymore

    //let currentTime = timestampToString();

    //get uset last logged time from database

    let s_user_uuid = profileObject.user_uuid;
    profileObject.last_online_date = timestampToString();
    profileObject.user_is_online = 1; //user is online
   
    // https://www.w3schools.com/nodejs/nodejs_mongodb_update.asp

       MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  // Client returned
  var db = client.db('test');

	 var myquery = { user_uuid: s_user_uuid };
  var newvalues = { $set: {last_online_date: profileObject.last_online_date, user_is_online: profileObject.user_is_online  } };
  db.collection("user1").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated ");
    console.log(profileObject);
    //db.close();
  });


  }); 


 /*
    knex(userTableName).update(profileObject).where({ user_uuid: s_user_uuid }).then(
        () => { console.log("User data succesfully updated !"); return ("done") }
    ).catch((e) => {
        console.log(e)
        return ("Failed")
    })

*/

    res.send("user UUID with session : 839048290 on device UUID : 859043584390 is online");

});


// ==================== mongo display all users ==============


app.get('/allusers', function (req, res, next) {

//mongodb cli -> show dbs
//mongodb cli -> use tests
//mongodb cli -> db.createCollection("user1", { capped : true, autoIndexId : true, size: 6142800, max : 10000 } )
// like MySQL create table
 
//https://www.javatpoint.com/nodejs-mongodb-select

     MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  // Client returned
  var db = client.db('test');

  db.collection("user1").find({}).toArray(function(err, result) {  
	if (err) throw err;  
	console.log("result");  
//db.close();  
	res.send(result);

}); 

}); 


//res.send("all users");

});



// ================ load user profile ==========================

app.get('/loadUserProfile', function (req, res, next) {

    //make Session for special user special profile

    res.send(profileObject);

});


//==================== AUTHENTICATE ==========================

app.post('/authenticate', function (req, res, next) {

    let user_login = req.body.plogin;
    let user_password = req.body.ppasword;

    console.log("User " + user_login + " with password : " + user_password + " entered");
    console.log("Make password sha256 checksum and compare hashes with database");

    let password_hash = crypto.createHash('sha256').update(user_password).digest('hex');

    console.log("Password : " + user_password + " sha256 crypted hash :" + password_hash);

    // var tablename = "user_table1";

    let notfound = true;


        MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  // Client returned
  var db = client.db('test');

  db.collection("user1").find({}).toArray(function(err, result) {  
	if (err) throw err;  
	console.log("result");  
//db.close();  
 //res.send(result);

   result.forEach(function (element) {

            // element.username

            //element.password_hash_sha256 

            if (element.username == user_login && element.password_hash_sha256 == password_hash) {

                notfound = false;

                profileObject = element;
 

                res.send("found");
                // res.redirect('profile1.html');
            }


        });

        if (notfound) profileObject = undefined;

        if (notfound) res.send("not_found");




}); 

}); 	


   /*
    knex(userTableName).then(function (database_result) {
    
        database_result.forEach(function (element) {

            // element.username

            //element.password_hash_sha256 

            if (element.username == user_login && element.password_hash_sha256 == password_hash) {

                notfound = false;

                profileObject = element;
 

                res.send("found");
                // res.redirect('profile1.html');
            }


        });

        if (notfound) profileObject = undefined;

        if (notfound) res.send("not_found");



    }).catch((e) => {
        console.log(e)
        // return ("Failed");
        res.send(JSON.stringify("FAIL !"));
    });

    */


});

//==================== REGISTER USER ==========================

app.post('/registeruser', function (req, res, next) {

    //oauth2 style "bearer_token" , but there is no actual oaut2
    let pseudo_bearer_token = "111-222-333";  //.env file 

    let compare_bearer_token = req.body.bearer_token;

    if (pseudo_bearer_token == compare_bearer_token) {

        let user_login = req.body.plogin;
        let user_password = req.body.ppasword;


        let insert_uuid = uuidv1();
        let insert_password_sha256 = crypto.createHash('sha256').update(user_password).digest('hex');
        let insert_register_date = (new Date().toString());

        console.log("--------- register user -------------");
        console.log("user uuid : " + insert_uuid);
        console.log("user password : " + user_password + " , shas256 hash :" + insert_password_sha256);
        console.log("Register (server time ) - timestamp : " + insert_register_date);


        //ignore regularExpression / joiValidation / Sanitaze or whatever input validation at the moment

        /*
        | row_id                | int(11)      | NO   | PRI | NULL    | auto_increment |
        | user_uuid             | varchar(36)  | YES  |     | NULL    |                |
        | password_hash_sha256  | varchar(64)  | YES  |     | NULL    |                |
        | user_is_blocked       | tinyint(4)   | YES  |     | NULL    |                |
        | user_permission_level | tinyint(4)   | YES  |     | NULL    |                |
        | user_is_online        | tinyint(4)   | YES  |     | NULL    |                |
        | registered_date       | datetime     | YES  |     | NULL    |                |
        | last_online_date      | datetime     | YES  |     | NULL    |                |
        | user_maintenance_info | varchar(500) | YES  |     | NULL    |                |
        | username              | varchar(40)  | YES  |     | NULL    |                |          
        */

        //also duplicate check missing to not register same user 

        //var tablename = "user_table1";
        var user_object = {
            user_uuid: insert_uuid,
            password_hash_sha256: insert_password_sha256,
            user_is_blocked: 0,
            user_permission_level: 0,
            user_is_online: 0,
            registered_date: timestampToString(),
            last_online_date: timestampToString(),
            user_maintenance_info: "default user, nothing to say",
            username: user_login

        };

    /*   
        MongoClient.connect(mongo_url, function(err, db) {  
if (err) throw err;  
//var myobj = { name: "Ajeet Kumar", age: "28", address: "Delhi" };  
db.collection("user1").insertOne(user_object, function(err, res) {  
if (err) throw err;  
console.log("1 record inserted");  
db.close();  
});  
});           
*/

   MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  // Client returned
  var db = client.db('test');

  db.collection("user1").insertOne(user_object, function(err, res) {  
	if (err) throw err;  
	console.log("1 record inserted");  
//db.close();  
});  


});








        /*
        knex(userTableName).insert(user_object).then(() => {
            return ("Insert succesful")
        })
            .catch((e) => {
                console.log(e)
                return ("Failed");

                res.send("not found")
            })
         */

         //https://www.w3schools.com/nodejs/nodejs_mongodb_insert.asp

         

        res.send("user is registered")
    } else {

        res.send("there is no permission register user, missing bearer - token");
    }


});

//======================== timestamp to string =================

function timestampToString() {

    var d = new Date()

    var month_str = "";

    if ((d.getMonth() + 1) > 9) month_str = "" + (d.getMonth() + 1);
    else if ((d.getMonth() + 1) < 10) month_str = "0" + (d.getMonth() + 1);

    var day_str = "";
    if (d.getDate() > 9) day_str = "" + d.getDate();
    else if (d.getDate() < 10) day_str = "0" + d.getDate();

    var hour_str = "";
    if (d.getHours() > 9) hour_str = "" + d.getHours();
    else if (d.getHours() < 10) hour_str = "0" + d.getHours();

    var min_str = "";
    if (d.getMinutes() > 9) min_str = "" + d.getMinutes();
    else if (d.getMinutes() < 10) min_str = "0" + d.getMinutes();

    var sec_str = "";
    if (d.getSeconds() > 9) sec_str = "" + d.getSeconds();
    else if (d.getSeconds() < 10) sec_str = "0" + d.getSeconds();

    //var mytimestamp = "" + d.getFullYear() + "-" + (d.getMonth() + 1 ) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var mytimestamp = "" + d.getFullYear() + "-" + month_str + "-" + day_str + " " + hour_str + ":" + min_str + ":" + sec_str;


    return mytimestamp;
}


//========= user who don't response to heartbeat =================


function dropInactivityUserScheduler() {

    setInterval(function () {

        let currentTime = timestampToString();
         

	  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  	// Client returned
  		var db = client.db('test');

  		db.collection("user1").find({}).toArray(function(err, result) {  
		if (err) throw err;  
		console.log("result");  
		//db.close();  
	//res.send(result);


	result.forEach(function (element) { 


		//avoid GMT + 0 time-zone , because new Date - present GMT-time and MySQL timestamp is localtime
                let myobj = JSON.stringify(element);
                let pmyobj = JSON.parse(myobj);

                var currentDate = new Date(timestampToString()); 

                let parsedDatabaseTimestamp = pmyobj.last_online_date.substr(0, 4)
                    + "-" + pmyobj.last_online_date.substr(5, 2)
                    + "-" + pmyobj.last_online_date.substr(8, 2)
                    + " " + pmyobj.last_online_date.substr(11, 2)
                    + ":" + pmyobj.last_online_date.substr(14, 2)
                    + ":" + pmyobj.last_online_date.substr(17, 2)

                var lastOnlineDate = new Date(parsedDatabaseTimestamp);

		var difference = (currentDate.getTime() - lastOnlineDate.getTime()) / 1000;

		
                 console.log("User " + element.username + "last online date : " + lastOnlineDate + " diff " + difference);

                 // flag user offline , if lastOnline is over 60 seconds
                if (difference > 60 && typeof profileObject != 'undefined' ) {

                   // let s_user_uuid =  element.user_uuid; //profileObject.user_uuid;
                    profileObject.user_is_online = 0; // user is offline

                     
                       MongoClient.connect('mongodb://localhost:27017', (errr, clientt) => {
  			// Client returned
  			var db2 = clientt.db('test');  
                      
			
				 var myquery = { user_uuid: element.user_uuid };
  					var newvalues = { $set: { user_is_online: 					profileObject.user_is_online  } };
  			db2.collection("user1").updateOne(myquery, newvalues, function(errrr, res) {
    			if (err) throw errrr;
    			console.log("user "+ element.username   +" droped for inactivity ");
    			//db.close();
  			});

	
			}); 

                } // end if
	}); 


	}); 

	}); 




        /*
        knex(userTableName).then(function (database_result) {

            database_result.forEach(function (element) {

                //avoid GMT + 0 time-zone , because new Date - present GMT-time and MySQL timestamp is localtime
                let myobj = JSON.stringify(element);
                let pmyobj = JSON.parse(myobj);

                var currentDate = new Date(timestampToString()); 

                let parsedDatabaseTimestamp = pmyobj.last_online_date.substr(0, 4)
                    + "-" + pmyobj.last_online_date.substr(5, 2)
                    + "-" + pmyobj.last_online_date.substr(8, 2)
                    + " " + pmyobj.last_online_date.substr(11, 2)
                    + ":" + pmyobj.last_online_date.substr(14, 2)
                    + ":" + pmyobj.last_online_date.substr(17, 2)

                var lastOnlineDate = new Date(parsedDatabaseTimestamp);



                //https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/


                var difference = (currentDate.getTime() - lastOnlineDate.getTime()) / 1000;

                console.log("Difference : " + difference + " >>> current " + currentDate + " last :" + lastOnlineDate);
                console.log(element.last_online_date);
                // console.log(a);
                console.log("database timestamp :" + lastOnlineDate + "parsed timestamp: " + parsedDatabaseTimestamp);

                console.log(timestampToString());
               
                console.log("User last online time :" + pmyobj.last_online_date);

                // flag user offline , if lastOnline is over 60 seconds
                if (difference > 60 && typeof profileObject != 'undefined' ) {

                    let s_user_uuid = profileObject.user_uuid;
                    profileObject.user_is_online = 0; // user is offline

                    knex(userTableName).update(profileObject).where({ user_uuid: s_user_uuid }).then(
                        () => { console.log("User data succesfully updated !"); return ("done") }
                    ).catch((e) => {
                        console.log(e)
                        return ("Failed")
                    })



                }


            });



        }).catch((e) => {
            console.log(e)

        });
     */

    }, userConfirmTimer);

}


// Start nodeJS server
var server = app.listen(1111, function () {
    var hostport = server.address().port;
    console.log("Express server is listening");
    console.log("Port is: %s", hostport);

    dropInactivityUserScheduler();
});
