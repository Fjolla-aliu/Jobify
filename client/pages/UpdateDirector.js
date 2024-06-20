// components/UpdateDirector.js
import Layout from "../components/Layout";
import React, { useState } from "react";
import axios from "axios";
import TitleAndDescription from "@/components/TitleAndDescription";
import InputLabelAndDesign from "@/components/InputLabelAndDesign";
import Button from "@/components/Button";

export default function UpdateDirector() {
  const [directorId, setDirectorId] = useState("");
  const [directorName, setDirectorName] = useState("");
  const [directorBirthYear, setDirectorBirthYear] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleDirectorIdChange = (e) => {
    setDirectorId(e.target.value);
  };

  const handleDirectorNameChange = (e) => {
    setDirectorName(e.target.value);
  };

  const handleDirectorBirthYearChange = (e) => {
    setDirectorBirthYear(e.target.value);
  };

  const updateDirector = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    axios
      .put("http://localhost:8080/directors/" + directorId, {
        name: directorName,
        birthYear: directorBirthYear,
      })
      .then((response) => {
        setMessage("Director updated successfully.");
      })
      .catch((error) => {
        setError("Error updating director.");
      });
  };

  return (
    <Layout>
      <div className="w-full h-full flex justify-center items-center mt-20">
        <div className="w-96 border p-8 border-primary">
          <TitleAndDescription
            title="Update Director"
            titleCustomStyle="text-center"
            descriptionCustomStyle="w-full"
          />
          <InputLabelAndDesign label="Director ID:">
            <input
              type="text"
              id="directorId"
              className="w-full outline-none"
              name="directorId"
              value={directorId}
              onChange={handleDirectorIdChange}
            />
          </InputLabelAndDesign>

          <InputLabelAndDesign label="New Director Name:">
            <input
              type="text"
              id="directorName"
              className="w-full outline-none"
              name="directorName"
              value={directorName}
              onChange={handleDirectorNameChange}
            />
          </InputLabelAndDesign>

          <InputLabelAndDesign label="New Birth Year:">
            <input
              type="text"
              id="directorBirthYear"
              className="w-full outline-none"
              name="directorBirthYear"
              value={directorBirthYear}
              onChange={handleDirectorBirthYearChange}
            />
          </InputLabelAndDesign>

          <Button onClick={updateDirector} className="mt-4 xl:mt-6 w-full">
            Update Director
          </Button>
          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </Layout>
  );
}
