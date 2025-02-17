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
            <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <input 
                    type="text" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                    placeholder="Enter movie title..."
                    style={{ padding: "8px", fontSize: "16px", width: "250px" }}
                />
                <button type="submit" style={{ padding: "8px 16px", fontSize: "16px", cursor: "pointer" }}>
                    Search
                </button>
            </form>
            <MovieList movies={movies} isLoading={isLoading} />
        </div>
    );
}

export default MoviesPage;
