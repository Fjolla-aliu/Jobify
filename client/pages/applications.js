import { useState, useEffect } from "react";
import axios from "axios";
import TitleAndDescription from "@/components/TitleAndDescription";
import InputLabelAndDesign from "@/components/InputLabelAndDesign";
import Button from "@/components/Button";

function Applications() {
  const [applications, setApplications] = useState([]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const fetchApplications = () => {
    axios
      .get("http://localhost:4000/applications")
      .then((response) => {
        setApplications(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Gabim gjatë marrjes së aplikimeve:", error);
      });
  };
  const deleteApplications = (id) => {
    axios
      .delete("http://localhost:4000/applications/" + id)
      .then((response) => {})
      .catch((error) => {
        console.error("Gabim gjatë marrjes së aplikimeve:", error);
      });
  };

  return (
    <div className="flex justify-center items-center w-full h-full flex-col mt-20">
      <div className="w-96 border p-8 border-primary">
        <TitleAndDescription
          title="Shfaq te gjitha aplikimet "
          titleCustomStyle="text-center"
          descriptionCustomStyle="w-full"
        />

        <button
          type="submit"
          onClick={() => fetchApplications()}
          className="border-4 border-primary text-primary hover:text-white hover:bg-primary hover:border-white/25 mt-4 xl:mt-6 w-full py-2 text-center font-regular text-16 rounded-full"
        >
          Shfaq Aplikimet
        </button>

        <ul>
          {applications?.map((application) => (
            <li key={application.id}>
              <div className="w-full  flex items-center justify-between">
                {application.date} ({application.isActive})
                <button
                  type="submit"
                  onClick={() => deleteApplications(application._id)}
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

export default Applications;
