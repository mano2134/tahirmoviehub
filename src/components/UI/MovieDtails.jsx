import { useEffect, useState, useTransition } from "react";
import { useNavigate, useParams } from "react-router";
import { getMovieDetail } from "../../Api/omdb";

const MovieDtails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isPending, setTransition] = useTransition();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getMovieDetail(id);
      setTransition(() => {
        setMovie(res.data);
      });
    } catch (err) {
      console.error("Failed to fetch movie data", err);
    }
  };
  
  

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="movieDetail">
      {isPending && <div className="loader"></div>}
      <h1>
        See Details of
        <span style={{ textDecoration: movie?.Title ? "underline" : "none" }}>
          {movie?.Title || "..."}
        </span>
      </h1>

       

      {movie && (
        <div className="movie-box">
          <div className="movie-left">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="movie-poster"
            />
          </div>

          <div className="movie-right">
            <h2>{movie.Title}</h2>
            <p>
              <strong>Year:</strong> {movie.Year}
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {movie.imdbRating}/10
            </p>
            <p>
              <strong>Plot:</strong> {movie.Plot}
            </p>
            <p>
              <strong>Actors:</strong> {movie.Actors}
            </p>
            <p>
              <strong>Awards:</strong> {movie.Awards}
            </p>
            <p>
              <strong>Language:</strong> {movie.Language}
            </p>
            <p>
              <strong>Country:</strong> {movie.Country}
            </p>
            <p>
              <strong>Director:</strong> {movie.Director}
            </p>
            <p>
              <strong>Genre:</strong> {movie.Genre}
            </p>
          </div>
          <button className="go-back-btn" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieDtails;
