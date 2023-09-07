const InputLabelAndDesign = ({ label = "", icon = "", children }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="text-quaternary text-14 font-regular">{label}</div>
      <div className="relative w-full flex items-center text-16 text-secondary py-3 px-4 gap-x-4 border border-secondaryOpacity10 rounded-md">
        {icon}
        {children}
      </div>
    </div>
  );
};

export default InputLabelAndDesign;
