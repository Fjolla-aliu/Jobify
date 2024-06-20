import { useState } from "react";
import axios from "axios";
import InputLabelAndDesign from "@/components/InputLabelAndDesign";
import Button from "@/components/Button";
import TitleAndDescription from "@/components/TitleAndDescription";

export default function AddDirector() {
  const [directorData, setDirectorData] = useState({
    DirectorId: "",
    name: "",
    birthYear: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDirectorData({
      ...directorData,
      [name]: value,
    });
  };

  const addDirector = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/director", directorData)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Gabim gjatë shtimit të regjisorit.");
      });
  };

  return (
    <div className="flex justify-center items-center w-full h-full flex-col mt-20">
      <TitleAndDescription
        title="Shto Regjisorin"
        titleCustomStyle="text-center"
        descriptionCustomStyle="w-full"
      />
      <form
        onSubmit={addDirector}
        className="w-96  border-primary border rounded-xl p-8"
      >
        <InputLabelAndDesign label="DirectorId">
          <input
            type="text"
            id="DirectorId"
            name="DirectorId"
            className="w-full outline-none"
            value={directorData.DirectorId}
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
            value={directorData.name}
            onChange={handleInputChange}
          />
        </InputLabelAndDesign>
        <br />

        <InputLabelAndDesign label="BirthYear">
          <input
            type="text"
            id="birthYear"
            name="birthYear"
            className="w-full outline-none"
            value={directorData.birthYear}
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
