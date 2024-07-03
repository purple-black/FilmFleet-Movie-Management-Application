import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import * as React from "react";
import { Link } from "react-router-dom";
import Image from 'react-bootstrap/Image';

import Search from "./Search";
import Movielist from "./Movielist";
import Addshows from "./Addshows";


// this function renders the header including the navabr of the application
//the Navbar conatains the application name, followed by others dropdwons like Movies, Theatres and Shows
//Each dropdown will have three links: for adding, deleting and listing.
function Header() {
    return (
        <>
            <Navbar fixed="top" expand="lg" className="bg-body-tertiary" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/Header">FilmFleet</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Movies" id="basic-nav-dropdown">

                                <NavDropdown.Item href="/Addmovies">Add Movies</NavDropdown.Item>
                                <NavDropdown.Item href="/Deletemovies">Delete Movies</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/Movielist">Movies List</NavDropdown.Item>

                            </NavDropdown>

                            <NavDropdown title="Theatres" id="basic-nav-dropdown">

                                <NavDropdown.Item href="/Addtheatres">Add Theatres</NavDropdown.Item>
                                <NavDropdown.Item href="/Deletetheatres">Delete Theatres</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/Theatrelist">Theatres List</NavDropdown.Item>

                            </NavDropdown>

                            <NavDropdown title="Shows" id="basic-nav-dropdown">

                                <NavDropdown.Item href="/Addshows">Add Shows</NavDropdown.Item>
                                <NavDropdown.Item href="DeleteShows">Delete Shows</NavDropdown.Item>
                                

                            </NavDropdown>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


           
            

        </>
    )
}

export default Header

