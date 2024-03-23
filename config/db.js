import mysql from 'mysql2'

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise() // so that we can use async await

pool.getConnection((err, connection) =>{
    if(err){
        console.error('Error connnecting to MySQL: ', err)
        return
    }

    console.log('Connected successfully to MySQL')
    console.log("Connection URL:", connection.config.connectionConfig)

    connection.release()
})
export default pool