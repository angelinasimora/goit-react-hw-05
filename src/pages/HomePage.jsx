import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../services/tmdbApi";
import MovieList from "../components/MovieList/MovieList";
import styles from "./HomePage.module.css";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [backgrounds, setBackgrounds] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchTrendingMovies().then((data) => {
      setMovies(data);
      setBackgrounds(
        data
          .map(
            (movie) =>
              movie.backdrop_path &&
              `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
          )
          .filter(Boolean)
      );
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgrounds]);

  return (
    <>
      <div
        className={styles.slider}
        style={{
          backgroundImage: backgrounds.length
            ? `url(${backgrounds[currentIndex]})`
            : "none",
        }}
      >
        <div className={styles.overlay}>
          <h1 className={styles.title}>Trending Movies</h1>
        </div>
      </div>

      <div className={styles.moviesSection}>
        <MovieList movies={movies} isLoading={isLoading} />
      </div>
    </>
  );
}

export default HomePage;
