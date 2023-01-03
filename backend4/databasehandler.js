require('dotenv').config()

// ==================== INIT KNEX with database parameter =====

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.MYSQL_DB_HOST,
        user: process.env.MYSQL_DB_USERNAME,
        password: process.env.MYSQL_DB_PASSWORD,
        database: process.env.MYSQL_DB_DATABASE,
        timezone: '+00:00'
    },
    debug: true
    //connection: process.env.PG_CONNECTION_STRING
}, (e) => {
    console.log(e);
});


function testMSG() {

    return new Promise((resolve, reject) => {

        knex(process.env.MYSQL_DB_TEST_TABLE1).then(function (database_result) {
            console.log("+++++++++++++++++++++++++++++");
            console.log(database_result)
            console.log("+++++++++++++++++++++++++++++");
            resolve(database_result);
        }).catch((e) => {
            console.log("------------------------------");
            console.log(e)
            console.log("-------------------------------");
            reject(e);
        })

    })	 //Promise	

}


function registerUser() {

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

    return new Promise((resolve, reject) => {

        knex(process.env.MYSQL_DB_TEST_TABLE1).insert(user_object).then(() => {

            resolve("user is registered");
        })
            .catch((e) => {
                console.log(e)
                reject(e);
            })

    })	 //Promise    

}



function updateUser(userId) {

    return new Promise((resolve, reject) => {
        knex(process.env.MYSQL_DB_TEST_TABLE1)
            .update({ deleted_at: "now()" })
            //.where("column", "value").then(function (database_result) {
            .where("id", userId).then(function (database_result) {

                resolve("user is updated");

            }).catch((e) => {
                reject(e);
            })

    })	 //Promise

}

function deleteUser(userId) {

    return new Promise((resolve, reject) => {

        knex(process.env.MYSQL_DB_TEST_TABLE1)
            .del()
            .where('id', userId).then(function (database_result) {

                resolve("user is deleted");

            }).catch((e) => {
                reject(e);
            })



    })	 //Promise

}




module.exports = {
    testMSG,
    deleteUser,
    updateUser,
    registerUser
}


