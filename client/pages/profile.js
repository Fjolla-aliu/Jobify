import Layout from "../components/Layout";
// import EditUserForm from "../components/EditUserForm";
import TitleAndDescription from "../components/TitleAndDescription";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import useStore from "../stores/defaultStore";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

export default function Profile() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const router = useRouter();
  const uniqueid = uuidv4();

  useEffect(() => {
    if (user.role !== "user" && user.role !== "company") {
      if (user.role !== "admin") {
        router.push("/login");
      }
    }
  }, [user]);

  //register form data-s
  const {
    register: registerForm,
    handleSubmit: handleSubmitForm,
    formState: { errors: errorsForm },
  } = useForm();

  const onSubmitRegisterForm = (data) => {
    const editUser =
      user.role === "user"
        ? {
            id: uniqueid,
            email: data.email,
            password: data.password,
            name: data.name,
            gender: data.gender,
            surname: data.surname,
            role: user.role,
            age: user.age,
          }
        : {
            id: uniqueid,
            email: data.email,
            password: data.password,
            name: data.name,
            role: user.role,
          };
    axios
      .put("http://localhost:4000/users/" + user.id, editUser)
      .then(function (response) {
        setUser(response.data);
        alert("Changes saved successfully.");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Layout>
      <div className="w-full h-full px-10 xl:px-0 flex flex-col items-center justify-center py-20 gap-20">
        <div className="w-full md:w-3/5 lg:w-3/4 xl:w-1/2 gap-y-8 border border-tertiaryBackground shadow-2xl rounded-xl overflow-hidden bg-white rounded-r-lg rounded-b-lg flex-col py-8 xl:py-12 px-6 xl:px-12">
          <TitleAndDescription title="Edit profile" titleCustomStyle="pb-8" />
          {/* <EditUserForm
            user={user}
            registerForm={registerForm}
            handleSubmitForm={handleSubmitForm}
            errorsForm={errorsForm}
            onSubmitRegisterForm={onSubmitRegisterForm}
          /> */}
        </div>
      </div>
    </Layout>
  );
}
