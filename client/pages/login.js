import { useState } from "react";
import { useForm } from "react-hook-form";
import RegisterForm from "../components/RegisterForm";
import SignInForm from "../components/SignInForm";
import TitleAndDescription from "../components/TitleAndDescription";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import useStore from "../stores/defaultStore";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

//SVG-s
import UserAdd from "../public/icons/others/user-add.svg";
import SignInIcon from "../public/icons/arrows/sign-in.svg";

export default function Home() {
  const [activeTab, setActiveTab] = useState("SignIn");
  const [loggedIn, setLoggedIn] = useState();
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);

  //sign in form data-s
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //here it is the object for reference code
  const onSubmitSignInForm = (data) => {
    axios
      .get("http://localhost:8080/user/" + data.email)
      .then((response) => {
        let login = false;
         console.log(response.data);
   
         
          setUser(response.data);
          router.push("/profile");
          login = true;
        
        setLoggedIn(login);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //register form data-s
  const {
    register: registerForm,
    handleSubmit: handleSubmitForm,
    formState: { errors: errorsForm },
  } = useForm();

  const onSubmitRegisterForm = (data) => {
    const uniqueid = uuidv4();
    const addUser =
      data.role === "user"
        ? {
            id: uniqueid,
            email: data.email,
            password: data.password,
            name: data.name,
            gender: data.gender,
            surname: data.surname,
            role: data.role,
            age: data.age,
          }
        : {
            id: uniqueid,
            email: data.email,
            password: data.password,
            name: data.name,
            role: data.role,
          };

    axios
      .post("http://localhost:8080/user", addUser)
      .then(function (response) {
        alert(response.data);
        router.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Layout>
      <div className="w-full h-full bg-green-100 ">
        <div className="relative w-10/12 drop-shadow-2xl xl:w-full container mx-auto py-20 flex flex-col items-center justify-center ">
          <div className="w-full shadow-lg md:w-3/5 lg:w-3/4 xl:w-1/2 flex text-secondary font-bold text-16 ">
            <button
              type="button"
              onClick={() => setActiveTab("Register")}
              className={`${
                activeTab === "Register" ? "bg-white z-10" : "bg-[#e7eceb]"
              } relative px-4 xl:px-6 py-5 border-t border-l border-[#e7eceb] bg-white rounded-t-lg flex gap-3`}
            >
              <div className="absolute left-full bottom-0 h-4 w-4 bg-white pointer-events-none">
                <div className="w-full h-full rounded-bl-full bg-[#e7eceb]"></div>
              </div>
              <UserAdd className="fill-primary w-5 h-6" />
              Register
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("SignIn")}
              className={`${
                activeTab === "SignIn" ? "bg-white z-10" : "bg-[#e7eceb]"
              } relative px-4 xl:px-6 py-5 border-t border-r border-[#e7eceb] bg-white rounded-t-lg flex gap-3`}
            >
              <div className="absolute right-full bottom-0 h-4 w-4 bg-white pointer-events-none">
                <div className="w-full h-full rounded-br-full bg-[#e7eceb]"></div>
              </div>
              <div className="absolute left-full bottom-0 h-4 bg-transparent w-4 pointer-events-none">
                <div className="w-full h-full rounded-bl-full bg-transparent"></div>
              </div>
              <SignInIcon className="fill-primary w-5 h-6" />
              Sign in
            </button>
          </div>
          <div
            className={`${
              activeTab === "SignIn" ? "flex" : "hidden"
            } w-full md:w-3/5 lg:w-3/4 xl:w-1/2 gap-y-8 bg-white rounded-r-lg rounded-b-lg flex-col py-16 xl:py-24 px-10 xl:px-20`}
          >
            <TitleAndDescription
              title="Already registered?"
              description="To manage your job positions sign into your account"
            />
            <SignInForm
              loggedIn={loggedIn}
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              onSubmitSignInForm={onSubmitSignInForm}
            />
          </div>
          <div
            className={`${
              activeTab === "Register" ? "flex" : "hidden"
            } w-full md:w-3/5 lg:w-3/4 xl:w-1/2 gap-y-8 bg-white rounded-r-lg rounded-b-lg flex-col py-8 xl:py-12 px-6 xl:px-12`}
          >
            <TitleAndDescription
              title="Create your account"
              description="In order to manage your current and future job positions, we recommend you register"
            />
            <RegisterForm
              registerForm={registerForm}
              handleSubmitForm={handleSubmitForm}
              errorsForm={errorsForm}
              onSubmitRegisterForm={onSubmitRegisterForm}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
