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
    Department.findOne({ departmentId, surname })
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

//-------- d) Punetoret ne baze te vitit te lindjes -------------

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

//---------- e) fshirja e dep --------------

departmentRoots.route("/:id").delete(async (req, res) => {
  try {
    const objectId = new ObjectId(req.params.id);
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

//---------- e) fshirja e puntorve --------------

employeeRoots.route("/:id").delete(async (req, res) => {
  try {
    const objectId = new ObjectId(req.params.id);
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

// --------- f) UpdateEmployees --------------

employeeRoots.route("/:id").put(function (req, res) {
  const objectId = new ObjectId(req.params.id);

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
