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

//-------------------a) directors ------------------

let Director = require("./director.model");
const drirectorRoots = express.Router();
app.use("/directors", drirectorRoots);

drirectorRoots.route("/").post(function (req, res) {
  db.collection("directors").insertOne(req.body);
  res.send(req.body);
});

drirectorRoots.route("/:id").get(function (req, res) {
  if (req.params.id !== undefined) {
    Director.findOne({ directorId: req.params.id })
      .then(function (drirector) {
        if (drirector) {
          res.json(drirector);
        } else {
          res.status(404).json({ error: "drirector not found" });
        }
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
});

drirectorRoots.route("/").get(function (req, res) {
  Director.find().then(function (directors) {
    res.json(directors);
  });
});

// ---------------- b) ---------------

let Movie = require("./movie.model");
const moviesRoots = express.Router();
app.use("/movies", moviesRoots);

moviesRoots.route("/").post(function (req, res) {
  db.collection("movies").insertOne(req.body);
  res.send(req.body);
});

moviesRoots.route("/:id").get(function (req, res) {
  if (req.params.id !== undefined) {
    Movie.findOne({ id: req.params.id })
      .then(function (movies) {
        if (movies) {
          res.json(movies);
        } else {
          res.status(404).json({ error: "movies not found" });
        }
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
});

moviesRoots.route("/").get(function (req, res) {
  Movie.find().then(function (movie) {
    res.json(movie);
  });
});

//------------------- c)  -------------
moviesRoots.route("/filter-by-year/:year").get(function (req, res) {
  if (req.params.year !== undefined) {
    Movie.find({ releaseYear: req.params.year })
      .then(function (movies) {
        if (movies) {
          res.json(movies);
        } else {
          res.status(404).json({ error: "movies not found" });
        }
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
});

//------------------- d)  -------------
moviesRoots.route("/filter-by-name/:name").get(function (req, res) {
  if (req.params.name !== undefined) {
    Director.findOne({ name: req.params.name })
      .then(function (drirector) {
        if (drirector) {
          Movie.find({ directorId: drirector.directorId })
            .then(function (movies) {
              if (movies) {
                res.json(movies);
              } else {
                res.status(404).json({ error: "movies not found" });
              }
            })
            .catch(function (err) {
              console.error(err);
              res.status(500).json({ error: "Internal Server Error" });
            });
        } else {
          res.status(404).json({ error: "drirector not found" });
          return;
        }
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
});

// -------------- e) --------------

drirectorRoots.route("/:id").put(function (req, res) {
  db.collection("directors")
    .findOneAndUpdate(
      { directorId: req.params.id },
      {
        $set: {
          name: req.body.name,
          birthYear: req.body.birthYear,
        },
      }
    )
    .then();
  res.send();
});

//---------a) applicant---------------

let Applicant = require("./applicant.model");
const applicantRoots = express.Router();
app.use("/applicants", applicantRoots);

applicantRoots.route("/").post(function (req, res) {
  db.collection("applicants").insertOne(req.body);
  res.send(req.body);
});

applicantRoots.route("/:id").get(function (req, res) {
  if (req.params.id !== undefined) {
    Applicant.findOne({ applicantId, isDeleted: false })
      .then(function (applicant) {
        if (applicant) {
          res.json(applicant);
        } else {
          res.status(404).json({ error: "Applicant not found" });
        }
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
});

applicantRoots.route("/").get(function (req, res) {
  Applicant.find().then(function (applicants) {
    res.json(applicants);
  });
});

//---------b) applications---------------

let Application = require("./application.model");
const applicationRoots = express.Router();
app.use("/applications", applicationRoots);

applicationRoots.route("/").post(function (req, res) {
  db.collection("applications").insertOne(req.body);
  res.send(req.body);
});

applicationRoots.route("/:id").get(function (req, res) {
  if (req.params.id !== undefined) {
    Application.findOne({ id, isDeleted: false })
      .then(function (application) {
        if (application) {
          res.json(application);
        } else {
          res.status(404).json({ error: "Application not found" });
        }
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
});

applicationRoots.route("/").get(function (req, res) {
  Application.find().then(function (application) {
    res.json(application);
  });
});

//------------ c) shfaqja e te gjithe aplikanteve dhe aplikacioneve

applicantRoots
  .route("/all-applicants-and-applications")
  .get(async function (req, res) {
    try {
      const applications = await Application.find();
      const applicants = await Applicant.find({ isDeleted: false });

      res.send({
        applications,
        applicants,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

//---------------d) aplikimet e dates se sotme

applicationRoots.route("/today/:year").get(async function (req, res) {
  try {
    // Find applications created today
    const applications = await Application.find({
      date: req.params.year,
    });
    // Find applicants (excluding deleted)
    const applicants = await Applicant.find({ isDeleted: false });

    res.send({
      applications,
      applicants,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//--------- e) shfaqja e applications duke dhene si input aplikantin e caktuar -------------

applicationRoots.route("/filter-by-name/:name").get(function (req, res) {
  if (req.params.name !== undefined) {
    Applicant.findOne({ name: req.params.name })
      .then(function (applicant) {
        if (applicant) {
          Application.find({ applicantId: applicant.applicantId })
            .then(function (applications) {
              if (applications) {
                res.json(applications);
              } else {
                res.status(200).json({ error: "applications not found" });
              }
            })
            .catch(function (err) {
              console.error(err);
              res.status(500).json({ error: "Internal Server Error" });
            });
        } else {
          res.status(404).json({ error: "applicant not found" });
          return;
        }
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
});

//---------- f) fshirja e aplikanteve --------------

applicantRoots.route("/:id").delete(async (req, res) => {
  try {
    const objectId = new ObjectId(req.params.id); // Convert the string ID to an ObjectId
    const result = await Applicant.deleteOne({ _id: objectId });

    if (result.deletedCount === 1) {
      res.send("Document deleted successfully.");
    } else {
      res.send("Document not found or already deleted.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error on server");
  }
});

//---------- f) fshirja e aplikimeve --------------

applicationRoots.route("/:id").delete(async (req, res) => {
  try {
    const objectId = new ObjectId(req.params.id); // Convert the string ID to an ObjectId
    const result = await Application.deleteOne({ _id: objectId });

    if (result.deletedCount === 1) {
      res.send("Document deleted successfully.");
    } else {
      res.send("Document not found or already deleted.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error on server");
  }
});

//---------a) department---------------

let Department = require("./department.model");
const departmentRoots = express.Router();
app.use("/departments", departmentRoots);

departmentRoots.route("/").post(function (req, res) {
  db.collection("departments").insertOne(req.body);
  res.send(req.body);
});

departmentRoots.route("/:id").get(function (req, res) {
  if (req.params.id !== undefined) {
    Department.findOne({ departmentId: req.params.id })
      .then(function (department) {
        if (department) {
          res.json(department);
        } else {
          res.status(404).json({ error: "Department not found" });
        }
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
});

departmentRoots.route("/").get(function (req, res) {
  Department.find().then(function (departments) {
    res.json(departments);
  });
});

//---------b) employees---------------

let Employee = require("./employee.model");
const employeeRoots = express.Router();
app.use("/employees", employeeRoots);

employeeRoots.route("/").post(function (req, res) {
  db.collection("employees").insertOne(req.body);
  res.send(req.body);
});

employeeRoots.route("/:id").get(function (req, res) {
  if (req.params.id !== undefined) {
    Employee.findOne({ _id: req.params.id })
      .then(function (employee) {
        if (employee) {
          res.json(employee);
        } else {
          res.status(404).json({ error: "Employee not found" });
        }
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
});

employeeRoots.route("/").get(function (req, res) {
  Employee.find().then(function (employee) {
    res.json(employee);
  });
});

//------------ c) shfaqja e te gjithe departamenteve dhe punetoreve

departmentRoots
  .route("/all-departments-and-employees")
  .get(async function (req, res) {
    try {
      const employees = await Employee.find();
      const departments = await Department.find();

      res.send({
        employees,
        departments,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

//------------------- d)  -------------
employeeRoots.route("/filter-by-year/:year").get(function (req, res) {
  if (req.params.year !== undefined) {
    Employee.find({ birthYear: req.params.year })
      .then(function (employees) {
        if (employees) {
          res.json(employees);
        } else {
          res.status(404).json({ error: "employees not found" });
        }
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
});

//---------- f) fshirja e dep --------------

departmentRoots.route("/:id").delete(async (req, res) => {
  try {
    const objectId = new ObjectId(req.params.id); // Convert the string ID to an ObjectId
    const result = await Department.deleteOne({ _id: objectId });

    if (result.deletedCount === 1) {
      res.send("Document deleted successfully.");
    } else {
      res.send("Document not found or already deleted.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error on server");
  }
});

//---------- f) fshirja e puntorve --------------

employeeRoots.route("/:id").delete(async (req, res) => {
  try {
    const objectId = new ObjectId(req.params.id); // Convert the string ID to an ObjectId
    const result = await Employee.deleteOne({ _id: objectId });

    if (result.deletedCount === 1) {
      res.send("Document deleted successfully.");
    } else {
      res.send("Document not found or already deleted.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error on server");
  }
});

// -------------- e) --------------

employeeRoots.route("/:id").put(function (req, res) {
  const objectId = new ObjectId(req.params.id); // Convert the string ID to an ObjectId

  db.collection("employees")
    .findOneAndUpdate(
      { _id: objectId },
      {
        $set: {
          name: req.body.name,
          surname: req.body.surname,
          birthYear: req.body.birthYear,
        },
      }
    )
    .then();
  res.send();
});

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
