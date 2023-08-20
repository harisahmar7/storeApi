const Pool = require('pg-pool');
require('dotenv').config();



function dbConnection(){
const pool = new Pool({
	host : process.env.PG_HOST,
	user : process.env.PG_USER_NAME,
	password: process.env.PG_PASSWORD,
	port: process.env.PG_PORT 
})

pool.connect((err, response)=>{
	if(err){
		console.log(err)
	}
})
return pool;	
}


module.exports =  dbConnection;