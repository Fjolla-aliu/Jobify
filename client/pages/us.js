import Layout from "../components/Layout";
import EditUserForm from "../components/EditUserForm";
import AddJobForm from "../components/AddJobForm";
import EditJobForm from "../components/EditJobForm";
import TitleAndDescription from "../components/TitleAndDescription";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import useStore from "../stores/defaultStore";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Us() {
  const user = useStore((state) => state.user);
  const router = useRouter();
  const uniqueid = uuidv4();
  const [deleteJob, setDeleteJob] = useState();
  const [editJob, setEditJob] = useState();
  const [editModal, setEditModal] = useState(false);
  const [sureModal, setSureModal] = useState(false);
  const [deleteJobSecure, setDeleteJobSecure] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (user.role !== "company" && user.role !== "admin") {
      router.push("/login");
    }
  }, [user]);

  useEffect(() => {
    if (deleteJob !== undefined && deleteJob !== "" && deleteJobSecure) {
      axios
        .delete("http://localhost:4000/jobs/" + deleteJob)
        .then(function (response) {
          router.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
      setDeleteJob();
    }
  }, [deleteJob, deleteJobSecure]);

  useEffect(() => {
    if (user.id === undefined) {
      return;
    }
    axios
      .get("http://localhost:4000/jobs/my/" + user.id)
      .then(function (response) {
        setJobs(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  //register form data-s
  const {
    register: registerJobForm,
    handleSubmit: handleSubmitJobForm,
    formState: { errors: errorsJobForm },
  } = useForm();

  //register form data-s
  const {
    register: registerEditJobForm,
    handleSubmit: handleSubmitEditJobForm,
    formState: { errors: errorsEditJobForm },
  } = useForm();

  const onSubmitRegisterJobForm = (data) => {
    const aJob = {
      id: uniqueid,
      title: data.jobTitle,
      description: data.jobDescription,
      company: user.name,
      hours: data.hours,
      remote: data.remote,
      untilDate: data.untilDate,
      category: data.category,
      user: user.id,
    };

    axios
      .post("http://localhost:4000/jobs/", aJob)
      .then(function () {
        router.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onSubmitEditJobForm = (data) => {
    const aJob = {
      id: editJob.id,
      title: data.jobTitle,
      description: data.jobDescription,
      company: user.name,
      hours: data.hours,
      remote: data.remote,
      untilDate: data.untilDate,
      category: data.category,
      user: user.id,
    };

    axios
      .put("http://localhost:4000/jobs/" + editJob.id, aJob)
      .then(function () {
        router.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Layout>
      <div className="w-full h-full px-10 xl:px-0 flex flex-col items-center justify-center py-20 gap-20">
        <div className="w-full md:w-3/5 lg:w-3/4 xl:w-1/2 gap-y-8 border border-tertiaryBackground shadow-2xl rounded-xl overflow-hidden bg-slate-300 rounded-r-lg rounded-b-lg flex-col py-8 xl:py-12 px-6 xl:px-12">
          <TitleAndDescription title="Posted jobs" titleCustomStyle="pb-8" />
          {jobs.length === 0 && (
            <p className="font-regular text-16 text-secondary">
              No jobs were posted from you until now.
            </p>
          )}
          <ul className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4">
            {jobs.map((item, index) => (
              <li
                key={index}
                className="w-full p-4 border-2 border-tertiaryBackground rounded-xl flex flex-col"
              >
                <Link href={"/job/applicants/" + item.id}>
                  <a>
                    <p className="w-full text-center text-21 font-semibold text-secondary">
                      {item.title}
                    </p>
                    <p className="w-full text-center text-16 font-regular text-tertiary">
                      {item.description}
                    </p>
                    <p className="w-full text-left text-16 font-regular text-secondary mt-2">
                      Category: {item.category}
                    </p>
                    <p className="w-full text-left text-16 font-regular text-secondary">
                      Company: {item.company}
                    </p>
                    <p className="w-full text-left text-16 font-regular text-secondary">
                      Available until: {item.untilDate}
                    </p>
                  </a>
                </Link>
                <div className="w-full border-t border-tertiaryBackground mt-2 pt-2 flex flex-wrap items-center gap-4 text-16 font-regular text-secondary">
                  <p>{item.hours}</p>
                  {item.remote && <p>· Remote</p>}
                  <button
                    type="button"
                    onClick={() => {
                      setEditJob(item);
                      setEditModal(true);
                    }}
                    className="ml-auto px-3 py-1 bg-buttonHover rounded-lg text-white font-regular"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDeleteJob(item.id);
                      setSureModal(true);
                    }}
                    className="px-3 py-1 bg-danger rounded-lg text-white font-regular"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-3/5 lg:w-3/4 xl:w-1/2 gap-y-8 border border-tertiaryBackground shadow-2xl rounded-xl overflow-hidden bg-white rounded-r-lg rounded-b-lg flex-col py-8 xl:py-12 px-6 xl:px-12">
          <TitleAndDescription
            title="Add new job position"
            titleCustomStyle="pb-8"
          />
          <AddJobForm
            companyName={user.name}
            registerForm={registerJobForm}
            handleSubmitForm={handleSubmitJobForm}
            errorsForm={errorsJobForm}
            onSubmitRegisterForm={onSubmitRegisterJobForm}
          />
        </div>
      </div>
      {sureModal && (
        <div className="absolute w-full h-screen ">
          <div className="fixed w-full h-full flex items-center justify-center bg-black/80">
            <div className="w-10/12 xl:w-1/3 flex flex-col p-6 xl:p-10 rounded-2xl bg-white shadow-xl">
              <TitleAndDescription
                title="Are you sure you want to delete this job?"
                titleCustomStyle="pb-8"
              />
              <div className="w-full flex gap-8 text-16 font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setSureModal(false);
                    setDeleteJobSecure(true);
                  }}
                  className="py-2 px-4 rounded-lg bg-danger text-white"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSureModal(false);
                    setDeleteJob();
                  }}
                  className="py-2 px-4 border-2 border-primary rounded-lg text-primary hover:bg-primary hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {editModal && (
        <div className="fixed w-full h-full bg-black/80 py-20 overflow-x-auto">
          <div className="">
            <div className="relative px-10 xl:px-0 w-full h-full flex items-center justify-center">
              <div className="w-full md:w-3/5 lg:w-3/4 xl:w-1/2 gap-y-8 border border-tertiaryBackground shadow-2xl rounded-xl overflow-hidden bg-white rounded-r-lg rounded-b-lg flex-col py-8 xl:py-12 px-6 xl:px-12">
                <TitleAndDescription
                  title="Edit job position"
                  titleCustomStyle="pb-8"
                />
                <EditJobForm
                  registerForm={registerEditJobForm}
                  handleSubmitForm={handleSubmitEditJobForm}
                  errorsForm={errorsEditJobForm}
                  onSubmitRegisterForm={onSubmitEditJobForm}
                  item={editJob}
                />
                <button
                  type="button"
                  onClick={() => {
                    setEditModal(false);
                    setEditJob();
                  }}
                  className="py-2 px-4 mt-4 border-2 border-danger rounded-lg text-danger hover:bg-danger hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
