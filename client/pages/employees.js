import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import TitleAndDescription from "@/components/TitleAndDescription";
import InputLabelAndDesign from "@/components/InputLabelAndDesign";
import Button from "@/components/Button";

function Employees() {
  const [employees, setEmployees] = useState([]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const fetchEmployees = () => {
    axios
      .get("http://localhost:4000/employees")
      .then((response) => {
        setEmployees(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error("Gabim gjatë marrjes së puntoreve:", error);
      });
  };
  const fetchDepartments = () => {
    axios
      .get("http://localhost:4000/departments")
      .then((response) => {
        setDepartments(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Gabim gjatë marrjes së puntoreve:", error);
      });
  };
  // fetchDepartments();
  const deleteEmployees = (id) => {
    axios
      .delete("http://localhost:4000/employees/" + id)
      .then((response) => {})
      .catch((error) => {
        console.error("Gabim gjatë marrjes së puntoreve:", error);
      });
  };

  function UpdateEmployee() {
    const [id, setEmployeeId] = useState("");
    const [name, setEmployeeName] = useState("");
    const [birthYear, setEmployeeBirthYear] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleEmployeeBirthYearChange = (e) => {
      setEmployeeBirthYear(e.target.value);
    };

    const updateEmployee = () => {
      setMessage("");
      setError("");
    };
  }
  console.log(employees);
  return (
    <Layout>
      <div className="flex justify-center items-center w-full h-full flex-col mt-20">
        <div className="w-96 border p-8 border-primary">
          <TitleAndDescription
            title="Shfaq te gjithe puntoret "
            titleCustomStyle="text-center"
            descriptionCustomStyle="w-full"
          />

          <button
            type="submit"
            onClick={() => fetchEmployees()}
            className="border-4 border-primary text-primary hover:text-white hover:bg-primary hover:border-white/25 mt-4 xl:mt-6 w-full py-2 text-center font-regular text-16 rounded-full"
          >
            Shfaq puntoret
          </button>

          <ul>
            {employees?.map((employee) => (
              <li key={employee.id}>
                <div className="w-full  flex items-center justify-between">
                  {employee.name} ({employee.surname}) {employee.birthYear}
                  {employee.departmentId}
                  <a
                    type="button"
                    href={"UpdateEmployee?id=" + employee._id}
                    className="border-4 border-primary text-primary hover:text-white hover:bg-primary hover:border-white/25 mt-4 xl:mt-6 w-20 py-2 text-center font-regular text-16 rounded-full"
                  >
                    Edit
                  </a>
                  <button
                    type="button"
                    onClick={() => deleteEmployees(employee._id)}
                    className="border-4 border-primary text-primary hover:text-white hover:bg-primary hover:border-white/25 mt-4 xl:mt-6 w-20 py-2 text-center font-regular text-16 rounded-full"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default Employees;
