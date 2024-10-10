import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Home.css';
import { useParams } from 'react-router-dom';
import MovieList from '../../componants/movieList/movieList';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const { type } = useParams(); // Get the type from URL params
    const [category, setCategory] = useState(type || 'popular'); // Default to 'popular' if type is undefined

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/movies?category=${category}`);
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching data from API:', error);
                setError('Failed to fetch data');
            }
        };

        fetchData();
    }, [category]); // Re-fetch data when the category changes

    return (
        <>
            <div className="poster">
                {error ? (
                    <p>{error}</p>
                ) : (
                    <Carousel
                        showThumbs={false}
                        autoPlay={true}
                        transitionTime={3}
                        infiniteLoop={true}
                        showStatus={false}
                    >
                        {movies.map((movie) => (
                            <Link
                                key={movie.id}
                                style={{ textDecoration: 'none', color: 'white' }}
                                to={`/movie/${movie.id}`}
                            >
                                <div className="posterImage">
                                    <img
                                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                        alt={movie.title}
                                    />
                                </div>
                                <div className="posterImage_overlay">
                                    <div className="posterImage_title">{movie.original_title || movie.title}</div>
                                    <div className="posterImage_runtime">
                                        {movie.release_date}
                                        <span className="posterImage_rating">
                                            {movie.vote_average}
                                        </span>
                                        <span>★</span>
                                    </div>
                                    <div className="posterImage_description">{movie.overview}</div>
                                </div>
                            </Link>
                        ))}
                    </Carousel>
                )}
            </div>
            <MovieList/>
        </>
    );
};

export default Home;
