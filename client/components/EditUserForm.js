import Button from "../components/Button";
import InputLabelAndDesign from "../components/InputLabelAndDesign";

//SVG-s
import Safe from "../public/icons/others/safe.svg";
import Mail from "../public/icons/others/mail.svg";
import User from "../public/icons/others/user.svg";
import Heart from "../public/icons/shapes/heart.svg";
import Star from "../public/icons/shapes/star.svg";

const EditUserForm = ({
  registerForm,
  handleSubmitForm,
  errorsForm,
  onSubmitRegisterForm,
  user,
}) => {
  if (user === undefined || user === []) {
    return (
      <div className="w-full flex flex-col gap-4 h-full py-32 items-center justify-center">
        <div className="w-24 h-24 border-t-4 rounded-full border-primary animate-spin"></div>
        <p className="text-16 text-secondary font-regular">Loading...</p>
      </div>
    );
  }
  console.log(user);
  return (
    <form
      onSubmit={handleSubmitForm(onSubmitRegisterForm)}
      className="flex flex-col gap-4"
    >
      {user.role === "user" && (
        <div className="relative w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputLabelAndDesign
            label="First name"
            icon={<User className="fill-primary w-4 h-4" />}
          >
            <input
              type="text"
              placeholder="Your name"
              defaultValue={user.name}
              className="w-full outline-none"
              {...registerForm("name", {
                required: true,
                pattern: /^[a-zA-Z]+$/,
              })}
            />
          </InputLabelAndDesign>
          <InputLabelAndDesign
            label="Last name"
            icon={<User className="fill-primary w-4 h-4" />}
          >
            <input
              type="text"
              placeholder="Your last name"
              defaultValue={user.surname}
              className="w-full outline-none"
              {...registerForm("surname", {
                required: true,
                pattern: /^[a-zA-Z]+$/,
              })}
            />
          </InputLabelAndDesign>
          {errorsForm.name && (
            <p className="absolute top-full left-0 pt-1 xl:pt-2 font-semibold text-16 text-danger">
              {errorsForm.name.type === "required"
                ? "First name field is required."
                : errorsForm.name.type === "pattern"
                ? "Your first name is not valid!"
                : "Something is wrong with your first name."}
            </p>
          )}
          {errorsForm.surname && !errorsForm.name && (
            <p className="absolute top-full pt-1 xl:pt-2 left-0 font-semibold text-16 text-danger">
              {errorsForm.surname.type === "required"
                ? "Last name field is required."
                : errorsForm.surname.type === "pattern"
                ? "Your last name is not valid!"
                : "Something is wrong with your last name."}
            </p>
          )}
        </div>
      )}
      {user.role === "company" && (
        <div className="relative w-full grid grid-cols-1 gap-4">
          <InputLabelAndDesign
            label="Company name"
            icon={<User className="fill-primary w-4 h-4" />}
          >
            <input
              type="text"
              defaultValue={user.name}
              placeholder="Your company name"
              className="w-full outline-none"
              {...registerForm("name", {
                required: true,
                pattern: /^[a-zA-Z0-9,. ]+$/,
              })}
            />
          </InputLabelAndDesign>
          {errorsForm.name && (
            <p className="absolute top-full left-0 pt-1 xl:pt-2 font-semibold text-16 text-danger">
              {errorsForm.name.type === "required"
                ? "Company name field is required."
                : errorsForm.name.type === "pattern"
                ? "Your company name is not valid!"
                : "Something is wrong with your first name."}
            </p>
          )}
        </div>
      )}
      {user.role === "user" && (
        <div className="relative w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <InputLabelAndDesign
            label="Gender"
            icon={<Heart className="stroke-primary w-4 h-4" />}
          >
            <select
              defaultValue={user.gender}
              placeholder="Choose gender"
              className="w-full outline-none"
              {...registerForm("gender", {
                required: true,
              })}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </InputLabelAndDesign>
          <InputLabelAndDesign
            label="Age"
            icon={<Star className="stroke-primary fill-transparent w-4 h-4" />}
          >
            <input
              type="number"
              defaultValue={user.age}
              placeholder="Your age"
              className="w-full outline-none"
              {...registerForm("age", {
                required: true,
                min: 18,
                max: 65,
              })}
            />
          </InputLabelAndDesign>
          {errorsForm.age && (
            <p className="absolute top-full left-0 pt-1 xl:pt-2 font-semibold text-16 text-danger">
              {errorsForm.age.type === "required"
                ? "Age field is required."
                : errorsForm.age.type === "min" || errorsForm.age.type === "max"
                ? "You can not be employee at this age."
                : "Something is wrong with your age."}
            </p>
          )}
        </div>
      )}
      <div className="relative w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <InputLabelAndDesign
          label="E-mail"
          icon={<Mail className="fill-primary w-4 h-4" />}
        >
          <input
            type="email"
            placeholder="Your E-mail"
            defaultValue={user.email}
            className="w-full outline-none"
            {...registerForm("email", {
              required: true,
              pattern: /^[a-zA-Z0-9._%=-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/,
            })}
          />
        </InputLabelAndDesign>
        <InputLabelAndDesign
          label="Password"
          icon={<Safe className="fill-primary w-4 h-4" />}
        >
          <input
            type="password"
            placeholder="Your password"
            defaultValue={user.password}
            className="w-full outline-none"
            {...registerForm("password", {
              required: true,
              pattern:
                /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
              minLength: 6,
              maxLength: 20,
            })}
          />
        </InputLabelAndDesign>

        {errorsForm.email && (
          <p className="absolute top-full left-0 pt-1 xl:pt-2 font-semibold text-16 text-danger">
            {errorsForm.email.type === "required"
              ? "E-mail field is required."
              : errorsForm.email.type === "pattern"
              ? "This e-mail is not valid!"
              : "Something is wrong with your e-mail."}
          </p>
        )}
        {!errorsForm.email && errorsForm.password && (
          <p className="absolute top-full pt-1 xl:pt-2 left-0 font-semibold text-16 text-danger">
            {errorsForm.password.type === "required"
              ? "Password field is required."
              : errorsForm.password.type === "minLength" ||
                errorsForm.password.type === "maxLength"
              ? "Password should contain from 6 to 20 characters."
              : errorsForm.password.type === "pattern"
              ? "Please fill password rules."
              : "Something is wrong with confirm password."}
          </p>
        )}
      </div>
      <Button
        type="submit"
        label="Save Changes"
        className="border-4 border-primary text-primary hover:text-white hover:bg-primary hover:border-white/25 mt-4 xl:mt-6"
      />
    </form>
  );
};

export default EditUserForm;