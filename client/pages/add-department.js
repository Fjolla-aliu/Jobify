import Layout from "../components/Layout";
import { useState } from "react";
import axios from "axios";
import InputLabelAndDesign from "@/components/InputLabelAndDesign";
import Button from "@/components/Button";
import TitleAndDescription from "@/components/TitleAndDescription";

export default function AddDepartment() {
  const [departmentData, setDepartmentData] = useState({
    departmentId: "",
    name: "",
    number: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepartmentData({
      ...departmentData,
      [name]: value,
    });
  };

  const addDepartment = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/departments", departmentData)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Gabim gjatë shtimit të departamentit.");
      });
  };

  return (
    <Layout>
      <div className="flex justify-center items-center w-full h-full flex-col mt-20">
        <TitleAndDescription
          title="Shto Departamentin"
          titleCustomStyle="text-center"
          descriptionCustomStyle="w-full"
        />
        <form
          onSubmit={addDepartment}
          className="w-96  border-primary border rounded-xl p-8"
        >
          <InputLabelAndDesign label="departmentId">
            <input
              type="text"
              id="departmentId"
              name="departmentId"
              className="w-full outline-none"
              value={departmentData.departmentId}
              onChange={handleInputChange}
            />
          </InputLabelAndDesign>
          <br />

          <InputLabelAndDesign label="Name">
            <input
              type="text"
              id="name"
              name="name"
              surname="surname"
              className="w-full outline-none"
              value={departmentData.name}
              onChange={handleInputChange}
            />
          </InputLabelAndDesign>
          <br />

          {/* <InputLabelAndDesign label="isDeleted">
          <input
            type="checkbox"
            id="isDeleted"
            name="isDeleted"
            className="outline-none"
            checked={applicantData.isDeleted}
            onChange={handleInputChange}
          />
        </InputLabelAndDesign> */}
          <br />

          <Button
            type="submit"
            label="Shto Departamentin"
            className="border-4 border-primary text-primary hover:text-white hover:bg-primary hover:border-white/25 mt-4 xl:mt-6"
          />
        </form>
      </div>
    </Layout>
  );
}
