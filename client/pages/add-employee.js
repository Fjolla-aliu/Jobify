import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@/components/Button";
import TitleAndDescription from "@/components/TitleAndDescription";
import InputLabelAndDesign from "@/components/InputLabelAndDesign";

export default function AddEmployee() {
  const [employeeData, setEmployeeData] = useState({
    id: "",
    name: "",
    surname: "",
    birthYear: "",
    departmentId: "",
  });
  const [department, setDepartments] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  useEffect(() => {
    function fetch() {
      axios
        .get("http://localhost:4000/departments")
        .then((response) => {
          setDepartments(response.data);
        })
        .catch((error) => {
          console.error("Gabim gjatë shtimit të employee.");
        });
    }
    fetch();
  }, []);

  const AddEmployee = () => {
    axios
      .post("http://localhost:4000/employees", employeeData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Gabim gjatë shtimit të employees.");
      });
  };

  return (
    <Layout>
      <div className="flex justify-center items-center w-full h-full flex-col mt-20">
        <TitleAndDescription
          title="Shto Puntorin"
          titleCustomStyle="text-center"
          descriptionCustomStyle="w-full"
        />
        <form
          onSubmit={AddEmployee}
          className="w-96  border-primary border rounded-xl p-8"
        >
          <InputLabelAndDesign label="Id">
            <input
              type="text"
              id="id"
              name="id"
              className="w-full outline-none"
              value={employeeData.id}
              onChange={handleInputChange}
            />
          </InputLabelAndDesign>

          <br />
          <InputLabelAndDesign label="Name">
            <input
              type="text"
              id="name"
              name="name"
              className="w-full outline-none"
              value={employeeData.name}
              onChange={handleInputChange}
            />
          </InputLabelAndDesign>
          <br />

          <br />
          <br />
          <InputLabelAndDesign label="Surname">
            <input
              type="text"
              id="surname"
              name="surname"
              className="w-full outline-none"
              value={employeeData.surname}
              onChange={handleInputChange}
            />
          </InputLabelAndDesign>
          <br />
          <br />
          <InputLabelAndDesign label="birthYear">
            <input
              type="text"
              id="birthYear"
              name="birthYear"
              className="w-full outline-none"
              value={employeeData.birthYear}
              onChange={handleInputChange}
            />
          </InputLabelAndDesign>
          <br />

          <InputLabelAndDesign label="Department id">
            <select
              id="department"
              name="department"
              className="w-full outline-none"
              defaultValue={employeeData.departmentId}
              onChange={handleInputChange}
            >
              {department?.map((department) => (
                <option key={department.departmentId} value={department.name}>
                  {department.name}
                </option>
              ))}
            </select>
          </InputLabelAndDesign>
          <br />

          <Button
            type="submit"
            label="Shto Employe"
            className="border-4 border-primary text-primary hover:text-white hover:bg-primary hover:border-white/25 mt-4 xl:mt-6"
          />
        </form>
      </div>
    </Layout>
  );
}
