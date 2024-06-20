import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@/components/Button";
import TitleAndDescription from "@/components/TitleAndDescription";
import InputLabelAndDesign from "@/components/InputLabelAndDesign";

export default function AddSensor() {
  const [sensorData, setSensorData] = useState({
    id: "",
    name: "",
    value: "",
    deviceId: "",
  });
  const [device, setDevices] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSensorData({
      ...sensorData,
      [name]: value,
    });
  };

  useEffect(() => {
    function fetch() {
      axios
        .get("http://localhost:4000/devices")
        .then((response) => {
          setDevices(response.data);
        })
        .catch((error) => {
          console.error("Gabim gjatë shtimit të sensors.");
        });
    }
    fetch();
  }, []);

  const AddSensor = () => {
    axios
      .post("http://localhost:4000/sensors", sensorData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Gabim gjatë shtimit të sensoreve.");
      });
  };

  return (
    <Layout>
      <div className="flex justify-center items-center w-full h-full flex-col mt-20">
        <TitleAndDescription
          title="Shto Senzorin"
          titleCustomStyle="text-center"
          descriptionCustomStyle="w-full"
        />
        <form
          onSubmit={AddSensor}
          className="w-96  border-primary border rounded-xl p-8"
        >
          <InputLabelAndDesign label="Id">
            <input
              type="text"
              id="id"
              name="id"
              className="w-full outline-none"
              value={sensorData.id}
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
              value={sensorData.name}
              onChange={handleInputChange}
            />
          </InputLabelAndDesign>
          <br />

          <br />
          <br />
          <InputLabelAndDesign label="Value">
            <input
              type="text"
              id="value"
              name="value"
              className="w-full outline-none"
              value={sensorData.value}
              onChange={handleInputChange}
            />
          </InputLabelAndDesign>
          <br />
          <br />

          <br />

          <InputLabelAndDesign label="Device id">
            <select
              id="device"
              name="device"
              className="w-full outline-none"
              defaultValue={sensorData.deviceId}
              onChange={handleInputChange}
            >
              {device?.map((device) => (
                <option key={device.deviceId} value={device.name}>
                  {device.name}
                </option>
              ))}
            </select>
          </InputLabelAndDesign>
          <br />

          <Button
            type="submit"
            label="Shto Senzorin"
            className="border-4 border-primary text-primary hover:text-white hover:bg-primary hover:border-white/25 mt-4 xl:mt-6"
          />
        </form>
      </div>
    </Layout>
  );
}
