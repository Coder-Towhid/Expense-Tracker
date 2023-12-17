const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  "development": {
    "username": process.env.Db_Username,
    "password": process.env.Db_Password,
    "database": process.env.Database,
    "host": process.env.Db_Server,
    "port": process.env.Db_Port,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.Db_Username,
    "password": process.env.Db_Password,
    "database": process.env.Database,
    "host": process.env.Db_Server,
    "port": process.env.Db_Port,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.Db_Username,
    "password": process.env.Db_Password,
    "database": process.env.Database,
    "host": process.env.Db_Server,
    "port": process.env.Db_Port,
    "dialect": "mysql"
  }
}
