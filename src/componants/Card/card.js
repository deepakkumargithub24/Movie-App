import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./card.css";
import { Link } from "react-router-dom";

const Cards = ({ movie }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer); // Clear the timer on component unmount
    }, []);

    return (
        <>
            {isLoading ? ( // Corrected this part to wrap the condition in curly braces
                <div className="cards">
                    <SkeletonTheme color="black" highlightColor="#444">
                        <Skeleton height={300} duration={2} />
                    </SkeletonTheme>
                </div>
            ) : (
                <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "white" }}>
                    <div className="cards">
                        <img className="cards_img" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.original_title} />
                        <div className="cards_overlay">
                            <div className="cards_title">{movie.original_title}</div>
                            <div className="cards_runtime">
                                {movie.release_date}
                                <span className="cards_rating">{movie.vote_average} ★</span>
                                <span>★</span>
                            </div>
                            <div className="cards_description">{movie.overview.slice(0, 110) + "..."}</div>
                        </div>
                    </div>
                </Link>
            )}
        </>
    );
};

export default Cards;
