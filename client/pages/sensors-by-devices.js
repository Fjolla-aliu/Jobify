import React, { useState } from "react";
import axios from "axios";
import TitleAndDescription from "@/components/TitleAndDescription";
import InputLabelAndDesign from "@/components/InputLabelAndDesign";
import Button from "@/components/Button";

function SensorsByDevices() {
  const [deviceName, setDeviceName] = useState("");
  const [sensors, setSensors] = useState([]);
  const [error, setError] = useState("");

  const handleDeviceNameChange = (e) => {
    setDeviceName(e.target.value);
  };

  const fetchSensorsByDevices = () => {
    setError("");
    axios
      .get("http://localhost:4000/sensors/filter-by-name/" + deviceName)

      .then((response) => {
        setSensors(response.data);
      })
      .catch((error) => {
        setError("Gabim gjatë marrjes së senzoreve.");
      });
  };

  return (
    <div className="flex justify-center items-center w-full h-full flex-col mt-20">
      <div className="w-96 border p-8 border-primary">
        <TitleAndDescription
          title="Shfaq senzoret e një device"
          titleCustomStyle="text-center"
          descriptionCustomStyle="w-full"
        />
        <InputLabelAndDesign label="Emri i Device:">
          <input
            type="text"
            id="deviceName"
            className="w-full outline-none"
            name="deviceName"
            value={deviceName}
            onChange={handleDeviceNameChange}
          />
        </InputLabelAndDesign>

        <button
          type="submit"
          onClick={() => fetchSensorsByDevices()}
          className="border-4 border-primary text-primary hover:text-white hover:bg-primary hover:border-white/25 mt-4 xl:mt-6 w-full py-2 text-center font-regular text-16 rounded-full"
        >
          Shfaq Senzoret
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {sensors.map((sensor) => (
            <li key={sensor.id}>
              {sensor.name}-{sensor.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SensorsByDevices;
