const TitleAndDescription = ({
    title = "",
    description = "",
    titleCustomStyle = "",
    descriptionCustomStyle = "",
    smallerElements = false,
  }) => {
    return (
      <div className={`w-full h-full ${titleCustomStyle}  flex `}>
        <div className={descriptionCustomStyle}>
          <p
            className={`${
              smallerElements ? "text-16" : "text-27"
            } font-bold text-secondary `}
          >
            {title}
          </p>
          <p
            className={`${
              smallerElements ? "text-13" : "text-16"
            } text-quaternary`}
          >
            {description}
          </p>
        </div>
      </div>
    );
  };
  
  export default TitleAndDescription;
  