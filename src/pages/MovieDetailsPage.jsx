import { useEffect, useState } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import {
  fetchMovieDetails,
  fetchMovieRecommendations,
  fetchMovieVideos,
} from "../services/tmdbApi.js";
import MovieCard from "../components/MovieCard/MovieCard";
import Cast from "../components/MovieCast/MovieCast";
import Reviews from "../components/MovieReviews/MovieReviews";
import styles from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchMovieDetails(movieId)
      .then(setMovie)
      .finally(() => setIsLoading(false));

    fetchMovieRecommendations(movieId)
      .then(setRecommendations)
      .catch((err) => console.error("Error fetching recommendations", err));
    fetchMovieVideos(movieId).then((videos) => {
      const youtubeTrailer = videos.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      setTrailer(youtubeTrailer);
    });
  }, [movieId]);

  if (isLoading) return <p>Loading...</p>;

  return movie ? (
    <div
      className={styles.backgroundWrapper}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className={styles.overlay}>
        <div className={styles.container}>
          <div className={styles.divMovies}>
            <img
              className={styles.imgMovie}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h1 className={styles.title}>{movie.title}</h1>
            <p>Score: {Math.round(movie.vote_average * 10)}%</p>
            <p className={styles.descriptionMovie}>{movie.overview}</p>
            <ul className={styles.genresList}>
              {movie.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>

          <div className={styles.divLink}>
            <button
              className={`${styles.link} ${
                activeSection === "cast" ? styles.linkActive : ""
              }`}
              onClick={() =>
                setActiveSection((prev) => (prev === "cast" ? null : "cast"))
              }
            >
              Check actors
            </button>
            <button
              className={`${styles.link} ${
                activeSection === "reviews" ? styles.linkActive : ""
              }`}
              onClick={() =>
                setActiveSection((prev) =>
                  prev === "reviews" ? null : "reviews"
                )
              }
            >
              Check reviews
            </button>
          </div>

          <div className={styles.outletWrapper}>
            {activeSection === "cast" && <Cast movieId={movieId} />}
            {activeSection === "reviews" && <Reviews movieId={movieId} />}
          </div>
          {!activeSection && (
            <>
              {trailer && (
                <div className={styles.trailerWrapper}>
                  {/* <h2>Trailer</h2> */}
                  <div className={styles.trailer}>
                    <iframe
                      width="100%"
                      height="400"
                      src={`https://www.youtube.com/embed/${trailer.key}`}
                      title="Movie Trailer"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              {recommendations.length > 0 && (
                <div className={styles.recommendationsWrapper}>
                  <h2>Recommended Movies</h2>
                  <ul className={styles.recommendationsList}>
                    {recommendations.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  ) : (
    <p>Not found</p>
  );
}

export default MovieDetailsPage;
