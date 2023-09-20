const mysql = require('mysql2');
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require("cors");

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql.123',
  database: 'jobifydb',
});

con.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

const app = express();

app.use(cors());


app.use(express.json()); // Add this line to parse JSON request bodies




// ---------------------------------------Managing Users -------------------------------------------

const userRoutes = express.Router();
app.use('/user', userRoutes);

userRoutes.route('/:email').get((req, res) => {
  const myEmail = req.params.email;
  // Replace with your MySQL query to fetch user by email
  con.query('SELECT * FROM user WHERE email = ?', [myEmail], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results[0]);
    }
  });
});

userRoutes.route('/').get((req, res) => {
  const myEmail = req.params.email;
  // Replace with your MySQL query to fetch user by email
  con.query('SELECT * FROM user', (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

userRoutes.route('/').post(async (req, res) => {
  if (req.body.role === "user") {
    const { id, name, surname, gender, age, email, password, role, jobsid } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

  
  con.query('INSERT INTO user (id,name, surname, gender, age, email, password, role,jobsid) VALUES (?,?, ?, ?, ?, ?, ?, ?,?)', [id,name, surname, gender, age, email, hashedPassword, role,jobsid], (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(201).json({ message: 'User added successfully' });
    }
  });
  } else {
      const { id, name, email, password, role} = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

  
  con.query('INSERT INTO user (id,name, email, password, role) VALUES (?,?, ?, ?, ? )', [id,name,  email, hashedPassword, role], (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(201).json({ message: 'User added successfully' });
    }
  });
  }
  

  // Hash the password before storing it in the database

});


userRoutes.route('/:id').put(async (req, res) => {
  const userId = req.params.id;
  const { name, surname, email, gender, password, role, jobsid } = req.body;

  // Hash the updated password before updating it in the database
  const hashedPassword = await bcrypt.hash(password, 10);

  // Replace with MySQL query to update the user
  con.query(
    'UPDATE user SET name = ?, surname = ?, email = ?, gender = ?, password = ?, role = ?, jobsid = ? WHERE id = ?',
    [name, surname, email, gender, hashedPassword, role, jobsid, userId],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'User updated successfully' });
      }
    }
  );
});

userRoutes.route('/:id').delete((req, res) => {
  const userId = req.params.id;

  // Replace with MySQL query to delete the user
  con.query('DELETE FROM user WHERE id = ?', [userId], (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'User deleted successfully' });
    }
  });
});



//----------------Statistics--------------

const statsRoutes = express.Router();
app.use("/stats", statsRoutes);

statsRoutes.route("/users").get(function (req, res) {
  // SQL query to fetch users and calculate statistics
  const query = `
    SELECT 
      SUM(CASE WHEN gender = 'male' THEN 1 ELSE 0 END) AS maleCount,
      SUM(CASE WHEN gender = 'female' THEN 1 ELSE 0 END) AS femaleCount,
      AVG(age) AS averageAge,
      COUNT(*) AS totalUsers,
      SUM(CASE WHEN role = 'company' THEN 1 ELSE 0 END) AS companyCount
    FROM user;
  `;

  con.query(query, function (err, results) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Extract statistics from the query results
    const stats = {
      gender: [
        { male: results[0].maleCount },
        { female: results[0].femaleCount },
      ],
      averageAge: results[0].averageAge,
      onlyUsersNumbers: results[0].totalUsers,
      companyNumbers: results[0].companyCount,
      usersNumber: results[0].totalUsers - results[0].companyCount,
    };

    res.json(stats);
  });
});


const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



