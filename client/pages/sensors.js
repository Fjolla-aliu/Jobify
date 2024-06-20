import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import TitleAndDescription from "@/components/TitleAndDescription";
import InputLabelAndDesign from "@/components/InputLabelAndDesign";
import Button from "@/components/Button";

function Sensors() {
  const [sensors, setSensors] = useState([]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const fetchSensors = () => {
    axios
      .get("http://localhost:4000/sensors")
      .then((response) => {
        setSensors(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error("Gabim gjatë marrjes së senzoreve:", error);
      });
  };
  const fetchDevices = () => {
    axios
      .get("http://localhost:4000/devices")
      .then((response) => {
        setDevices(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Gabim gjatë marrjes së devices:", error);
      });
  };

  const deleteSensors = (id) => {
    axios
      .delete("http://localhost:4000/sensors/" + id)
      .then((response) => {})
      .catch((error) => {
        console.error("Gabim gjatë marrjes së senzoreve:", error);
      });
  };

  function UpdateSensor() {
    const [id, setSensorId] = useState("");
    const [name, setSensorName] = useState("");
    const [value, setSensorValue] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // const handleEmployeeBirthYearChange = (e) => {
    //   setEmployeeBirthYear(e.target.value);
    // };

    const updateSensor = () => {
      setMessage("");
      setError("");
    };
  }
  console.log(sensors);
  return (
    <Layout>
      <div className="flex justify-center items-center w-full h-full flex-col mt-20">
        <div className="w-96 border p-8 border-primary">
          <TitleAndDescription
            title="Shfaq te gjithe senzoret "
            titleCustomStyle="text-center"
            descriptionCustomStyle="w-full"
          />

          <button
            type="submit"
            onClick={() => fetchSensors()}
            className="border-4 border-primary text-primary hover:text-white hover:bg-primary hover:border-white/25 mt-4 xl:mt-6 w-full py-2 text-center font-regular text-16 rounded-full"
          >
            Shfaq senzoret
          </button>

          <ul>
            {sensors?.map((sensor) => (
              <li key={sensor.id}>
                <div className="w-full  flex items-center justify-between">
                  {sensor.name} {sensor.value}
                  {sensor.deviceId}
                  <a
                    type="button"
                    href={"UpdateSensor?id=" + sensor._id}
                    className="border-4 border-primary text-primary hover:text-white hover:bg-primary hover:border-white/25 mt-4 xl:mt-6 w-20 py-2 text-center font-regular text-16 rounded-full"
                  >
                    Edit
                  </a>
                  <button
                    type="button"
                    onClick={() => deleteSensors(sensor._id)}
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

export default Sensors;
