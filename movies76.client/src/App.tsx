//import { useEffect, useState } from 'react';
//import Container from 'react-bootstrap/Container';
/*
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
*/
import './App.css';
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Addmovies from './components/Addmovies';
import Addtheatres from './components/Addtheatres';
import Movielist from './components/Movielist';
import Theatrelist from './components/Theatrelist';
import Shows from './components/Shows';
import Search from './components/Search';
import Addshows from "./components/Addshows";
import AddNewShow from "./components/AddNewShow";
import DeleteShows from "./components/DeleteShows";
import { React, useState, createContext } from "react";
import Image from 'react-bootstrap/Image';
import DeleteMovies from './components/DeleteMovies';
import DeleteTheatre from './components/DeleteTheatre';

function App() {

    const myStyle = {
        height: "60vh",
        marginTop: "-70px",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
    };

    return (
        <>
            <BrowserRouter>
                <div className='App' style={myStyle}>
                    <Header />
                    <Image src="./src/FilmfleetPic1.jpg" alt="Description of the image" fluid />
                    
                </div>
                <Search />  
                <Routes>
                    <Route path='/' element={<Header />} />
                    <Route path='/addmovies' element={<Addmovies />} />
                    <Route path='/addtheatres' element={<Addtheatres />} />
                    <Route path='/movielist' element={<Movielist />} />
                    <Route path='/theatrelist' element={<Theatrelist />} />
                    <Route path='/addshows' element={<AddNewShow />} />
                    <Route path='/deleteshows' element={<DeleteShows />} />
                    <Route path='/deletemovies' element={<DeleteMovies />} />
                    <Route path='/deletetheatres' element={<DeleteTheatre />} />
                </Routes>
                
            </BrowserRouter>

        </>
    );
}

export default App;

//<Image src="./src/FilmfleetPic1.jpg" alt="Description of the image" fluid />

//<Route path='/showlist' element={<Addshows />} />