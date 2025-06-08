import { useState, useEffect } from "react";
import { searchMovies } from "../services/tmdbApi";
import MovieList from "../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import styles from "./MoviesPage.module.css";
import { FaSearch } from "react-icons/fa";
import EmptyState from "../components/EmptyState/EmptyState";
import { fetchTrendingMovies } from "../services/tmdbApi";
import Loader from "../components/Loader/Loader";

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchQuery = searchParams.get("q");
    if (!searchQuery) return;

    let isCancelled = false;
    setIsLoading(true);

    searchMovies(searchQuery)
      .then((data) => {
        if (!isCancelled) setMovies(data);
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    updateSearchParams("q", query);
  };

  const updateSearchParams = (key, value) => {
    const updatedParams = new URLSearchParams(searchParams);
    if (value) {
      updatedParams.set(key, value);
    } else {
      updatedParams.delete(key);
    }
    setSearchParams(updatedParams);
  };

  return (
    <div className="form">
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie title..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          <FaSearch style={{ marginRight: "8px" }} />
          Search
        </button>
      </form>
      {!movies.length && !isLoading ? (
        <EmptyState
          onFeelingLucky={async () => {
            setIsLoading(true);
            const trending = await fetchTrendingMovies();
            if (trending.length > 0) {
              const randomMovie =
                trending[Math.floor(Math.random() * trending.length)];
              setMovies([randomMovie]);
            }
            setIsLoading(false);
          }}
        />
      ) : isLoading ? (
        <Loader />
      ) : (
        <MovieList movies={movies} isLoading={false} />
      )}
    </div>
  );
}

export default MoviesPage;
