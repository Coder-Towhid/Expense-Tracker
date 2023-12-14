const express = require('express');
const mysql = require('mysql');
const {connection} = require("./db/connection")
const authRoute = require("./routes/auth.route")
const cookieParser = require('cookie-parser')
const cors = require('cors');
// const bodyparser = require('body-parser')

const app = express();
const port = 3001;



app.use(cookieParser(process.env.COOKIE_TOKEN));
app.use(express.json());
app.use(cors());

// Connect to MySQL
connection.connect((err) => {

  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL!');
  }
});

app.use("/expense/v1", authRoute);
// Define a simple route
app.get('/', (req, res) => {
  // Example MySQL query
  connection.query('select * from register;', (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});