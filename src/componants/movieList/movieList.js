import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import Card from "../Card/card";
import "./movieList.css";
import { useParams } from "react-router-dom";

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
    const [error, setError] = useState(null);
    const { type } = useParams();

    // Fetch data when the component mounts
    useEffect(() => {
        getData();
    }, []);

    // Fetch data when the type changes
    useEffect(() => {
        getData();
    }, [type]);

    const getData = () => {
        const fetchData = async () => {
            try {
                console.log(`Fetching movies for category: ${type}`); // Log the category
                const response = await axios.get(`http://localhost:3001/movies?category=${type ? type : "popular"}`);
                console.log('Response data:', response.data); // Log the response data
                setMovieList(response.data);
            } catch (error) {
                console.error('Error fetching data from API:', error);
                setError('Failed to fetch data');
            }
        };
    
        fetchData(); // Call fetchData to execute the API request
    }    

    return (
        <div className="movie_list">
            <h2 className="list_title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="list_cards">
                {error ? (
                    <p>{error}</p>
                ) : (
                    movieList.map(movie => (
                        <Card key={movie.id} movie={movie} />
                    ))
                )}
            </div>
        </div>
    );
}

export default MovieList;
