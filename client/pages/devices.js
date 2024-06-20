import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import TitleAndDescription from "@/components/TitleAndDescription";
import InputLabelAndDesign from "@/components/InputLabelAndDesign";
import Button from "@/components/Button";

function Devices() {
  const [devices, setDevices] = useState([]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const fetchDevices = () => {
    axios
      .get("http://localhost:4000/devices")
      .then((response) => {
        setDevices(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Gabim gjatë marrjes së pajisjeve:", error);
      });
  };
  const deleteDevices = (deviceId) => {
    axios
      .delete("http://localhost:4000/devices/" + deviceId)
      .then((response) => {})
      .catch((error) => {
        console.error("Gabim gjatë fshirjes së devices:", error);
      });
  };

  return (
    <Layout>
      <div className="flex justify-center items-center w-full h-full flex-col mt-20">
        <div className="w-96 border p-8 border-primary">
          <TitleAndDescription
            title="Shfaq te gjithe devices "
            titleCustomStyle="text-center"
            descriptionCustomStyle="w-full"
          />

          <button
            type="submit"
            onClick={() => fetchDevices()}
            className="border-4 border-primary text-primary hover:text-white hover:bg-primary hover:border-white/25 mt-4 xl:mt-6 w-full py-2 text-center font-regular text-16 rounded-full"
          >
            Shfaq pajisjet
          </button>

          <ul>
            {devices?.map((device) => (
              <li key={device.deviceId}>
                <div className="w-full  flex items-center justify-between">
                  {device.name} ({device.location})
                  <button
                    type="submit"
                    onClick={() => deleteDevices(device._id)}
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

export default Devices;
