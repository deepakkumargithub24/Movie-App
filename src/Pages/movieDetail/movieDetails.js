import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./movieDetails.css";

const MovieDetail = () => {
    const { id } = useParams(); // Get movie ID from the URL
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);

    // Fetch movie details when the component mounts or when the ID changes
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/movie/${id}`);
                setMovie(response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
                setError('Failed to fetch movie details');
            }
        };

        fetchMovie(); // Fetch movie details based on the ID
    }, [id]);

    if (error) return <div>{error}</div>;
    if (!movie) return <div>Loading...</div>;

    return (
        <div className="movie-detail-container">
            <div className="movie-content">
                {/* Movie Poster */}
                <div className="movie-poster-container">
                    <img
                        className="movie-poster"
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title}
                    />
                    <div className="poster-overlay">
                        <h1>{movie.title}</h1>
                        <p><strong>Rating:</strong> {movie.vote_average}/10</p>
                        <p><strong>Release Date:</strong> {movie.release_date}</p>
                        <p>{movie.overview}</p>
                    </div>
                </div>

                {/* Additional Movie Information Below the Poster */}
                <div className="movie-details">
                    <div className="info">
                        <div>
                            <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                            <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(", ")}</p>
                            <p><strong>Language:</strong> {movie.original_language.toUpperCase()}</p>
                        </div>
                        <div>
                            <p><strong>Tagline:</strong> {movie.tagline ? movie.tagline : 'N/A'}</p>
                            <p><strong>Budget:</strong> ${movie.budget.toLocaleString()}</p>
                            <p><strong>Revenue:</strong> ${movie.revenue.toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Link to IMDb page */}
                    <a
                        className="imdb-link"
                        href={`https://www.imdb.com/title/${movie.imdb_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View on IMDb
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
