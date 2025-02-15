import { useState, useEffect } from "react";
import { searchMovies } from "../services/tmdbApi";
import MovieList from "../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";


function MoviesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        updateSearchParams("q", query);
        if (!query) return;

        let isCancelled = false;
        setIsLoading(true);

        searchMovies(query)
            .then((data) => {
                if (!isCancelled) setMovies(data);

            })
            .finally(() => {
                if (!isCancelled) setIsLoading(false);
            });

        return () => {
            isCancelled = true;
        };
    }, [query]);

    const handleSearch = (e) => {
        e.preventDefault();
    };

    const updateSearchParams = (key, value) => {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.set(key, value);
        setSearchParams(updatedParams);
    };

    return (
        <>
            <form onSubmit={handleSearch}>
                <input value={query} onChange={(e) => setQuery(e.target.value)} />
                <button type="submit">Search</button>
            </form>
            <MovieList movies={movies} isLoading={isLoading} />
        </>
    );
}

export default MoviesPage;