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
        <div>
            <h2>Review</h2>
            {reviews.length > 0 ? (
                <ul>
                    {reviews.map(review => (
                        <li key={review.id}>
                            <h3>{review.author}</h3>
                            <p>{review.content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                    <p>No reviews</p>
                )}
        </div>
    );
}

export default MovieReviews;