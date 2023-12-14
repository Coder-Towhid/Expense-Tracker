const express = require("express");
const bcrypt = require("bcrypt");
const { connection } = require("../db/connection");
const jwt = require('jsonwebtoken')

const router = express.Router();

// router.post('/register', (req, res) => {
//     const { name, password } = req.body;

//     // Insert data into the 'register' table
//     const sql = 'INSERT INTO register (name, password) VALUES (?, ?)';
//     connection.query(sql, [name, password], (err, result) => {
//       if (err) {
//         console.error('Error inserting data: ' + err.stack);
//         res.status(500).send('Error inserting data');
//         return;
//       }

//       console.log('Data inserted successfully');
//       res.status(200).send('Data inserted successfully');
//     });
//   });

router.post("/register", async (req, res) => {
  const { name, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert hashed data into the 'register' table
    const insertQuery = "INSERT INTO register (name, password) VALUES (?, ?)";
    connection.query(insertQuery, [name, hashedPassword], (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Error inserting data");
        return;
      }

      console.log("Data inserted successfully");
      res.status(200).send("Data inserted successfully");
    });
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).send("Error hashing password");
  }
});

router.post('/login', async (req, res) => {
  const { name, password } = req.body;

  // Retrieve hashed password from the database based on the username
  const selectQuery = 'SELECT id, name, password FROM register WHERE name = ?';
  connection.query(selectQuery, [name], async (err, result) => {
    if (err) {
      console.error('Error selecting data:', err);
      res.status(500).send('Error selecting data');
      return;
    }

    if (result.length === 0) {
      // User not found
      res.status(401).send('Invalid credentials');
      return;
    }

    const user = result[0];
    console.log("user",user)
    console.log("result",result)


    // Compare the provided password with the hashed password in the database
    
    console.log("user password",user.password)
    const passwordMatch = await bcrypt.compare(password, user.password);


    if (passwordMatch) {
      // Passwords match, generate and send a JWT
      const token = jwt.sign({ userId: user.id, username: user.name }, 'hasbacfsv', {
        // expiresIn: '1h', // Token expiration time (adjust as needed)
      });

      res.json({ token });
    } else {
      // Invalid password
      res.status(401).send('Invalid credentials');
    }
  });
});
module.exports = router;
