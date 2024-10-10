import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./componants/Header/header";
import Home from "./Pages/Home/Home";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from './componants/movieList/movieList';
import MovieDetail from './Pages/movieDetail/movieDetails';

function App() {

  return (
    <div className="App">
        <Router>
            <Header/>
            <Routes>
                <Route index element={<Home/>}></Route>
                <Route path='movie/:id' element={<MovieDetail/>}></Route>
                <Route path='movies/:type' element={<MovieList/>}></Route>
                <Route path='/*' element={<h2>Error page</h2>}></Route>
            </Routes> 
        </Router>   
    </div>
  );
}

export default App;
