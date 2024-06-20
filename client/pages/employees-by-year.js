import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import TitleAndDescription from "@/components/TitleAndDescription";
import InputLabelAndDesign from "@/components/InputLabelAndDesign";
import Button from "@/components/Button";

function EmployeesByYear() {
  const [year, setYear] = useState("");
  const [employees, setEmployees] = useState([]);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const fetchEmployeesByYear = () => {
    axios
      .get("http://localhost:4000/employees/filter-by-year/" + year)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Gabim gjatë marrjes së Employees:", error);
      });
  };

  return (
    <Layout>
      <div className="flex justify-center items-center w-full h-full flex-col mt-20">
        <div className="w-96 border p-8 border-primary">
          <TitleAndDescription
            title="Shfaq employees e nje viti te caktuar"
            titleCustomStyle="text-center"
            descriptionCustomStyle="w-full"
          />
          <InputLabelAndDesign label="Shkruaj vitin e lindjes:">
            <input
              type="text"
              id="year"
              name="year"
              value={year}
              onChange={handleYearChange}
            />
          </InputLabelAndDesign>

          <button
            type="submit"
            onClick={() => fetchEmployeesByYear()}
            className="border-4 border-primary text-primary hover:text-white hover:bg-primary hover:border-white/25 mt-4 xl:mt-6 w-full py-2 text-center font-regular text-16 rounded-full"
          >
            Shfaq employees
          </button>

          <ul>
            {employees.map((employee) => (
              <li key={employee.id}>
                {employee.name} {employee.surname} ({employee.birthYear})
                Department name : {employee.department}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default EmployeesByYear;
