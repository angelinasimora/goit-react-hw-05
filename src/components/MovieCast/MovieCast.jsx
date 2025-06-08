import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../services/tmdbApi";
import styles from "./MovieCast.module.css";


function MovieCast() {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchMovieCast(movieId);
                setCast(data);
            } catch (error) {
                console.error("Failed to fetch cast", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [movieId]);

    if (isLoading) {
        return <p>Loading...</p>;
    }
    return (

        <div>
            <h2>Actors</h2>
            {cast.length > 0 ? (
                <ul className={styles.castList}>
                    {cast.map(actor => (
                        <li key={actor.id} className={styles.castItem}>
                            <img className={styles.actor} src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} />
                            <h3>{actor.name}</h3>
                            <p>Character: {actor.character}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                    <p>Not Actors</p>
                )}
        </div>
    );
}

export default MovieCast;