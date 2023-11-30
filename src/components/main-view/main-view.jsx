import { useState, useEffect } from 'react';
import { MovieCard } from "./../movie-card/movie-card";
import { MovieView } from "./../movie-view/movie-view";
import { LoginView } from "./../login-view/login-view";
import { SignupView } from "./../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    


    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://my-movies-flix-007-49f90683c638.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
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
    }, [token]);
      
      
    return (
        <Row className="justify-content-md-center">
            {!user ? (
                <Col md={5}>
                    <LoginView 
                    onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }} />
                    or 
                    <SignupView />
                </Col>
            ) : selectedMovie ? (
                <Col md={8}>
                <MovieView
                    movie={selectedMovie}
                    onBackClick={() => setSelectedMovie(null)}
                />
                </Col>
            ) : movies.length === 0 ? (
                <div>The list is empty!</div>
            ) : (
                <>
                {movies.map((movie) => (
                    <Col className="mb-5" key={movie.id} md={3}>
                    <MovieCard
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
                </Col>
                ))}
                </>
            )}
            </Row>
        );
      };




      /*if (selectedMovie) {
        return (
            <>
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} /><br />
        );
      }
    
      if (movies.length === 0) {
        return <div>The list is empty!</div>;
      }
    
      return (
        <>
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
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        </>
      );
    };*/