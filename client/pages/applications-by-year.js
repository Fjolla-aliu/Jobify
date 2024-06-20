// pages/movies-by-year.js
import { useState, useEffect } from "react";
import axios from "axios";
import TitleAndDescription from "@/components/TitleAndDescription";
import InputLabelAndDesign from "@/components/InputLabelAndDesign";
import Button from "@/components/Button";

function ApplicationsByDate() {
  const [date, setDate] = useState("");
  const [applications, setApplications] = useState([]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const fetchApplicationsByDate = () => {
    //Get the current date and set the time to midnight
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = dd + "-" + mm + "-" + yyyy;
    axios
      .get(
        "http://localhost:4000/applications/today/" +
          (date ? date : formattedToday)
      )
      .then((response) => {
        setApplications(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Gabim gjatë marrjes së aplikimeve:", error);
      });
  };

  return (
    <div className="flex justify-center items-center w-full h-full flex-col mt-20">
      <div className="w-96 border p-8 border-primary">
        <TitleAndDescription
          title="Shfaq aplikimet e nje date te caktuar"
          titleCustomStyle="text-center"
          descriptionCustomStyle="w-full"
        />
        <InputLabelAndDesign label="Zgjedh daten:">
          <input
            type="text"
            id="date"
            name="date"
            value={date}
            onChange={handleDateChange}
          />
        </InputLabelAndDesign>

        <button
          type="submit"
          onClick={() => fetchApplicationsByDate()}
          className="border-4 border-primary text-primary hover:text-white hover:bg-primary hover:border-white/25 mt-4 xl:mt-6 w-full py-2 text-center font-regular text-16 rounded-full"
        >
          Shfaq Aplikimet
        </button>

        <ul>
          {applications.applications?.map((application) => (
            <li key={application.id}>
              {application.date} ({application.isActive})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ApplicationsByDate;
