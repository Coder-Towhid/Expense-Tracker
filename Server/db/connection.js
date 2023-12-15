
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12670629',
    password: 'Jks5iJvzEe',
    database: 'sql12670629',
  });

module.exports = {
    connection
}