import axios from "axios";

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjI5MjliYTEzN2ZiYjAwOWZmOTFjYjQ1MTM2MWVlYSIsIm5iZiI6MTczOTQ3MTk3Ny41MjgsInN1YiI6IjY3YWUzYzY5ZjI4ZDk1YWRiM2QwZDA2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Qlu_voOj2wSKGS5tXILi7euEhlnxqsPV3Q674JM_Ygg";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
    },
});

export async function fetchTrendingMovies() {
    const response = await axiosInstance.get("/trending/movie/day");
    return response.data.results;
}

export async function searchMovies(query) {
    const response = await axiosInstance.get("/search/movie", {
        params: {query, include_adult: false, language: 'en-US', page: 1 },
    });
    return response.data.results;
}

export async function fetchMovieDetails(movieId) {
    const response = await axiosInstance.get(`/movie/${movieId}`);
    return response.data;
}

export async function fetchMovieCast(movieId) {
    const response = await axiosInstance.get(`/movie/${movieId}/credits`);
    return response.data.cast;
}

export async function fetchMovieReviews(movieId) {
    const response = await axiosInstance.get(`/movie/${movieId}/reviews`);
    return response.data.results;
}

export async function fetchMovieRecommendations(movieId) {
    const response = await axiosInstance.get(`/movie/${movieId}/recommendations`, {
        params: {
            language: "en-US",
            page: 1,
        },
    });
    return response.data.results;
}

export async function fetchMovieVideos(movieId) {
    const response = await axiosInstance.get(`/movie/${movieId}/videos`);
    return response.data.results;
  }
  
  export async function fetchPopularMovies() {
    const { data } = await axiosInstance.get("/movie/popular");
    return data.results;
  }
export { IMAGE_BASE_URL };

