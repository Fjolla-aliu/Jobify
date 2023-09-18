import Button from "./Button";
import InputLabelAndDesign from "./InputLabelAndDesign";

const AddJobFormUser = ({
  registerForm,
  handleSubmitForm,
  errorsForm,
  onSubmitRegisterForm,
  userName,
}) => {
  const minDate = new Date().toLocaleDateString("sv-SE");
  return (
    <form
      onSubmit={handleSubmitForm(onSubmitRegisterForm)}
      className="flex flex-col gap-4"
    >
      <div className="relative w-full grid grid-cols-1 gap-4">
        <InputLabelAndDesign label="Title">
          <input
            type="text"
            placeholder="Job title"
            className="w-full outline-none"
            {...registerForm("jobTitle", {
              required: true,
            })}
          />
        </InputLabelAndDesign>
        <InputLabelAndDesign label="Technologies">
          <textarea
            placeholder="Job technologies"
            rows={4}
            className="w-full outline-none"
            {...registerForm("jobTechnologies", {
              required: true,
            })}
          />
        </InputLabelAndDesign>
        <InputLabelAndDesign label="Experience">
          <textarea
            placeholder="Job experience"
            rows={4}
            className="w-full outline-none"
            {...registerForm("jobExperience", {
              required: true,
            })}
          />
        </InputLabelAndDesign>
        <InputLabelAndDesign label="Category">
          <select
            {...registerForm("category", {
              required: true,
            })}
            className="w-full outline-none font-regular text-secondary"
          >
            <option value="programming">Programming</option>
            <option value="science">Science</option>
            <option value="economy">Economy</option>
            <option value="other">Other</option>
          </select>
        </InputLabelAndDesign>
        <InputLabelAndDesign label="Degree">
          <select
            {...registerForm("degree", {
              required: true,
            })}
            defaultValue="bachelor"
            className="w-full outline-none font-regular text-secondary"
          >
            <option value="doctor">Doctorate</option>
            <option value="master">Master</option>
            <option value="bachelor">Bachelor</option>
            <option value="highSchool">High School</option>
            <option value="lowMiddleSchool">Low/Middle School</option>
            <option value="none">None</option>
          </select>
        </InputLabelAndDesign>
        <InputLabelAndDesign label="Worker">
          <input
            type="text"
            defaultValue={userName}
            disabled={true}
            placeholder="User name"
            className="w-full outline-none"
          />
        </InputLabelAndDesign>
        <InputLabelAndDesign label="Until date">
          <input
            type="date"
            min={minDate}
            className="w-full outline-none"
            {...registerForm("untilDate", {
              required: true,
            })}
          />
        </InputLabelAndDesign>
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4">
          <InputLabelAndDesign label="Time of work">
            <select
              {...registerForm("hours", {
                required: true,
              })}
              className="w-full outline-none font-regular text-secondary"
            >
              <option value="8 hours">8 hours</option>
              <option value="4 hours">4 hours</option>
              <option value="Other">Other</option>
            </select>
          </InputLabelAndDesign>
          <div className="w-full justify-center flex flex-col gap-2 xl:ml-8">
            <div className="text-quaternary text-14 font-regular">Remote</div>
            <input
              type="checkbox"
              {...registerForm("remote")}
              defaultChecked={false}
              className="w-8 h-8 accent-primary"
            />
          </div>
        </div>

        {errorsForm.jobTitle && (
          <p className="absolute top-full left-0 pt-1 xl:pt-2 font-semibold text-16 text-danger">
            {errorsForm.jobTitle.type === "required"
              ? "Job title is required."
              : "Something is wrong with your job title."}
          </p>
        )}
        {!errorsForm.jobTitle && errorsForm.jobDescription && (
          <p className="absolute top-full left-0 pt-1 xl:pt-2 font-semibold text-16 text-danger">
            {errorsForm.jobDescription.type === "required"
              ? "Job description is required."
              : "Something is wrong with your job description."}
          </p>
        )}
        {!errorsForm.jobTitle &&
          !errorsForm.jobDescription &&
          errorsForm.companyName && (
            <p className="absolute top-full left-0 pt-1 xl:pt-2 font-semibold text-16 text-danger">
              {errorsForm.companyName.type === "required"
                ? "Company name is required."
                : "Something is wrong with your company name."}
            </p>
          )}
        {!errorsForm.jobTitle &&
          !errorsForm.jobDescription &&
          !errorsForm.companyName &&
          errorsForm.untilDate && (
            <p className="absolute top-full left-0 pt-1 xl:pt-2 font-semibold text-16 text-danger">
              {errorsForm.untilDate.type === "required"
                ? "Date is required."
                : "Something is wrong with date."}
            </p>
          )}
      </div>
      <Button
        type="submit"
        label="Add new job"
        className="border-4 border-primary text-primary hover:text-white hover:bg-primary hover:border-white/25 mt-4 xl:mt-6"
      />
    </form>
  );
};

export default AddJobFormUser;