const mysql = require('mysql2');
const express = require('express');
const bcrypt = require('bcrypt');

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

app.use(express.json()); // Add this line to parse JSON request bodies

// ---------------------------------------Managing Users -------------------------------------------

const userRoutes = express.Router();
app.use('/users', userRoutes);

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
      res.json(results[0]);
    }
  });
});

userRoutes.route('/').post(async (req, res) => {
  const { email, password } = req.body;

  // Hash the password before storing it in the database
  const hashedPassword = await bcrypt.hash(password, 10);

  // Replace with your MySQL query to insert a new user
  con.query('INSERT INTO user (email, password) VALUES (?, ?)', [email, hashedPassword], (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(201).json({ message: 'User added successfully' });
    }
  });
});

userRoutes.route('/:id').put(async (req, res) => {
  const userId = req.params.id;
  const { name, surname, email, gender, password, role, jobsid } = req.body;

  // Hash the updated password before updating it in the database
  const hashedPassword = await bcrypt.hash(password, 10);

  // Replace with your MySQL query to update the user
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

  // Replace with your MySQL query to delete the user
  con.query('DELETE FROM user WHERE id = ?', [userId], (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'User deleted successfully' });
    }
  });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
