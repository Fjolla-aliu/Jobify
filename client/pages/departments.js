import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import TitleAndDescription from "@/components/TitleAndDescription";
import InputLabelAndDesign from "@/components/InputLabelAndDesign";
import Button from "@/components/Button";

function Departments() {
  const [departments, setDepartments] = useState([]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const fetchDepartments = () => {
    axios
      .get("http://localhost:4000/departments")
      .then((response) => {
        setDepartments(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Gabim gjatë marrjes së aplikimeve:", error);
      });
  };
  const deleteDepartments = (departmentId) => {
    axios
      .delete("http://localhost:4000/departments/" + departmentId)
      .then((response) => {})
      .catch((error) => {
        console.error("Gabim gjatë fshirjes së aplikimeve:", error);
      });
  };

  return (
    <Layout>
      <div className="flex justify-center items-center w-full h-full flex-col mt-20">
        <div className="w-96 border p-8 border-primary">
          <TitleAndDescription
            title="Shfaq te gjithe departamentet "
            titleCustomStyle="text-center"
            descriptionCustomStyle="w-full"
          />

          <button
            type="submit"
            onClick={() => fetchDepartments()}
            className="border-4 border-primary text-primary hover:text-white hover:bg-primary hover:border-white/25 mt-4 xl:mt-6 w-full py-2 text-center font-regular text-16 rounded-full"
          >
            Shfaq departamentet
          </button>

          <ul>
            {departments?.map((department) => (
              <li key={department.departmentId}>
                <div className="w-full  flex items-center justify-between">
                  {department.name} ({department.number})
                  <button
                    type="submit"
                    onClick={() => deleteDepartments(department._id)}
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

export default Departments;
