import * as React from "react";
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';

function DeleteMovies() {

    // state var for storing the movies
    const [movies, setMovies] = useState([])


    //method for fetching the movies details from the db table using the api.
    useEffect(() => {
        fetch('http://localhost:5086/Movies76.Server/Movies')
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(err => console.log(err))
    }, [])

    console.log(movies);
    // function for formatting the release date.
    //the format of release date is DD/MM/YYYY. The type of ReleaseDate is DateTime in the db and is converted into this format.
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-GB', options).format(date);
    };

    //function for deleting a movie.
    //takes in the id of the movie as parameter
    const handleDeleteMovie = (movieId) => {


        if (confirm("Proceed to delete?") == true) {


            fetch(`http://localhost:5086/Movies76.Server/Movies/${movieId}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        alert("Movie deleted successfully!");
                        window.location.reload();
                    }

                })
                .catch(error => {
                    console.error(`Error deleting movie with ID ${movieId}:`, error);
                    alert(`An error occurred while deleting movie with ID ${movieId}. Please try again later.`);
                });
        } else {
            console.log("cancelled deletion");
        }

    };




    //returns the following table with the movie name, actors and release date and an option to delete movies
    return (
        <div>
            <h1>Delete Movies</h1>


            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Movie Name</th>
                        <th>Actors</th>
                        <th>Release Date</th>
                        <th> </th>
                    </tr>
                </thead>

                <tbody className="text-start">
                    {movies.map((movie, index) => (
                        <tr key={movie.id}>
                            <td>{index + 1}</td>
                            <td>{movie.movieName}</td>
                            <td>{movie.actors}</td>
                            <td>{formatDate(movie.releaseDate)}</td>
                            <td>
                                <button onClick={() => handleDeleteMovie(movie.id)} className="btn btn-outline-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </Table>


            

        </div>

    )
};

export default DeleteMovies

