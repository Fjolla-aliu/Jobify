import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TitleAndDescription from "@/components/TitleAndDescription";
import InputLabelAndDesign from "@/components/InputLabelAndDesign";
import Button from "@/components/Button";
import { useRouter } from "next/router";

function UpdateEmployee() {
  const [emplo, setEmployeeId] = useState("");
  const [name, setEmployeeName] = useState("");
  const [surname, setEmployeeSurname] = useState("");
  const [birthYear, setEmployeeBirthYear] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const handleEmployeeIdChange = (e) => {
    setEmployeeId(e.target.value);
  };
  const handleEmployeeNameChange = (e) => {
    setEmployeeName(e.target.value);
  };
  const handleEmployeeSurnameChange = (e) => {
    setEmployeeName(e.target.value);
  };

  const handleEmployeeBirthYearChange = (e) => {
    setEmployeeBirthYear(e.target.value);
  };
  useEffect(() => {
    axios

      .get("http://localhost:4000/employees/" + id)
      .then((response) => {
        const data = response.data;
        setEmployeeName(data.name);
        setEmployeeSurname(data.surname);
        setEmployeeBirthYear(data.birthYear);
      })
      .catch((error) => {
        console.error("Gabim gjatë marrjes së puntoreve:", error);
      });
  }, [id]);

  const updateEmployee = () => {
    setMessage("");
    setError("");

    axios
      .put("http://localhost:4000/employees/" + id, {
        name: name,
        surname: surname,
        birthYear: birthYear,
      })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        setError("Gabim gjatë përditësimit të employee.");
      });
  };

  return (
    <Layout>
      <div className="flex justify-center items-center w-full h-full flex-col mt-20">
        <div className="w-96 border p-8 border-primary">
          <TitleAndDescription
            title="Perditeso employee"
            titleCustomStyle="text-center"
            descriptionCustomStyle="w-full"
          />
          <InputLabelAndDesign label="Id e employee:">
            <input
              type="text"
              id="employeeId"
              className="w-full outline-none"
              name="employeeId"
              disabled
              defaultValue={id}
              onChange={handleEmployeeIdChange}
            />
          </InputLabelAndDesign>

          <InputLabelAndDesign label="Emri i ri i regjisorit:">
            <input
              type="text"
              id="employeeName"
              className="w-full outline-none"
              name="employeeName"
              defaultValue={name}
              onChange={handleEmployeeNameChange}
            />
          </InputLabelAndDesign>
          <br />
          <InputLabelAndDesign label="Surname">
            <input
              type="text"
              id="surname"
              name="surname"
              className="w-full outline-none"
              defaultValue={surname}
              onChange={handleEmployeeSurnameChange}
            />
          </InputLabelAndDesign>
          <br />

          <InputLabelAndDesign label="viti i lindjes:">
            <input
              type="text"
              id="employeeBirthYear"
              className="w-full outline-none"
              name="employeeBirthYear"
              defaultValue={birthYear}
              onChange={handleEmployeeBirthYearChange}
            />
          </InputLabelAndDesign>

          <button
            type="submit"
            onClick={() => updateEmployee()}
            className="border-4 border-primary text-primary hover:text-white hover:bg-primary hover:border-white/25 mt-4 xl:mt-6 w-full py-2 text-center font-regular text-16 rounded-full"
          >
            Perditeso UpdateEmployee
          </button>
          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </Layout>
  );
}

export default UpdateEmployee;
