import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputLabelAndDesign from "../components/InputLabelAndDesign";
import Layout from "../components/Layout";
import useStore from "../stores/defaultStore";
import SingleWorker from "../components/SingleWorker";
import TitleAndDescription from "../components/TitleAndDescription";
import { v4 as uuidv4 } from "uuid";

export default function ClientList() {
  const [workers, setWorkers] = useState([]);
  const [workersData, setWorkersData] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState("all");
  const [searchFilter, setSearchFilter] = useState("");
  const [applyModal, setApplyModal] = useState(false);
  const [applyWork, setApplyWork] = useState();
  const user = useStore((state) => state.user);
  const uniqueid = uuidv4();

  useEffect(() => {
    axios
      .get("http://localhost:4000/works/")
      .then((response) => {
        // console.log(response);
        setWorkers(
          response.data.filter(
            (e) => e.untilDate > new Date().toLocaleDateString("sv-SE")
          )
        );
        setWorkersData(
          response.data.filter(
            (e) => e.untilDate > new Date().toLocaleDateString("sv-SE")
          )
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let data = workersData;
    if (categoryFilters !== "all") {
      data = data.filter((e) => e.category === categoryFilters);
    }
    if (categoryFilters === "all") {
      data = workersData;
    }
    if (searchFilter.length > 2) {
      data = data.filter((e) =>
        JSON.stringify(e).toLowerCase().includes(searchFilter.toLowerCase())
      );
    }
    setWorkers(data);
  }, [searchFilter, categoryFilters]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitApplyForm = (data) => {
    const applyInterviewData = {
      id: uniqueid,
      importantThings: data.importantThings,
      interviewDate: data.date,
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
      },
      worker: {
        ...applyWork,
      },
    };
    setApplyModal(false);
    setApplyWork();
    axios
      .post("http://localhost:4000/interviews/", applyInterviewData)
      .then(function (response) {
        console.log("Success!", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Layout>
      <div className="w-full container mx-auto px-12 xl:px-0 flex flex-col gap-8 py-20 bg-slate-300">
        <h2 className="text-[38px] font-bold text-secondary">
          Featured Workers
        </h2>
        <div className="w-full flex flex-wrap gap-8 justify-between items-center">
          <input
            onChange={(e) => setSearchFilter(e.target.value)}
            type="search"
            placeholder="Search employee..."
            className="w-full xl:w-1/2 px-4 py-2 outline-none border rounded-lg border-tertiaryBackground text-16 text-secondary font-regular"
          />
          <div className="w-full xl:w-1/4 flex gap-2 items-center text-16 text-secondary font-regular">
            <p>Category</p>
            <select
              onChange={(e) => setCategoryFilters(e.target.value)}
              className="border border-tertiaryBackground rounded-lg py-1 px-2 outline-none"
            >
              <option value="all">All</option>
              <option value="programming">Programming</option>
              <option value="science">Science</option>
              <option value="economy">Economy</option>
            </select>
          </div>
        </div>
        {workers.length === 0 && (
          <p className="font-regular text-16 text-secondary">
            No one is looking for job now.
          </p>
        )}
        <ul className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {workers.map((item, index) => (
            <SingleWorker
              item={item}
              setApplyModal={setApplyModal}
              setApplyWork={setApplyWork}
              key={index}
            />
          ))}
        </ul>
      </div>
      {applyModal && (
        <div className="absolute w-full h-auto">
          <div className="fixed min-h-screen px-10 xl:px-0 bg-black/80 w-full h-full flex items-center justify-center">
            <div className="w-full md:w-3/5 lg:w-3/4 xl:w-1/2 gap-y-8 border border-tertiaryBackground shadow-2xl rounded-xl overflow-hidden bg-white rounded-r-lg rounded-b-lg flex-col py-8 xl:py-12 px-6 xl:px-12">
              <TitleAndDescription
                title="Send interview application"
                titleCustomStyle="pb-8"
              />
              <form
                encType="multipart/form-data"
                onSubmit={handleSubmit(onSubmitApplyForm)}
                method="post"
              >
                <InputLabelAndDesign label="Date and time">
                  <input
                    type="datetime-local"
                    name="date"
                    className=" w-full outline-none"
                    {...register("date", { required: true })}
                  />
                </InputLabelAndDesign>
                {errors.date && (
                  <p className="font-bold pb-4 text-red-700">
                    Date is required.
                  </p>
                )}
                <InputLabelAndDesign label="Something important for company and interview">
                  <input
                    type="text"
                    placeholder="Description"
                    className="w-full outline-none"
                    name="importantThings"
                    {...register("importantThings", { required: true })}
                  />
                </InputLabelAndDesign>
                {errors.date && (
                  <p className="font-bold pb-4 text-red-700">
                    Explain some things about company.
                  </p>
                )}
                <div className="w-full flex gap-8">
                  <button
                    type="submit"
                    className="w-full py-2 text-center font-regular text-16 rounded-full border-4 border-primary text-primary hover:text-white hover:bg-primary hover:border-white/25 mt-4 xl:mt-6"
                  >
                    Apply
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setApplyModal(false);
                      setApplyWork();
                    }}
                    className="py-2 px-4 mt-4 xl:mt-6 border-4 border-danger rounded-full text-danger hover:bg-danger hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
