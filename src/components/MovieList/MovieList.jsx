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
          {movies.map(
            ({
              id,
              title,
              name,
              release_date,
              first_air_date,
              poster_path,
            }) => {
              const year =
                release_date?.slice(0, 4) ||
                first_air_date?.slice(0, 4) ||
                "N/A";
              return (
                <li key={id}>
                  <Link
                    className={styles.link}
                    to={`/movies/${id}`}
                    state={{ from: location }}
                  >
                    <img
                      src={
                        poster_path
                          ? IMAGE_BASE_URL + poster_path
                          : "/no-image.jpg"
                      }
                      alt={title || name}
                      width="100"
                    />
                    <p>{title || name}</p>
                    <span className={styles.year}>({year})</span>
                  </Link>
                </li>
              );
            }
          )}
        </ul>
      ) : (
        <p className={styles.noMovies}>No movies</p>
      )}
    </>
  );
}

export default MovieList;
