// pages/movies-by-director.js

import React, { useState } from "react";
import axios from "axios";
import TitleAndDescription from "@/components/TitleAndDescription";
import InputLabelAndDesign from "@/components/InputLabelAndDesign";
import Button from "@/components/Button";

function MoviesByDirector() {
  const [directorName, setDirectorName] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const handleDirectorNameChange = (e) => {
    setDirectorName(e.target.value);
  };

  const fetchMoviesByDirector = () => {
    setError("");
    axios
      .get("http://localhost:4000/movies/filter-by-name/" + directorName)

      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        setError("Gabim gjatë marrjes së filmave.");
      });
  };

  return (
    <div className="flex justify-center items-center w-full h-full flex-col mt-20">
      <div className="w-96 border p-8 border-primary">
        <TitleAndDescription
          title="Shfaq Filmat e Një Regjisori"
          titleCustomStyle="text-center"
          descriptionCustomStyle="w-full"
        />
        <InputLabelAndDesign label="Emri i Regjisorit:">
          <input
            type="text"
            id="directorName"
            className="w-full outline-none"
            name="directorName"
            value={directorName}
            onChange={handleDirectorNameChange}
          />
        </InputLabelAndDesign>

        <button
          type="submit"
          onClick={() => fetchMoviesByDirector()}
          className="border-4 border-primary text-primary hover:text-white hover:bg-primary hover:border-white/25 mt-4 xl:mt-6 w-full py-2 text-center font-regular text-16 rounded-full"
        >
          Shfaq Filmat
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              {movie.title}-{movie.releaseYear}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MoviesByDirector;
