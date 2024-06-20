import React, { useState } from "react";
import axios from "axios";
import TitleAndDescription from "@/components/TitleAndDescription";
import InputLabelAndDesign from "@/components/InputLabelAndDesign";
import Button from "@/components/Button";

function ApplicationsbyApplicants() {
  const [applicantName, setApplicantName] = useState("");
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  const handleApplicantNameChange = (e) => {
    setApplicantName(e.target.value);
  };

  const fetchApplicationsbyApplicants = () => {
    setError("");
    axios
      .get("http://localhost:4000/applications/filter-by-name/" + applicantName)

      .then((response) => {
        setApplications(response.data);
      })
      .catch((error) => {
        setError("Gabim gjatë marrjes së aplikimeve.");
      });
  };

  return (
    <div className="flex justify-center items-center w-full h-full flex-col mt-20">
      <div className="w-96 border p-8 border-primary">
        <TitleAndDescription
          title="Shfaq aplikimet e Një Aplikanti"
          titleCustomStyle="text-center"
          descriptionCustomStyle="w-full"
        />
        <InputLabelAndDesign label="Emri i Aplikantit:">
          <input
            type="text"
            id="applicantName"
            className="w-full outline-none"
            name="applicantName"
            value={applicantName}
            onChange={handleApplicantNameChange}
          />
        </InputLabelAndDesign>

        <button
          type="submit"
          onClick={() => fetchApplicationsbyApplicants()}
          className="border-4 border-primary text-primary hover:text-white hover:bg-primary hover:border-white/25 mt-4 xl:mt-6 w-full py-2 text-center font-regular text-16 rounded-full"
        >
          Shfaq Aplikimet
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {applications.map((application) => (
            <li key={application.id}>
              {application.date}-{application.isActive}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ApplicationsbyApplicants;
