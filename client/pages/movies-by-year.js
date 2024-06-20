// pages/movies-by-year.js
import { useState, useEffect } from "react";
import axios from "axios";
import TitleAndDescription from "@/components/TitleAndDescription";
import InputLabelAndDesign from "@/components/InputLabelAndDesign";
import Button from "@/components/Button";

function MoviesByYear() {
  const [year, setYear] = useState("");
  const [movies, setMovies] = useState([]);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const fetchMoviesByYear = () => {
    axios
      .get("http://localhost:4000/movies/filter-by-year/" + year)
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Gabim gjatë marrjes së filmave:", error);
      });
  };

  // useEffect(() => {
  //   if (year) {
  //     fetchMoviesByYear();
  //   }
  // }, [year]);

  return (
    <div className="flex justify-center items-center w-full h-full flex-col mt-20">
      <div className="w-96 border p-8 border-primary">
        <TitleAndDescription
          title="Shfaq filmat e nje viti te caktuar"
          titleCustomStyle="text-center"
          descriptionCustomStyle="w-full"
        />
        <InputLabelAndDesign label="Zgjidh vitin e lansimit:">
          <input
            type="text"
            id="year"
            name="year"
            value={year}
            onChange={handleYearChange}
          />
        </InputLabelAndDesign>

        <button
          type="submit"
          onClick={() => fetchMoviesByYear()}
          className="border-4 border-primary text-primary hover:text-white hover:bg-primary hover:border-white/25 mt-4 xl:mt-6 w-full py-2 text-center font-regular text-16 rounded-full"
        >
          Shfaq Filmat
        </button>

        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              {movie.title} ({movie.releaseYear})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MoviesByYear;
