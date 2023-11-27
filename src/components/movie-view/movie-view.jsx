import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={movie.image} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.director}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.genre}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.description}</span>
        </div>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };

  MovieView.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        director: PropTypes.shape({
            Name: PropTypes.object.isRequired
        }),
        genre: PropTypes.shape({
            Name: PropTypes.object.isRequired
        }),
        image: PropTypes.string.isRequired,
        featured: PropTypes.bool,
    }),
    onBackClick: PropTypes.func.isRequired
  };