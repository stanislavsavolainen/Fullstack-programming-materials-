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


function testMSG(){

	return new Promise((resolve, reject) => {

        knex(process.env.MYSQL_DB_TEST_TABLE1).then(function (database_result) {
            console.log("+++++++++++++++++++++++++++++"); 
            console.log(database_result)
            console.log("+++++++++++++++++++++++++++++");
            resolve(database_result);
        }).catch((e) => {
            console.log("------------------------------");
            console.log(e)
            reject(e);
            console.log("-------------------------------");
        })

	})	 //Promise	

}


module.exports = {
    testMSG,
}


