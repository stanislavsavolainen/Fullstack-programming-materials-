
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');
const hash = crypto.createHash('sha256');
const {check, param, body , checkBody ,validationResult } = require('express-validator');

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

//======================== uuid to string =================
function uuidToString() {
    return uuidv1();
}

//======================== password sha256 to string ======
function passwordSha256ToString(paramPassword){
    return crypto.createHash('sha256').update(paramPassword).digest('hex');
}

//======================== validate UUID  ==================

var validateUUID = [
    param("userUUID").isUUID()
    .withMessage("not valid uuid") 
]

//======================== validate authentication input ===


var authenticateValidate = [

    body("paramLogin")
    .isLength({min: 3, max : 40 })
    //.matches(/^[a-fA-F0-9]/)
    .matches(/^[A-Za-z0-9 .'_-]+$/)  //allow . _ amd - symbols
    .withMessage("problem in username") 
    
    ,

    body("paramPassword")
    .isLength({min: 6, max : 40 })
    //.matches(/^[a-fA-F0-9]/)
    .matches(/^[A-Za-z0-9]+$/)  // use only A-ZaA and 0-9 symbols range
    .withMessage("problem in password") 
    
    ,

]

//======================== validate registration input =====

var registerValidate = [

    body("paramLogin")
    .isLength({min: 3, max : 40 })
    //.matches(/^[a-fA-F0-9]/)
    .matches(/^[A-Za-z0-9 .'_-]+$/)  //allow . _ amd - symbols
    .withMessage("problem in username") 
    
    ,

    body("paramPassword")
    .isLength({min: 6, max : 40 })
    //.matches(/^[a-fA-F0-9]/)
    .matches(/^[A-Za-z0-9]+$/)  // use only A-ZaA and 0-9 symbols range
    .withMessage("problem in password") 
    
    ,

    body("paramPassword2")
    .isLength({min: 6, max : 40 })
    //.matches(/^[a-fA-F0-9]/)
    .matches(/^[A-Za-z0-9]+$/)  // use only A-ZaA and 0-9 symbols range
    .withMessage("problem in password2") 
    
]

module.exports = {
    timestampToString,
    uuidToString,
    passwordSha256ToString,
    validateUUID,
    authenticateValidate,
    registerValidate
}