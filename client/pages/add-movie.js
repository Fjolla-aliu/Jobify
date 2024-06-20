import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@/components/Button";
import TitleAndDescription from "@/components/TitleAndDescription";
import InputLabelAndDesign from "@/components/InputLabelAndDesign";

export default function AddMovie() {
  const [movieData, setMovieData] = useState({
    id: "",
    title: "",
    releaseYear: "",
    directorId: "",
  });
  const [directors, setDirectors] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData({
      ...movieData,
      [name]: value,
    });
  };

  useEffect(() => {
    function fetch() {
      axios
        .get("http://localhost:4000/directors")
        .then((response) => {
          setDirectors(response.data);
        })
        .catch((error) => {
          console.error("Gabim gjatë shtimit të filmit.");
        });
    }
    fetch();
  }, []);

  const addMovie = () => {
    axios
      .post("http://localhost:4000/movies", movieData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Gabim gjatë shtimit të filmit.");
      });
  };

  return (
    <div className="flex justify-center items-center w-full h-full flex-col mt-20">
      <TitleAndDescription
        title="Shto Filmin"
        titleCustomStyle="text-center"
        descriptionCustomStyle="w-full"
      />
      <form
        onSubmit={addMovie}
        className="w-96  border-primary border rounded-xl p-8"
      >
        <InputLabelAndDesign label="Id">
          <input
            type="text"
            id="id"
            name="id"
            className="w-full outline-none"
            value={movieData.id}
            onChange={handleInputChange}
          />
        </InputLabelAndDesign>

        <br />
        <InputLabelAndDesign label="Title">
          <input
            type="text"
            id="title"
            name="title"
            className="w-full outline-none"
            value={movieData.title}
            onChange={handleInputChange}
          />
        </InputLabelAndDesign>
        <br />
        <InputLabelAndDesign label="ReleaseYear">
          <input
            type="text"
            id="releaseYear"
            name="releaseYear"
            className="w-full outline-none"
            value={movieData.releaseYear}
            onChange={handleInputChange}
          />
        </InputLabelAndDesign>
        <br />

        <InputLabelAndDesign label="Director id">
          <select
            id="directorId"
            name="directorId"
            className="w-full outline-none"
            value={movieData.directorId}
            onChange={handleInputChange}
            // onChange={(e) => (movieData.directorId = e)}
          >
            {directors?.map((director) => (
              <option key={director.directorId} value={director.directorId}>
                {director.name}
              </option>
            ))}
          </select>
        </InputLabelAndDesign>
        <br />

        <Button
          type="submit"
          label="Shto Regjisorin"
          className="border-4 border-primary text-primary hover:text-white hover:bg-primary hover:border-white/25 mt-4 xl:mt-6"
        />
      </form>
    </div>
  );
}
