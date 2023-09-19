import Layout from "../components/Layout";
import TitleAndDescription from "../components/TitleAndDescription";
import axios from "axios";
import { useRouter } from "next/router";
import useStore from "../stores/defaultStore";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyApplies() {
  const user = useStore((state) => state.user);
  const router = useRouter();
  const [applies, setApplies] = useState([]);

  useEffect(() => {
    if (user.role !== "user" && user.role !== "admin") {
      router.push("/login");
    }
  }, [user]);

  useEffect(() => {
    if (user.id === undefined) {
      return;
    }
    axios
      .get("http://localhost:4000/applies/" + user.id)
      .then(function (response) {
        // console.log(response.data);
        // setApplies(
        //   response.data.filter(
        //     (job) => job.job?.untilDate > new Date().toLocaleDateString("sv-SE")
        //   )
        // );
        setApplies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Layout>
      <div className="w-full h-full px-10 xl:px-0 flex flex-col items-center justify-center py-20 gap-20">
        <div className="w-full md:w-3/5 lg:w-3/4 xl:w-1/2 gap-y-8 border border-tertiaryBackground shadow-2xl rounded-xl overflow-hidden bg-white rounded-r-lg rounded-b-lg flex-col py-8 xl:py-12 px-6 xl:px-12">
          <TitleAndDescription title="Applied jobs" titleCustomStyle="pb-8" />
          {applies.length === 0 && (
            <p className="font-regular text-16 text-secondary">
              Please apply at least one job.
            </p>
          )}
          <ul className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4">
            {applies.map((item, index) => (
              <li
                key={index}
                className="w-full p-4 border-2 border-tertiaryBackground rounded-xl flex flex-col"
              >
                <Link href={"/job/" + item.job.id}>
                  <a>
                    <p className="w-full text-center text-21 font-semibold text-secondary">
                      {item.job.title}
                    </p>
                    <p className="w-full text-center text-16 font-regular text-tertiary">
                      {item.job.description}
                    </p>
                    <p className="w-full text-left text-16 font-regular text-secondary mt-2">
                      Category: {item.job.category}
                    </p>
                    <p className="w-full text-left text-16 font-regular text-secondary">
                      Company: {item.job.company}
                    </p>
                    <p className="w-full text-left text-16 font-regular text-secondary">
                      Available until: {item.job.untilDate}
                    </p>
                    <div className="w-full border-t border-tertiaryBackground mt-2 pt-2 flex flex-wrap items-center gap-4 text-16 font-regular text-secondary">
                      <p>{item.job.hours}</p>
                      {item.job.remote && <p>· Remote</p>}
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}