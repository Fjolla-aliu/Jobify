import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../components/Layout";
import useStore from "../../stores/defaultStore";
import TitleAndDescription from "../../components/TitleAndDescription";
import InputLabelAndDesign from "../../components/InputLabelAndDesign";
import { v4 as uuidv4 } from "uuid";

export default function Job() {
  const router = useRouter();
  const [job, setJob] = useState([]);
    let jobID = "65078f3746afb6b5e7880260";

 
  const user = useStore((state) => state.user);

  const uniqueid = uuidv4();

  const [applyModal, setApplyModal] = useState(false);
  const [applyJob, setApplyJob] = useState();

  useEffect(() => {
    if (jobID !== undefined) {
      axios
        .get("http://localhost:4000/jobs/" + jobID)
          .then((response) => {
           
          setJob(response.data);
          setApplyJob(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
  }, [jobID]);
    
    
    // console.log(router.query.slug);

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
      { job !== undefined && (
        <div className="w-10/12 lg:w-full flex flex-col gap-8 container mx-auto py-20">
          <h2 className="text-[38px] font-bold text-secondary">{job.title}</h2>
          <p className="font-regular text-secondary">{job.description}</p>
          <div className="w-full border-t-2 border-blackOpacity10"></div>
          <div className="w-full flex flex-col gap-4 lg:gap-16 lg:flex-row font-semibold text-secondary">
            <div className="w-auto flex flex-col">
              <p className="text-13 text-tertiary">Company:</p>
              <p>{job.company}</p>
            </div>
            <div className="w-auto flex flex-col">
              <p className="text-13 text-tertiary">Category:</p>
              <p>{job.category}</p>
            </div>
            <div className="w-auto flex flex-col">
              <p className="text-13 text-tertiary">Hours:</p>
              <p>{job.hours}</p>
            </div>
            <div className="w-auto flex flex-col">
              <p className="text-13 text-tertiary">Remote:</p>
              <p>{job.remote ? "Yes" : "No"}</p>
            </div>
            {(user.role === "user" || user.role === undefined) && (
              <button
                type="button"
                onClick={() => {
                  user.role === "user"
                    ? setApplyModal(true)
                    : router.push("/login");
                }}
                className="ml-auto px-3 py-1 border-2 rounded-lg font-regular text-buttonHover hover:bg-buttonHover hover:text-white border-buttonHover"
              >
                Apply
              </button>
             )} 
          
          </div>
        </div>
      )}
      {applyModal && (
        <div className="absolute w-full h-auto">
          <div className="fixed min-h-screen px-10 xl:px-0 bg-black/80 w-full h-full flex items-center justify-center">
            <div className="w-full md:w-3/5 lg:w-3/4 xl:w-1/2 gap-y-8 border border-tertiaryBackground shadow-2xl rounded-xl overflow-hidden bg-white rounded-r-lg rounded-b-lg flex-col py-8 xl:py-12 px-6 xl:px-12">
              <TitleAndDescription
                title="Apply to this job"
                titleCustomStyle="pb-8"
              />
              <form onSubmit={handleSubmit(onSubmitApplyForm)}>
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
