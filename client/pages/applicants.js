import { useState, useEffect } from "react";
import axios from "axios";
import TitleAndDescription from "@/components/TitleAndDescription";
import InputLabelAndDesign from "@/components/InputLabelAndDesign";
import Button from "@/components/Button";

function Applicants() {
  const [applicants, setApplicants] = useState([]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const fetchApplicants = () => {
    axios
      .get("http://localhost:4000/applicants")
      .then((response) => {
        setApplicants(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Gabim gjatë marrjes së aplikimeve:", error);
      });
  };
  const deleteApplicants = (applicantId) => {
    axios
      .delete("http://localhost:4000/applicants/" + applicantId)
      .then((response) => {})
      .catch((error) => {
        console.error("Gabim gjatë fshirjes së aplikimeve:", error);
      });
  };

  return (
    <div className="flex justify-center items-center w-full h-full flex-col mt-20">
      <div className="w-96 border p-8 border-primary">
        <TitleAndDescription
          title="Shfaq te gjithe aplikantet "
          titleCustomStyle="text-center"
          descriptionCustomStyle="w-full"
        />

        <button
          type="submit"
          onClick={() => fetchApplicants()}
          className="border-4 border-primary text-primary hover:text-white hover:bg-primary hover:border-white/25 mt-4 xl:mt-6 w-full py-2 text-center font-regular text-16 rounded-full"
        >
          Shfaq Aplikantet
        </button>

        <ul>
          {applicants?.map((applicant) => (
            <li key={applicant.applicantId}>
              <div className="w-full  flex items-center justify-between">
                {applicant.name} ({applicant.isDeleted ? "Deleted" : "Active"})
                <button
                  type="submit"
                  onClick={() => deleteApplicants(applicant._id)}
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
  );
}

export default Applicants;
