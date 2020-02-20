const express = require('express');
const bodyparser = require('body-parser');

const crypto = require('crypto');
const hash = crypto.createHash('sha256');

const uuidv1 = require('uuid/v1');

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

var userConfirmTimer = 10000; //1minute inactivity
var userTableName = "user_table1"


// ================ load user profile ==========================

app.get('/1', function (req, res) {
    res.status(301).redirect("/profile1.html");
});

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

    knex(userTableName).update(profileObject).where({ user_uuid: s_user_uuid }).then(
        () => { console.log("User data succesfully updated !"); return ("done") }
    ).catch((e) => {
        console.log(e)
        return ("Failed")
    })



    res.send("user UUID with session : 839048290 on device UUID : 859043584390 is online");

});


//==================== AUTHENTICATE ==========================

app.post('/authenticate', function (req, res, next) {

    let usersObject = [];


    let user_login = req.body.plogin;
    let user_password = req.body.ppasword;

    console.log("User " + user_login + " with password : " + user_password + " entered");

    console.log("Make password sha256 checksum and compare hashes with database");

    //let password_hash = crypto.createHash('sha256').update('password').digest('hex');
    let password_hash = crypto.createHash('sha256').update(user_password).digest('hex');

    console.log("Password : " + user_password + " sha256 crypted hash :" + password_hash);

    // var tablename = "user_table1";

    let notfound = true;

    knex(userTableName).then(function (database_result) {
        //return JSON.stringify(database_result);
        // res.send(JSON.stringify(database_result));

        usersObjectArray = database_result;


        database_result.forEach(function (element) {

            // element.username

            //element.password_hash_sha256 

            if (element.username == user_login && element.password_hash_sha256 == password_hash) {

                notfound = false;

                profileObject = element;

                //  setTimeout(function(){ 

                // res.redirect('profile1.html');

                // }, 250);  

                res.send("found");
                // res.redirect('profile1.html');

                //res.status(301).redirect("/1")
            }


        });

        if (notfound) profileObject = undefined;

        if (notfound) res.send("not_found");



    }).catch((e) => {
        console.log(e)
        // return ("Failed");
        res.send(JSON.stringify("FAIL !"));
    });




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
         row_id                | int(11)      | NO   | PRI | NULL    | auto_increment |
| user_uuid             | varchar(36)  | YES  |     | NULL    |                |
| password_hash_sha256  | varchar(64)  | YES  |     | NULL    |                |
| user_is_blocked       | tinyint(4)   | YES  |     | NULL    |                |
| user_permission_level | tinyint(4)   | YES  |     | NULL    |                |
| user_is_online        | tinyint(4)   | YES  |     | NULL    |                |
| registered_date       | datetime     | YES  |     | NULL    |                |
| last_online_date      | datetime     | YES  |     | NULL    |                |
| user_maintenance_info | varchar(500) | YES  |     | NULL    |                |
| username           


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

        knex(userTableName).insert(user_object).then(() => {
            return ("Insert succesful")
        })
            .catch((e) => {
                console.log(e)
                return ("Failed");

                res.send("not found")
            })

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


function getTZTime(tzOffset) {
    local = new Date();
    off = (local.getTimezoneOffset()) * 60 * 1000;
    timeStamp = local.getTime() + off;
    off += 1000 * 60 * 60 * tzOffset;
    nd = new Date();
    nd.setTime(timeStamp);
    return (nd);
}



//========= user who don't response to heartbeat =================

function dropInAcitivityUserOfflineSceduler() {

    setInterval(function () {

        let currentTime = timestampToString();

        knex(userTableName).then(function (database_result) {



            database_result.forEach(function (element) {

                let lastOnlineDate = element.last_online_date.toString();

                let myobj = JSON.stringify(element);
                let pmyobj = JSON.parse(myobj);

                //google.com => node js date difference in seconds
                //https://stackoverflow.com/questions/2024198/how-many-seconds-between-two-dates

                //Difference : -7194 >>> current 2020-02-20 13:21:14 last :Thu Feb 20 2020 15:21:08 GMT+0200 (EET)

                // var a = new Date(getTZTime(2));
                // var a = new Date();
                // a.setTime( (new Date().getTime()) + 
                // (a.getTimezoneOffset() * 2 * 60 * 1000) );
                var a = new Date(timestampToString()); //.toLocaleDateString();



                // var a = new Date();
                //  var b = new Date(lastOnlineDate).toUTCString();
                // var b = new Date ( lastOnlineDate  );
                //var b = bb.toUTCString();
                //var b = new Date("2020-02-20 14:14:19");
                // var b = new Date(pmyobj.last_online_date);
                // 2020-02-20T14:14:19.000Z
                var modified_b = lastOnlineDate.replace("T", " ")
                modified_b = modified_b.substring(modified_b.length - 4, 4);
                modified_bb = pmyobj.last_online_date.substr(0, 4)
                    + "-" + pmyobj.last_online_date.substr(5, 2)
                    + "-" + pmyobj.last_online_date.substr(8, 2)
                    + " " + pmyobj.last_online_date.substr(11, 2)
                    + ":" + pmyobj.last_online_date.substr(14, 2)
                    + ":" + pmyobj.last_online_date.substr(17, 2)

                var b = new Date(modified_bb);


                // b.setTime((new Date(lastOnlineDate).getTime()) + 
                // (b.getTimezoneOffset() * 60 * 1000) + // local offset
                // (1000 * 60 * 60 * 2));



                //var c = new Date();
                //  c.setTime((new Date().getTime()) + 
                // (c.getTimezoneOffset() * 60 * 1000) + // local offset
                // (1000 * 60 * 60 * 2));



                // https://stackoverflow.com/questions/7971813/get-helsinki-local-time-regardless-of-local-time-zone 


                /*
                 var b = new Date();
                 b.setFullYear(  parseInt( lastOnlineDate.substr( 0, 4  )  ) );
                 b.setMonth( parseInt( lastOnlineDate.substr( 5, 2  )      ) );
                 b.setDate( parseInt( lastOnlineDate.substr( 8, 2  )       ) );
                 b.setHours( parseInt( lastOnlineDate.substr( 11, 2  )     ) );
                 b.setMinutes( parseInt( lastOnlineDate.substr( 14, 2  )   ) );
                 b.setSeconds(  parseInt(  lastOnlineDate.substr( 17, 2  ) ) );
                 
  
                // var t1 = new Date(YYYY, MM, DD, 0, 0, 0, 0);
                //var t2 = new Date(ZZZZ, NN, EE, 0, 0, 0, 0);
                   var t1 = new Date(a.getFullYear(), a.getMonth(), a.getMonth(), a.getHours(), a.getMinutes(), a.getSeconds(), a.getMilliseconds());
                  var t2 = new Date(b.getFullYear(), b.getMonth(), b.getMonth(), b.getHours(), b.getMinutes(), b.getSeconds(), b.getMilliseconds());
  
                  var dif = t1.getTime() - t2.getTime();
  
                  var Seconds_from_T1_to_T2 = dif / 1000;
                  var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);
  
  
                  var difference = (a.getTime() - b.getTime() ) / 1000;
  
                  console.log("Difference : " + (difference + 5000) + " >>> current " + currentTime + " last :" + lastOnlineDate);
  
                  console.log(b);
                  console.log(a);
  
                  console.log(Seconds_from_T1_to_T2 / 1000);
                  console.log(Seconds_Between_Dates / 1000);
                  */

                //https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/

                var Difference_In_Time = a.getTime() - b.getTime();

                // To calculate the no. of days between two dates 
                var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

                var difference = (a.getTime() - b.getTime()) / 1000;

                console.log("Difference : " + difference + " >>> current " + a + " last :" + b);
                console.log(element.last_online_date);
                // console.log(a);
                console.log("database timestamp :" + b + "and modified bb : " + modified_bb);

                // console.log(a.getTime());
                console.log(timestampToString());
                //console.log(b.getTime());
                // console.log( a.getTime() - b.getTime() / 1000 );


                console.log("DB last onlien :" + pmyobj.last_online_date);

                // flag user offline , if he don't response "ConfirmOnlieStatus" ajax call
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






    }, userConfirmTimer);



}


//===== load user ==============================================



//==============================================================

// Start nodeJS server
var server = app.listen(1111, function () {
    var hostport = server.address().port;
    console.log("Express server is listening");
    console.log("Port is: %s", hostport);

    dropInAcitivityUserOfflineSceduler();
});