import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/tmdbApi";
import styles from "./MovieReviews.module.css";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId).then(setReviews);
  }, [movieId]);

  return (
    <div className={styles.reviewContainer}>
      <h2 className={styles.reviewTitle}>Reviews</h2>
      {reviews.length > 0 ? (
        <ul className={styles.reviewList}>
          {reviews.map((review) => (
            <li key={review.id} className={styles.reviewItem}>
              <h3 className={styles.reviewAuthor}>{review.author}</h3>
              <p className={styles.reviewContent}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noReviews}>No reviews</p>
      )}
    </div>
  );
}
export default MovieReviews;
