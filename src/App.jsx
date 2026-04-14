import React, { useState, useEffect } from "react";

import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";

const apiKey = import.meta.env.VITE_IMDB_API_KEY;

const API_URL = `https://www.omdbapi.com?apikey=${apiKey}`;

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    // fixed duplicate UI cards"
    if (data.Search) {
      const unique = [
        ...new Map(data.Search.map((m) => [m.imdbID, m])).values(),
      ];

      setMovies(unique);
    } else {
      setMovies([]);
    }
    // setMovies(data.Search || []);
    // Used this for testing + debugging only..
    // console.log(data.Search);
  };

  useEffect(() => {
    searchMovies("Batman");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchMovies(searchTerm);
            }
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
