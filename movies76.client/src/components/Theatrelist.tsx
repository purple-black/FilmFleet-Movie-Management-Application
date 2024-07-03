import * as React from "react";
import Header from './Header';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';

interface ITheatreList {
    
}

//function listing the theatres from the database.
function Theatrelist() {

    // state var for storing the theatres
    const [theatres, setTheatres] = useState([])

    //const [selectedTheatres, setSelectedTheatres] = useState([]);

    //method for fetching the theatre details from the db table using the api.
    useEffect(() => {
        fetch('http://localhost:5086/Movies76.Server/Theatres')
            .then(response => response.json())
            .then(data => setTheatres(data))
            .catch(err => console.log(err))
    }, [])

    //returns the follwoing table with the theatre names, location.
    return (
        <div>
            <h1>Theatres List</h1>


            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Location</th>
                    </tr>
                </thead>

                <tbody className="text-start">
                    {theatres.map((theatre, index) => (
                        <tr key={theatre.id}>
                            <td>{index + 1}</td>
                            <td>{theatre.theatreName}</td>
                            <td>{theatre.location}</td>
                        </tr>
                    ))}
                </tbody>

            </Table>

        </div>

    )
};

export default Theatrelist

