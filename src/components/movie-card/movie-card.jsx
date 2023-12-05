import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BookmarkHeart, BookmarkHeartFill } from "react-bootstrap-icons";

export const MovieCard = ({ movie, addFav, removeFav, isFavorite }) => {
    return (
      <Card className="h-100">
        <div className="position-relative .d-inline-block">
          <Card.Img variant="top" src={movie.image} />
            <div>
              {isFavorite ? (
                <BookmarkHeartFill size={30} color="red" className="fav-button mt-2 me-2 top-0 end-0" onClick={() => removeFav(movie.id)}/>
              ) : (
                <BookmarkHeart size={30} color="red" className="fav-button mt-2 me-2 top-0 end-0" onClick={() => addFav(movie.id)}/>
              )}
            </div>
        </div>
        <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.director}</Card.Text>
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
              <Button variant="link">Open</Button>
            </Link>
        </Card.Body>
      </Card>
    );
  };

  MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        image: PropTypes.string}).isRequired
  };