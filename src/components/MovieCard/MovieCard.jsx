import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";

function MovieCard({ movie }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const year =
    movie.release_date?.slice(0, 4) ||
    movie.first_air_date?.slice(0, 4) ||
    "N/A";

  return (
    <li className={styles.card}>
      <Link to={`/movies/${movie.id}`} className={styles.cardLink}>
        <div
          className={styles.poster}
          style={{ backgroundImage: `url(${posterUrl})` }}
        ></div>
        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>{movie.title}</h3>
          <span className={styles.year}>({year})</span>
        </div>
      </Link>
    </li>
  );
}

export default MovieCard;
