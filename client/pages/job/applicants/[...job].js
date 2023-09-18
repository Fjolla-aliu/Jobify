import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import useStore from "../../../stores/defaultStore";

export default function Job() {
  const router = useRouter();
  const [job, setJob] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const jobID =
    router.asPath.split("/")[router.asPath.split("/").length - 1] === "[...job]"
      ? undefined
      : router.asPath.split("/")[router.asPath.split("/").length - 1];

  const jobsListSaved = useStore((state) => state.jobsListSaved);

  useEffect(() => {
    if (jobID !== undefined) {
      axios
        .get("http://localhost:4000/jobs/" + jobID)
        .then((response) => {
          setJob(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [jobID]);

  useEffect(() => {
    if (jobID !== undefined) {
      axios
        .get("http://localhost:4000/applies/applicants/" + jobID)
        .then((response) => {
          setApplicants(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [jobID]);

  if (jobsListSaved === undefined) {
    return;
  }
  console.log(applicants);

  return (
    <Layout>
      {jobsListSaved !== undefined && job !== undefined && (
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
          </div>
        </div>
      )}
      <div className="w-10/12 lg:w-full flex flex-col gap-8 container mx-auto pb-20">
        <h2 className="text-[38px] font-bold text-secondary">Applicants</h2>
        <div className="w-full flex flex-col gap-8">
          {applicants.map((applicant, index) => (
            <div
              key={index}
              className="w-full flex flex-wrap gap-y-4 border-2 border-tertiary rounded-xl p-8 font-regular text-secondary"
            >
              <div className="w-full lg:w-1/3">
                <p className="font-semibold text-21">
                  Full name:{" "}
                  <span>
                    {applicant.user.name} {applicant.user.surname}
                  </span>
                </p>
                <p>
                  E-mail: <span>{applicant.user.email}</span>
                </p>
                <p>
                  Age: <span>{applicant.user.age}</span>
                </p>
                <p className="mb-2">
                  Gender: <span>{applicant.user.gender}</span>
                </p>
                {applicant.fileName !== undefined &&
                  applicant.fileName !== "" && (
                    <Link
                      href={
                        "http://localhost:4000/uploads/" + applicant.fileName
                      }
                    >
                      <a
                        target="_blank"
                        className="border-2 border-tertiary hover:text-white hover:bg-tertiary rounded-lg px-4 py-1 font-bold"
                      >
                        View CV
                      </a>
                    </Link>
                  )}
              </div>
              <div className="w-full lg:w-2/3">
                <p className="font-semibold text-21">Important things</p>
                <p>{applicant.importantThings}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
