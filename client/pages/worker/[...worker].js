import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../components/Layout";
import useStore from "../../stores/defaultStore";
import TitleAndDescription from "../../components/TitleAndDescription";
import InputLabelAndDesign from "../../components/InputLabelAndDesign";
import { v4 as uuidv4 } from "uuid";

export default function Work() {
  const router = useRouter();
  const [work, setWork] = useState([]);
  const workID =
    router.asPath.split("/")[router.asPath.split("/").length - 1] ===
    "[...work]"
      ? undefined
      : router.asPath.split("/")[router.asPath.split("/").length - 1];

 
  const worksListSaved = useStore((state) => state.worksListSaved);
  const user = useStore((state) => state.user);

  const uniqueid = uuidv4();

  const [applyModal, setApplyModal] = useState(false);
  const [applyWork, setApplyWork] = useState();

  useEffect(() => {
    if (workID !== undefined) {
      axios
        .get("http://localhost:4000/works/" + workID)
        .then((response) => {
          setWork(response.data);
          setApplyWork(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [workID]);

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

  if (worksListSaved === undefined) {
    return;
  }

  return (
    <Layout>
      {worksListSaved !== undefined && work !== null && (
        <div className="w-10/12 lg:w-full flex flex-col gap-8 container mx-auto py-20">
          <h2 className="text-[38px] font-bold text-secondary">{work.title}</h2>
          <p className="font-regular text-secondary">{work.technologies}</p>
          <p className="font-regular text-secondary">{work.experience}</p>
          <div className="w-full border-t-2 border-blackOpacity10"></div>
          <div className="w-full flex flex-col gap-4 lg:gap-16 lg:flex-row font-semibold text-secondary">
            <div className="w-auto flex flex-col">
              <p className="text-13 text-tertiary">Worker:</p>
              <p>{work.userName}</p>
            </div>
            <div className="w-auto flex flex-col">
              <p className="text-13 text-tertiary">Degree:</p>
              <p>{work.degree}</p>
            </div>
            <div className="w-auto flex flex-col">
              <p className="text-13 text-tertiary">Category:</p>
              <p>{work.category}</p>
            </div>
            <div className="w-auto flex flex-col">
              <p className="text-13 text-tertiary">Hours:</p>
              <p>{work.hours}</p>
            </div>
            <div className="w-auto flex flex-col">
              <p className="text-13 text-tertiary">Remote:</p>
              <p>{work.remote ? "Yes" : "No"}</p>
            </div>
            {(user.role === "company" || user.role === undefined) && (
              <button
                type="button"
                onClick={() => {
                  user.role === "company"
                    ? setApplyModal(true)
                    : router.push("/login");
                }}
                className="ml-auto px-3 py-1 border-2 rounded-lg font-regular text-buttonHover hover:bg-buttonHover hover:text-white border-buttonHover"
              >
                Apply
              </button>
            )}
            <button
              type="button"
              
              className={`${
                JSON.stringify(worksListSaved).includes(work.id)
                  ? "bg-primary text-white hover:text-primary hover:bg-white"
                  : "bg-white text-primary hover:text-white hover:bg-primary"
              } px-3 py-1 border-2 border-primary rounded-lg font-regular`}
            >
              {JSON.stringify(worksListSaved).includes(work.id)
                ? "Unsave"
                : "Save worker"}
            </button>
          </div>
        </div>
      )}
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
