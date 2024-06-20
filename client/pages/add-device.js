import Layout from "../components/Layout";
import { useState } from "react";
import axios from "axios";
import InputLabelAndDesign from "@/components/InputLabelAndDesign";
import Button from "@/components/Button";
import TitleAndDescription from "@/components/TitleAndDescription";

export default function AddDevice() {
  const [deviceData, setDeviceData] = useState({
    deviceId: "",
    name: "",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeviceData({
      ...deviceData,
      [name]: value,
    });
  };

  const addDevice = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/devices", deviceData)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Gabim gjatë shtimit të devices.");
      });
  };

  return (
    <Layout>
      <div className="flex justify-center items-center w-full h-full flex-col mt-20">
        <TitleAndDescription
          title="Shto Pajisjen"
          titleCustomStyle="text-center"
          descriptionCustomStyle="w-full"
        />
        <form
          onSubmit={addDevice}
          className="w-96  border-primary border rounded-xl p-8"
        >
          <InputLabelAndDesign label="deviceId">
            <input
              type="text"
              id="deviceId"
              name="deviceId"
              className="w-full outline-none"
              value={deviceData.deviceId}
              onChange={handleInputChange}
            />
          </InputLabelAndDesign>
          <br />

          <InputLabelAndDesign label="Name">
            <input
              type="text"
              id="name"
              name="name"
              //   surname="surname"
              className="w-full outline-none"
              defaultValue={deviceData.name}
              onChange={handleInputChange}
            />
          </InputLabelAndDesign>
          <br />

          <InputLabelAndDesign label="Location">
            <input
              type="text"
              id="location"
              name="location"
              //   surname="surname"
              className="w-full outline-none"
              defaultValue={deviceData.location}
              onChange={handleInputChange}
            />
          </InputLabelAndDesign>
          <br />

          <Button
            type="submit"
            label="Shto Device"
            className="border-4 border-primary text-primary hover:text-white hover:bg-primary hover:border-white/25 mt-4 xl:mt-6"
          />
        </form>
      </div>
    </Layout>
  );
}
