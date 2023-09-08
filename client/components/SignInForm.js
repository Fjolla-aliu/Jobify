import Button from "../components/Button";
import InputLabelAndDesign from "../components/InputLabelAndDesign";

//SVG-s
import Safe from "../public/icons/others/safe.svg";
import Mail from "../public/icons/others/mail.svg";

const SignInForm = ({
  register,
  handleSubmit,
  errors,
  onSubmitSignInForm,
  loggedIn,
}) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmitSignInForm)}
      className="flex flex-col gap-4"
    >
      <InputLabelAndDesign
        label="E-mail"
        icon={<Mail className="fill-primary w-4 h-4" />}
      >
        <input
          type="email"
          placeholder="Your E-mail"
          className="w-full outline-none"
          {...register("email", {
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
          className="w-full outline-none"
          {...register("password", {
            required: true,
            minLength: 8,
          })}
        />
        {errors.email && (
          <p className="absolute top-full left-0 pt-1 xl:pt-2 font-semibold text-16 text-danger">
            {errors.email.type === "required"
              ? "E-mail field is required."
              : errors.email.type === "pattern"
              ? "This e-mail is not valid!"
              : "Something is wrong with your e-mail."}
          </p>
        )}
        {errors.password && !errors.email && (
          <p className="absolute top-full pt-1 xl:pt-2 left-0 font-semibold text-16 text-danger">
            {errors.password.type === "required"
              ? "Password field is required."
              : errors.password.type === "minLength"
              ? "Your password is too short."
              : "Something is wrong with your password."}
          </p>
        )}
        {!errors.password && !errors.email && loggedIn === false && (
          <p className="absolute top-full pt-1 xl:pt-2 left-0 font-semibold text-16 text-danger">
            Email or password are invalid
          </p>
        )}
      </InputLabelAndDesign>
      <Button
        type="submit"
        label="Sign in"
        className="border-4 border-primary text-primary hover:text-white hover:bg-primary hover:border-white/25 mt-4 xl:mt-6"
      />
    </form>
  );
};

export default SignInForm;
