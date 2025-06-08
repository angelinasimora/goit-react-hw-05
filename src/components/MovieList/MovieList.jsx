import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";
import { IMAGE_BASE_URL } from "../../services/tmdbApi";

function MovieList({ movies, isLoading }) {
  const location = useLocation();
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {movies.length > 0 ? (
        <ul className={styles.listMovies}>
          {movies.map(({ id, title, poster_path }) => (
            <li key={id}>
              <Link
                className={styles.link}
                to={`/movies/${id}`}
                state={{ from: location }}
              >
                <img
                  src={IMAGE_BASE_URL + poster_path}
                  alt={title}
                  width="100"
                />
                <p>{title}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noMovies}>No movies</p>
      )}
    </>
  );
}

export default MovieList;
