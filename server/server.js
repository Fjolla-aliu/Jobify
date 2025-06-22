const express = require("express");
const multer = require("multer");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
// const sql = require('mssql/msnodesqlv8');
var sql = require("mssql");
const ObjectId = mongoose.Types.ObjectId; // Import ObjectId from Mongoose
const PORT = 4000;
app.use(cors());
app.use(bodyParser.json());
mongoose.connect(
  "mongodb+srv://fjollaaliu:MyMongoDb123@lab-two.swdp1wm.mongodb.net/lab-two",
  {
    useNewUrlParser: true,
  }
);
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
    const jobs = await Job.findOne({ id: req.params.id });
    res.json(jobs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

booksRoutes.route("/my/:id").get(function (req, res) {
  Job.find().then(function (jobs) {
    const filteredJobs = jobs.filter((e) => e.user === req.params.id);
    res.json(filteredJobs);
  });
});

booksRoutes.route("/").get(function (req, res) {
  Job.find()
    .then(function (jobs) {
      res.json(jobs);
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

booksRoutes.route("/").post(function (req, res) {
  db.collection("jobs").insertOne(req.body);
  res.send(req.body);
});

booksRoutes.route("/:id").put(function (req, res) {
  const filter = { id: req.params.id }; // Filter by id
  const update = {
    $set: {
      title: req.body.title,
      description: req.body.description,
      companyName: req.body.companyName,
      category: req.body.category,
      hours: req.body.hours,
      remote: req.body.remote,
      untilDate: req.body.untilDate,
    },
  };

  db.collection("jobs")
    .findOneAndUpdate(filter, update)
    .then(() => {
      res.send(); // Send a response when the update is complete
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
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
    Worker.findOne({ id: req.params.id })
      .then(function (worker) {
        if (worker) {
          res.json(worker);
        } else {
          res.status(404).json({ error: "Worker not found" });
        }
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  } else {
    res.status(400).json({ error: "Invalid ID parameter" });
  }
});

applyWorker.route("/my/:id").get(function (req, res) {
  Worker.find().then(function (workers) {
    res.json(workers.filter((e) => e.user === req.params.id));
  });
});

applyWorker.route("/").get(function (req, res) {
  Worker.find().then(function (workers) {
    res.json(workers);
  });
});

applyWorker.route("/").post(function (req, res) {
  db.collection("works").insertOne(req.body);
  res.send(req.body);
});

applyWorker.route("/:id").put(function (req, res) {
  db.collection("works")
    .findOneAndUpdate()
    .then(
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
  Apply.find().then(function (applies) {
    res.json(applies.filter((e) => e.user.id === userID));
  });
});

applyRoutes.route("/applicants/:id").get(function (req, res) {
  const jobID = req.params.id;
  Apply.find().then(function (applies) {
    res.json(applies.filter((e) => e.job.id === jobID));
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

// -------------------------- Managing Interviews ----------------------

let Interview = require("./interview.model");

const interviewsRoutes = express.Router();
app.use("/interviews", interviewsRoutes);

interviewsRoutes.route("/:id").get(function (req, res) {
  const userID = req.params.id;
  Interview.find().then(function (interviews) {
    res.json(interviews.filter((e) => e.user.id === userID));
  });
});

interviewsRoutes.route("/companies/:id").get(function (req, res) {
  const jobID = req.params.id;
  Interview.find().then(function (interviews) {
    res.json(interviews.filter((e) => e.worker.id === jobID));
    res.json(interviews.filter((e) => e.worker.id === jobID));

    res.json(interviews.filter((e) => e.worker.id === jobID));
  });
});

interviewsRoutes.route("/").post(function (req, res) {
  db.collection("interviews").insertOne(req.body);
  res.send(req.body);
});

// ----------------------------------------- Managing statistics---------------------------

const statsRoutes = express.Router();
app.use("/stats", statsRoutes);

statsRoutes.route("/jobs").get(function (req, res) {
  Job.find()
    .then(function (jobs) {
      let stats = [];
      stats.push({ jobsNumber: jobs.length });
      const category = ["programming", "science", "economy"];
      let categoryNumber = [0, 0, 0];
      jobs.forEach((element) => {
        if (element.category === category[0]) {
          categoryNumber[0] = categoryNumber[0] + 1;
        }
        if (element.category === category[1]) {
          categoryNumber[1] = categoryNumber[1] + 1;
        }
        if (element.category === category[2]) {
          categoryNumber[2] = categoryNumber[2] + 1;
        }
      });
      stats.push({
        categories: [
          { programming: categoryNumber[0] },
          { science: categoryNumber[1] },
          { economy: categoryNumber[2] },
        ],
      });
      res.send(stats);
    })
    .catch(function (err) {
      console.log(err);

      res.status(500).json({ error: "Internal Server Error" });
    });
});

statsRoutes.route("/workers").get(function (req, res) {
  Worker.find().then(function (workers) {
    let stats = [];

    stats.push({ workersNumber: workers.length });
    const category = ["programming", "science", "economy"];
    let categoryNumber = [0, 0, 0];
    workers.forEach((element) => {
      if (element.category === category[0]) {
        categoryNumber[0] = categoryNumber[0] + 1;
      }
      if (element.category === category[1]) {
        categoryNumber[1] = categoryNumber[1] + 1;
      }
      if (element.category === category[2]) {
        categoryNumber[2] = categoryNumber[2] + 1;
      }
    });
    stats.push({
      categories: [
        { programming: categoryNumber[0] },
        { science: categoryNumber[1] },
        { economy: categoryNumber[2] },
      ],
    });

    res.send(stats);
  });
});

statsRoutes.route("/applies").get(function (req, res) {
  Apply.find().then(function (applies) {
    let stats = [];

    stats.push({ appliesNumber: applies.length });
    const gender = ["male", "female"];
    let genderNumber = [0, 0];
    applies.forEach((element) => {
      if (element.user.gender === gender[0]) {
        genderNumber[0] = genderNumber[0] + 1;
      }
      if (element.user.gender === gender[1]) {
        genderNumber[1] = genderNumber[1] + 1;
      }
    });
    stats.push({
      gender: [{ male: genderNumber[0] }, { female: genderNumber[1] }],
    });

    res.send(stats);
  });
});

//------ Detyrat para prezantimit-------------

//---------a) device---------------

let Device = require("./device.model");
const deviceRoots = express.Router();
app.use("/devices", deviceRoots);

deviceRoots.route("/").post(function (req, res) {
  db.collection("devices").insertOne(req.body);
  res.send(req.body);
});

deviceRoots.route("/:id").get(function (req, res) {
  if (req.params.id !== undefined) {
    Device.findOne({ deviceId })
      .then(function (device) {
        if (device) {
          res.json(device);
        } else {
          res.status(404).json({ error: "Device not found" });
        }
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
});

deviceRoots.route("/").get(function (req, res) {
  Device.find().then(function (devices) {
    res.json(devices);
  });
});

//---------b) sensor---------------

let Sensor = require("./sensor.model");
const sensorRoots = express.Router();
app.use("/sensors", sensorRoots);

sensorRoots.route("/").post(function (req, res) {
  db.collection("sensors").insertOne(req.body);
  res.send(req.body);
});

sensorRoots.route("/:id").get(function (req, res) {
  if (req.params.id !== undefined) {
    Sensor.findOne({ _id: req.params.id })
      .then(function (sensor) {
        if (sensor) {
          res.json(sensor);
        } else {
          res.status(404).json({ error: "Sensor not found" });
        }
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
});

sensorRoots.route("/").get(function (req, res) {
  Sensor.find().then(function (sensor) {
    res.json(sensor);
  });
});

//------------ c) shfaqja e te gjithe devices dhe sensors

deviceRoots.route("/all-devices-and-sensors").get(async function (req, res) {
  try {
    const sensors = await Sensor.find();
    const devices = await Device.find();

    res.send({
      sensors,
      devices,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//--------- e) shfaqja e sensors duke dhene si input device name te caktuar -------------

sensorRoots.route("/filter-by-name/:name").get(function (req, res) {
  if (req.params.name !== undefined) {
    Device.findOne({ name: req.params.name })
      .then(function (device) {
        if (device) {
          Device.find({ deviceId: device.deviceId })
            .then(function (sensors) {
              if (sensors) {
                res.json(sensors);
              } else {
                res.status(200).json({ error: "sensors not found" });
              }
            })
            .catch(function (err) {
              console.error(err);
              res.status(500).json({ error: "Internal Server Error" });
            });
        } else {
          res.status(404).json({ error: "device not found" });
          return;
        }
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
});

// --------- r) UpdateSensors --------------

sensorRoots.route("/:id").put(function (req, res) {
  const objectId = new ObjectId(req.params.id);

  db.collection("sensors")
    .findOneAndUpdate(
      { _id: objectId },
      {
        $set: {
          name: req.body.name,
          value: req.body.value,
        },
      }
    )
    .then();
  res.send();
});

//---------- f) fshirja e devices --------------

deviceRoots.route("/:id").delete(async (req, res) => {
  try {
    const objectId = new ObjectId(req.params.id);
    const result = await Device.deleteOne({ _id: objectId });

    if (result.deletedCount === 1) {
      res.send("Device deleted successfully.");
    } else {
      res.send("Device not found or already deleted.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error on server");
  }
});
