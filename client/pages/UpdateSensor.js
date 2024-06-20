import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TitleAndDescription from "@/components/TitleAndDescription";
import InputLabelAndDesign from "@/components/InputLabelAndDesign";
import Button from "@/components/Button";
import { useRouter } from "next/router";

function UpdateSensor() {
  const [sensor, setSensorId] = useState("");
  const [name, setSensorName] = useState("");
  const [value, setSensorValue] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const handleSensorIdChange = (e) => {
    setSensorId(e.target.value);
  };
  const handleSensorNameChange = (e) => {
    setSensorName(e.target.value);
  };

  const handleSensorValueChange = (e) => {
    setSensorValue(e.target.value);
  };
  useEffect(() => {
    axios

      .get("http://localhost:4000/sensors/" + id)
      .then((response) => {
        const data = response.data;
        setSensorName(data.name);
        setSensorValue(data.value);
      })
      .catch((error) => {
        console.error("Gabim gjatë marrjes së senzoreve:", error);
      });
  }, [id]);

  const UpdateSensor = () => {
    setMessage("");
    setError("");

    axios
      .put("http://localhost:4000/sensors/" + id, {
        name: name,
        value: value,
      })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        setError("Gabim gjatë përditësimit të senzoreve.");
      });
  };

  return (
    <Layout>
      <div className="flex justify-center items-center w-full h-full flex-col mt-20">
        <div className="w-96 border p-8 border-primary">
          <TitleAndDescription
            title="Perditeso sensor"
            titleCustomStyle="text-center"
            descriptionCustomStyle="w-full"
          />
          <InputLabelAndDesign label="Id e senzorit:">
            <input
              type="text"
              id="sensorId"
              className="w-full outline-none"
              name="sensorId"
              disabled
              defaultValue={id}
              onChange={handleSensorIdChange}
            />
          </InputLabelAndDesign>

          <InputLabelAndDesign label="Emri i senzor:">
            <input
              type="text"
              id="sensorName"
              className="w-full outline-none"
              name="sensorName"
              defaultValue={name}
              onChange={handleSensorNameChange}
            />
          </InputLabelAndDesign>
          <br />
          <InputLabelAndDesign label="Value">
            <input
              type="text"
              id="value"
              name="value"
              className="w-full outline-none"
              defaultValue={value}
              onChange={handleSensorValueChange}
            />
          </InputLabelAndDesign>
          <br />

          <button
            type="submit"
            onClick={() => UpdateSensor()}
            className="border-4 border-primary text-primary hover:text-white hover:bg-primary hover:border-white/25 mt-4 xl:mt-6 w-full py-2 text-center font-regular text-16 rounded-full"
          >
            Perditeso Sensorin
          </button>
          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </Layout>
  );
}

export default UpdateSensor;
