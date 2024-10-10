import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/"><img className="icon" src="http://www.slashfilm.com/wp/wp-content/images/ZZ4DBD2C64.jpg" /></Link>
                <Link to="/movies/popular">Popular</Link>
                <Link to="/movies/top_rated">Top Rated</Link>
                <Link to="/movies/upcoming">Upcoming</Link>
            </div>
        </div>
    )
}

export default Header;