import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error,setError]=useState(null)

  function fetchMovie() {
    setIsLoading(true)
    fetch('https://swapi.dev/api/ilms/').then(
      (response) => {
        if (!response.ok) {
          setIsLoading(false)
          const error = new Error('Something went wrong');
          setError(error.message)
          console.error(error);
        }
        return response.json()
      }
    ).then((data) => {
      const transformedData = data.results.map((movie) => {
        return {
          id: movie['episode_id'],
          title: movie.title,
          releaseDate: movie['release_date'],
          openingText: movie['opening_crawl']
        }
      })
      setIsLoading(false)
      return setMovies(transformedData)
    })
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovie}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>loading ...</p>}
        {!isLoading && <MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
