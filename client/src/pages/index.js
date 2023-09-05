import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputLabelAndDesign from "../components/InputLabelAndDesign";
import Layout from "../components/Layout";
import useStore from "../stores/defaultStore";
import SingleJob from "../components/SingleJob";
import TitleAndDescription from "../components/TitleAndDescription";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [jobsData, setJobsData] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState("all");
  const [searchFilter, setSearchFilter] = useState("");
  const [applyModal, setApplyModal] = useState(false);
  const [applyJob, setApplyJob] = useState();
  const user = useStore((state) => state.user);
  const uniqueid = uuidv4();

  useEffect(() => {
    axios
      .get("http://localhost:4000/jobs/")
      .then((response) => {
        setJobs(
          response.data.filter(
            (e) => e.untilDate > new Date().toLocaleDateString("sv-SE")
          )
        );
        setJobsData(
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
    let data = jobsData;
    if (categoryFilters !== "all") {
      data = data.filter((e) => e.category === categoryFilters);
    }
    if (categoryFilters === "all") {
      data = jobsData;
    }
    if (searchFilter.length > 2) {
      data = data.filter((e) =>
        JSON.stringify(e).toLowerCase().includes(searchFilter.toLowerCase())
      );
    }
    setJobs(data);
  }, [searchFilter, categoryFilters]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitApplyForm = (data) => {
    const applyJobData = {
      id: uniqueid,
      fileName: data.picture[0] !== undefined ? data.picture[0].name : "",
      importantThings: data.importantThings,
      user: {
        name: user.name,
        surname: user.surname,
        email: user.email,
        id: user.id,
        age: user.age,
        gender: user.gender,
      },
      job: {
        ...applyJob,
      },
    };
    setApplyModal(false);
    setApplyJob();
    const formData = new FormData();
    formData.append("picture", data.picture[0]);
    formData.append("datas", applyJobData);
    axios
      .post("http://localhost:4000/applies/file", formData, {
        headers: {
          Accept: "*",
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log("Success!", response);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .post("http://localhost:4000/applies/", applyJobData)
      .then(function (response) {
        console.log("Success!", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Layout>
      <div className="w-full container mx-auto px-12 xl:px-0 flex flex-col gap-8 py-20">
        <h2 className="text-[38px] font-bold text-secondary">Featured Jobs</h2>
        <div className="w-full flex flex-wrap gap-8 justify-between items-center">
          <input
            onChange={(e) => setSearchFilter(e.target.value)}
            type="search"
            placeholder="Search jobs..."
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
        {jobs.length === 0 && (
          <p className="font-regular text-16 text-secondary">
            No jobs were posted until now.
          </p>
        )}
        <ul className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {jobs.map((item, index) => (
            <SingleJob
              item={item}
              setApplyModal={setApplyModal}
              setApplyJob={setApplyJob}
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
                title="Apply to this job"
                titleCustomStyle="pb-8"
              />
              <form
                encType="multipart/form-data"
                onSubmit={handleSubmit(onSubmitApplyForm)}
                // action="http://localhost:4000/applies/"
                method="post"
              >
                <InputLabelAndDesign label="Upload your CV">
                  <input
                    type="file"
                    name="picture"
                    className=" w-full outline-none"
                    {...register("picture")}
                  />
                </InputLabelAndDesign>
                <InputLabelAndDesign label="Something important for company">
                  <input
                    type="text"
                    placeholder="Description"
                    className="w-full outline-none"
                    name="importantThings"
                    {...register("importantThings")}
                  />
                </InputLabelAndDesign>
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
                      setApplyJob();
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
