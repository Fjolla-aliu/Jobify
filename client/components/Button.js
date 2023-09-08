const Button = ({
  className = "",
  type = "button",
  label = "",
  disabled = false,
  onClick,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={() => onClick}
      className={`${className} w-full py-2 text-center font-regular text-16 rounded-full`}
    >
      {label}
    </button>
  );
};

export default Button;
