import * as React from "react";
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';

function DeleteTheatres() {

    // state var for storing the theatres
    const [theatres, setTheatres] = useState([])

    //const [selectedTheatres, setSelectedTheatres] = useState([]);

    //const [isChecked, setIsChecked] = useState(false);

    //method for fetching the theatres details from the db table using the api.
    useEffect(() => {
        fetch('http://localhost:5086/Movies76.Server/Theatres')
            .then(response => response.json())
            .then(data => setTheatres(data))
            .catch(err => console.log(err))
    }, [])

    console.log(theatres);
    


   //function to delete theatres
    const handleDeleteTheatre = (theatreId) => {


        if (confirm("Proceed to delete?") == true) {


            fetch(`http://localhost:5086/Movies76.Server/Theatres/${theatreId}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        alert("Theatre deleted successfully!");
                        window.location.reload();
                    }

                })
                .catch(error => {
                    console.error(`Error deleting theatre with ID ${theatreId}:`, error);
                    alert(`An error occurred while deleting theatre with ID ${theatreId}. Please try again later.`);
                });
        } else {
            console.log("cancelled deletion");
        }

    };




    //returns the following table with the theatre name and location and an option to delete each entry
    return (
        <div>
            <h1>Delete Theatres</h1>


            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Theatre Name</th>
                        <th>Location</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody className="text-start">
                    {theatres.map((theatre, index) => (
                        <tr key={theatre.id}>
                            <td>{index + 1}</td>
                            <td>{theatre.theatreName}</td>
                            <td>{theatre.location}</td>
                            <td>
                                <button onClick={() => handleDeleteTheatre(theatre.id)} className="btn btn-outline-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </Table>




        </div>

    )
};

export default DeleteTheatres

