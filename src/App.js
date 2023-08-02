import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import Spinner from "./components/Spinner";
import { useEffect } from "react";
import { useCallback } from "react";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //using then
  // function fetchMovie() {
  //   setIsLoading(true)
  //   setError(null)
  //   fetch('https://swapi.dev/api/ilms/').then(
  //     (response) => {
  //       if (!response.ok) {
  //         setIsLoading(false)
  //         const error = new Error('Something went wrong');
  //         setError(error.message)
  //         console.error(error);
  //       }
  //       return response.json()
  //     }
  //   ).then((data) => {
  //     const transformedData = data.results.map((movie) => {
  //       return {
  //         id: movie['episode_id'],
  //         title: movie.title,
  //         releaseDate: movie['release_date'],
  //         openingText: movie['opening_crawl']
  //       }
  //     })
  //     setIsLoading(false)
  //     return setMovies(transformedData)
  //   })
  // }

  //using async
  const fetchMovie = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(
      "https://react-http-1474c-default-rtdb.firebaseio.com/movies.json"
    );
    if (!response.ok) {
      setIsLoading(false);
      const error = new Error("Something went wrong");
      setError(error.message);
      console.error(error);
    }
    const data = await response.json();
    const loadedMovies = [];

    for (const key in data) {
      loadedMovies.push({
        id: key,
        title: data[key].title,
        openingText: data[key].openingText,
        releaseDate: data[key].releaseDate,
      });
    }

    setIsLoading(false);
    return setMovies(loadedMovies);
  }, []);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  const addMovieHandler = async (movie) => {
    await fetch("https://react-http-1474c-default-rtdb.firebaseio.com/movies.json", {
      method: "POST",
      body: JSON.stringify(movie),
      headers: { "Content-Type": "application/json" },
    });

    await fetchMovie()
  };

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovie}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && error && <p style={{ color: "red" }}>{error}</p>}
        {isLoading && <Spinner />}
        {!isLoading && !error && movies.length === 0 && <p>no movies found</p>}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
