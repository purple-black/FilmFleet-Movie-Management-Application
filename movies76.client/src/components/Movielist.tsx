import * as React from "react";
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface IMoviesList {
    id: number;
    movieName: string;
    actors: string;
    releaseDate: string;
}

//function listing the movies from the database.
function Movielist() {

    // state var for storing the movies
    const [movies, setMovies] = useState([])

    const _fileuploadPath = "C:\\Users\\aswathy.j\\source\\repos\\Movies76\\FileUpload\\Files";
    const _fileUploadPathOriginal = "src/assets/FileUpload/OriginalPath/";


    //method for fetching the movies details from the db table using the api.
    useEffect(() => {
        fetch('http://localhost:5086/Movies76.Server/Movies')
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(err => console.log(err))
    }, [])

    
    
    // function for formatting the release date.
    //the format of release date is DD/MM/YYYY. The type of ReleaseDate is DateTime in the db and is converted into this format.
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-GB', options).format(date);
    };


    //returns the following table with the movie name, actors and release date.
    return (
        <div>
            <h1>Movies List</h1>

            

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Actors</th>
                        <th>Release Date</th>
                        <th>Thumbnail</th>
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
                                {movie.fileName && (
                                    <img src={`${_fileUploadPathOriginal}/${movie.fileName}`} alt={movie.movieName} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>

            </Table>

        </div>

    )
};

export default Movielist



