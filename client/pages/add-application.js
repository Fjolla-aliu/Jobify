import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@/components/Button";
import TitleAndDescription from "@/components/TitleAndDescription";
import InputLabelAndDesign from "@/components/InputLabelAndDesign";

export default function AddApplication() {
  const [applicationData, setApplicationData] = useState({
    id: "",
    date: "",
    isActive: true,
    directorId: "",
  });
  const [applicant, setApplicants] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData({
      ...applicationData,
      [name]: value,
    });
  };

  useEffect(() => {
    function fetch() {
      axios
        .get("http://localhost:4000/applicants")
        .then((response) => {
          setApplicants(response.data);
        })
        .catch((error) => {
          console.error("Gabim gjatë shtimit të aplikimit.");
        });
    }
    fetch();
  }, []);

  const addApplication = () => {
    axios
      .post("http://localhost:4000/applications", applicationData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Gabim gjatë shtimit të aplikimit.");
      });
  };

  return (
    <div className="flex justify-center items-center w-full h-full flex-col mt-20">
      <TitleAndDescription
        title="Shto Aplikimin"
        titleCustomStyle="text-center"
        descriptionCustomStyle="w-full"
      />
      <form
        onSubmit={addApplication}
        className="w-96  border-primary border rounded-xl p-8"
      >
        <InputLabelAndDesign label="Id">
          <input
            type="text"
            id="id"
            name="id"
            className="w-full outline-none"
            value={applicationData.id}
            onChange={handleInputChange}
          />
        </InputLabelAndDesign>

        <br />
        <InputLabelAndDesign label="Title">
          <input
            type="text"
            id="date"
            name="date"
            className="w-full outline-none"
            value={applicationData.date}
            onChange={handleInputChange}
          />
        </InputLabelAndDesign>
        <br />
        <InputLabelAndDesign label="isActive">
          <input
            type="text"
            id="isActive"
            name="isActive"
            className="w-full outline-none"
            value={applicationData.isActive}
            onChange={handleInputChange}
          />
        </InputLabelAndDesign>
        <br />

        <InputLabelAndDesign label="Applicant id">
          <select
            id="applicantId"
            name="applicantId"
            className="w-full outline-none"
            value={applicationData.applicantId}
            onChange={handleInputChange}
            // onChange={(e) => (movieData.directorId = e)}
          >
            {applicant?.map((applicant) => (
              <option key={applicant.applicantId} value={applicant.applicantId}>
                {applicant.name}
              </option>
            ))}
          </select>
        </InputLabelAndDesign>
        <br />

        <Button
          type="submit"
          label="Shto Aplikantin"
          className="border-4 border-primary text-primary hover:text-white hover:bg-primary hover:border-white/25 mt-4 xl:mt-6"
        />
      </form>
    </div>
  );
}
