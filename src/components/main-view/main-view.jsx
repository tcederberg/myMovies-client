import { useState, useEffect } from 'react';
import { MovieCard } from "./../movie-card/movie-card";
import { MovieView } from "./../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("https://my-movies-flix-007-49f90683c638.herokuapp.com/movies")
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.map((movie) => {
                return {
                    id: movie._id,
                    title: movie.Title,
                    description: movie.Description,
                    director: movie.Director.Name,
                    genre: movie.Genre.Name,
                    image: movie.ImagePath,
                    featured: movie.Featured
                };
            });

            setMovies(moviesFromApi);
        });
    }, []);
      
      const [selectedMovie, setSelectedMovie] = useState(null);

      if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
      }
    
      if (movies.length === 0) {
        return <div>The list is empty!</div>;
      }
    
      return (
        <div>
            {movies.map((movie) => (
            <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
                }}
            />
            ))}
        </div>
      );
    };