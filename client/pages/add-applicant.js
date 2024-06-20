import { useState } from "react";
import axios from "axios";
import InputLabelAndDesign from "@/components/InputLabelAndDesign";
import Button from "@/components/Button";
import TitleAndDescription from "@/components/TitleAndDescription";

export default function AddApplicant() {
  const [applicantData, setApplicantData] = useState({
    applicantId: "",
    name: "",
    isDeleted: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicantData({
      ...applicantData,
      [name]: value,
    });
  };

  const addApplicant = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/applicants", applicantData)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Gabim gjatë shtimit të aplikantit.");
      });
  };

  return (
    <div className="flex justify-center items-center w-full h-full flex-col mt-20">
      <TitleAndDescription
        title="Shto Aplikantin"
        titleCustomStyle="text-center"
        descriptionCustomStyle="w-full"
      />
      <form
        onSubmit={addApplicant}
        className="w-96  border-primary border rounded-xl p-8"
      >
        <InputLabelAndDesign label="applicantId">
          <input
            type="text"
            id="applicantId"
            name="applicantId"
            className="w-full outline-none"
            value={applicantData.applicantId}
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
            value={applicantData.name}
            onChange={handleInputChange}
          />
        </InputLabelAndDesign>
        <br />

        <InputLabelAndDesign label="isDeleted">
          <input
            type="checkbox"
            id="isDeleted"
            name="isDeleted"
            className="outline-none"
            checked={applicantData.isDeleted}
            onChange={handleInputChange}
          />
        </InputLabelAndDesign>
        <br />

        <Button
          type="submit"
          label="Shto Regjisorin"
          className="border-4 border-primary text-primary hover:text-white hover:bg-primary hover:border-white/25 mt-4 xl:mt-6"
        />
      </form>
    </div>
  );
}
