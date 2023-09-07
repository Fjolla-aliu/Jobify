const mysql = require('mysql');

const mysql2 = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql.123",
  database:"jobifydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});



// ---------------------------------------Managing Users -------------------------------------------



let User = require("./users.model");

const userRoutes = express.Router();
app.use("/users", userRoutes);

userRoutes.route("/:email").get(function (req, res) {
  const myEmail = req.params.email;
  User.findOne({ email: myEmail }, function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

userRoutes.route("/").post(function (req, res) {
  User.findOne({ email: req.body.email }, function (err, users) {
    if (users === null) {
      db.collection("users").insertOne(req.body);
      res.send("Added user successfully");
    } else {
      res.send("User with this email already exists.");
    }
  });
});

userRoutes.route("/:id").put(function (req, res) {
  db.collection("users").findOneAndUpdate(
    { id: req.params.id },
    {
      $set: {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        gender: req.body.gender,
        password: req.body.password,
        role: req.body.role,
        jobsid: req.body.jobsid
      },
    }
  );
  res.send(req.body);
});

userRoutes.route("/:id").delete(function (req, res) {
  db.collection("users").deleteOne({ id: req.params.id });
  res.send(req.body);
});

const bcrypt = require("bcrypt");
const password = "asd";
async function hashIt(password) {
  const salt = await bcrypt.genSalt(6);
  const hashed = await bcrypt.hash(password, salt);
  // console.log(hashed);
}
hashIt(password);
async function compareIt(password) {
  const validPassword = await bcrypt.compare(
    password,
    "$2b$06$6HigN7M9ox90MDv03xyW6eUAYzGoX1HTkfl9ynJ5zBXC0X2kcmY0C"
  );
  // console.log(validPassword);
}
compareIt(password);