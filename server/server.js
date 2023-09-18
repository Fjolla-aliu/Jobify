const express = require("express");
const multer = require("multer");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
// const sql = require('mssql/msnodesqlv8');
   var sql = require("mssql");

const PORT = 4000;
app.use(cors());
app.use(bodyParser.json());
mongoose.connect("mongodb+srv://fjollaaliu:MyMongoDb123@lab-two.swdp1wm.mongodb.net/lab-two", {
  useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});


app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});


// ------------------------Job managing -------------------------------------------------------

let Job = require("./jobs.model");
const { db } = require("./jobs.model");

const booksRoutes = express.Router();
app.use("/jobs", booksRoutes);

booksRoutes.route("/:id").get(async function (req, res) {
  try {
    const jobs = await Job.findOne({ _id: req.params.id });
    res.json(jobs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


booksRoutes.route("/my/:id").get(function (req, res) {
  Job.find(function (err, jobs) {
    if (err) {
      console.log(err);
    } else {
      res.json(jobs.filter((e) => e.user === req.params.id));
    }
  });
});

   booksRoutes.route("/").get(function (req, res) {
   Job.find()
    .then(function (jobs) {
      res.json(jobs);
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

booksRoutes.route("/").post(function (req, res) {
  db.collection("jobs").insertOne(req.body);
  res.send(req.body);
});

booksRoutes.route("/:id").put(function (req, res) {
  db.collection("jobs").findOneAndUpdate(
    { id: req.params.id },
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        companyName: req.body.companyName,
        category: req.body.category,
        hours: req.body.hours,
        remote: req.body.remote,
        untilDate: req.body.untilDate,
      },
    }
  );
  res.send();
});

booksRoutes.route("/:id").delete(function (req, res) {
  db.collection("jobs").deleteOne({ id: req.params.id });
  res.send(req.body);
});





// ----------------------------Managing Workers -------------------------------------------------------


let Worker = require("./work.model");

const applyWorker = express.Router();
app.use("/works", applyWorker);

applyWorker.route("/:id").get(function (req, res) {
  if (req.params.id !== undefined) {
    Worker.findOne({ id: req.params.id }, function (err, workers) {
      if (err) {
        console.log(err);
      } else {
        res.json(workers);
      }
    });
  }
});

applyWorker.route("/my/:id").get(function (req, res) {
  Worker.find(function (err, workers) {
    if (err) {
      console.log(err);
    } else {
      res.json(workers.filter((e) => e.user === req.params.id));
    }
  });
});

applyWorker.route("/").get(function (req, res) {
  Worker.find(function (err, workers) {
    if (err) {
      console.log(err);
    } else {
      res.json(workers);
    }
  });
});

applyWorker.route("/").post(function (req, res) {
  db.collection("works").insertOne(req.body);
  res.send(req.body);
});

applyWorker.route("/:id").put(function (req, res) {
  db.collection("works").findOneAndUpdate(
    { id: req.params.id },
    {
      $set: {
        title: req.body.title,
        experience: req.body.experience,
        technologies: req.body.technologies,
        userName: req.body.userName,
        category: req.body.category,
        degree: req.body.degree,
        hours: req.body.hours,
        remote: req.body.remote,
        untilDate: req.body.untilDate,
      },
    }
  );
  res.send();
});

applyWorker.route("/:id").delete(function (req, res) {
  db.collection("works").deleteOne({ id: req.params.id });
  res.send(req.body);
});






// -----------------------------------Managing Applications ----------------------------------------------



let Apply = require("./apply.model");

const applyRoutes = express.Router();
app.use("/applies", applyRoutes);

applyRoutes.route("/:id").get(function (req, res) {
  const userID = req.params.id;
  Apply.find(function (err, applies) {
    if (err) {
      console.log(err);
    } else {
      res.json(applies.filter((e) => e.user.id === userID));
    }
  });
});

applyRoutes.route("/applicants/:id").get(function (req, res) {
  const jobID = req.params.id;
  Apply.find(function (err, applies) {
    if (err) {
      console.log(err);
    } else {
      res.json(applies.filter((e) => e.job.id === jobID));
    }
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

applyRoutes.route("/").post(function (req, res) {
  db.collection("applies").insertOne(req.body);
  res.send(req.body);
});

const upload = multer({ storage: storage });

applyRoutes.route("/file").post(upload.single("picture"), function (req, res) {
  res.send("Uploaded successfully");
});

app.get("/uploads/:fileName", function (req, res) {
  var options = {
    root: "uploads",
  };
  res.sendFile(req.params.fileName, options, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Sent successfully");
    }
  }); // find out the filePath based on given fileName
});








