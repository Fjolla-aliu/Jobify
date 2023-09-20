import Layout from "../components/Layout";
import axios from "axios";
import { useLayoutEffect, useState } from "react";

export default function AboutUs() {
  const [jobStats, setJobStats] = useState([]);
  const [workStats, setWorkStats] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const [appliesStats, setAppliesStats] = useState([]);



  useLayoutEffect(() => {
    axios
      .get("http://localhost:4000/stats/jobs")
      .then((response) => {
        setJobStats(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);



  useLayoutEffect(() => {
    axios
      .get("http://localhost:4000/stats/workers")
      .then((response) => {
        setWorkStats(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

    useLayoutEffect(() => {
    axios
      .get("http://localhost:8080/stats/users")
      .then((response) => {
        setUserStats(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  
  useLayoutEffect(() => {
    axios
      .get("http://localhost:4000/stats/applies")
      .then((response) => {
        setAppliesStats(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);



  return (
    <Layout>
      <div className="w-full container mx-auto px-12 xl:px-0 flex flex-wrap py-20 gap-y-8 xl:gap-y-20">
        <div className="w-full xl:w-1/2 xl:pr-10">
          <h2 className="text-[38px] font-bold text-secondary">Who we are?</h2>
          <p className="text-14 text-tertiary font-regular mt-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <div className="w-full xl:w-1/2 xl:pl-10">
          <h2 className="text-[38px] font-bold text-secondary">What we do?</h2>
          <p className="text-14 text-tertiary font-regular mt-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <div className="w-full flex flex-col items-center xl:pr-10">
          <h2 className="text-[38px] font-bold text-secondary">
            Who created this project?
          </h2>
          <div className="w-full flex flex-col xl:flex-row justify-center items-center">
            <div className="w-10/12 h-auto md:h-96 md:w-96 aspect-square bg-primary rounded-2xl mt-12">
              <img
                src="../images/us.jpg"
                className="w-full h-full object-cover -rotate-12 hover:rotate-0 transform duration-300 rounded-2xl"
              />
            </div>
            <div className="w-auto flex flex-col xl:ml-32 mt-12 text-21 font-semibold text-secondary">
              <p>Name:   Fjolla Aliu   &   Sherifzade Bajrami</p>
              <p>From:   Preshevë</p>
              <p>Students at University for Business and Technology</p>
              <p>Field of Computer Science and Engineering</p>
            </div>
          </div>
        </div>
        {jobStats.length !== 0 &&
          userStats.length !== 0 &&
          appliesStats.length !== 0 &&
          workStats.length !== 0 && (
            <div className="w-full flex flex-col gap-8">
              <h2 className="text-[38px] font-bold text-secondary">
                Statistics
              </h2>
              <p className="statsText font-regular text-18">
                Inside our website are registered{" "}
                <span>{userStats?.companyNumbers} companies</span> and{" "}
                <span>{userStats?.usersNumber} users</span>. <br />
                Our users have made{" "}
                <span>
                  {appliesStats[0]?.appliesNumber} applications
                </span> inside{" "}
                <span>{jobStats[0]?.jobsNumber} jobs positions</span>.<br />
                Our users have made{" "}
                inside{" "}
                <span>{workStats[0]?.workersNumber} workers positions</span>
                .<br />
                Our users are aged approx{" "}
                <span>{userStats[1]?.averageAge} years old</span>.
              </p>
            </div>
          )}
        <div className="w-full flex flex-col gap-8">
          <h2 className="text-[38px] font-bold text-secondary">Charts</h2>
          {jobStats.length !== 0 && userStats.length !== 0 && (
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div className="w-full flex flex-col gap-4">
                <p className="text-21 font-semibold">
                  - Jobs position for every category
                </p>
                {jobStats[1]?.categories.map((item, index) => (
                  <div key={index} className="w-full flex flex-col">
                    <p className="flex font-bold text-secondary items-center capitalize">
                      {Object.keys(item)[0]}
                    </p>
                    <div className="border-2 border-primary">
                      <div
                        style={{
                          width:
                            (Object.values(item)[0] / jobStats[0]?.jobsNumber) *
                              100 +
                            "%",
                        }}
                        className="bg-primary h-8"
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full flex flex-col gap-4">
                <p className="text-21 font-semibold">
                  - Workers position for every category
                </p>
                {workStats[1]?.categories.map((item, index) => (
                  <div key={index} className="w-full flex flex-col">
                    <p className="flex font-bold text-secondary items-center capitalize">
                      {Object.keys(item)[0]}
                    </p>
                    <div className="border-2 border-primary">
                      <div
                        style={{
                          width:
                            (Object.values(item)[0] /
                              workStats[0]?.workersNumber) *
                              100 +
                            "%",
                        }}
                        className="bg-primary h-8"
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full flex flex-col gap-4">
                <p className="text-21 font-semibold">- Users by gender</p>
                {userStats?.gender.map((item, index) => (
                  <div key={index} className="w-full flex flex-col">
                    <p className="flex font-bold text-secondary items-center capitalize">
                      {Object.keys(item)[0]}
                    </p>
                    <div className="border-2 border-primary">
                      <div
                        style={{
                          width:
                            (Object.values(item)[0] /
                              userStats?.usersNumber) *
                              100 +
                            "%",
                        }}
                        className="bg-primary h-8"
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full flex flex-col gap-4">
                <p className="text-21 font-semibold">
                  - Applications by gender
                </p>
                {appliesStats[1]?.gender.map((item, index) => (
                  <div key={index} className="w-full flex flex-col">
                    <p className="flex font-bold text-secondary items-center capitalize">
                      {Object.keys(item)[0]}
                    </p>
                    <div className="border-2 border-primary">
                      <div
                        style={{
                          width:
                            (Object.values(item)[0] /
                              appliesStats[0]?.appliesNumber) *
                              100 +
                            "%",
                        }}
                        className="bg-primary h-8"
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
