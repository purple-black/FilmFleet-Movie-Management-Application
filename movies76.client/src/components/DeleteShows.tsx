import * as React from "react";
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';

function DeleteShows() {

    // state var for storing the shows
    const [shows, setShows] = useState([])

    const [selectedShows, setSelectedShows] = useState([]);

    const [isChecked, setIsChecked] = useState(false);

    //method for fetching the movies details from the db table using the api.
    useEffect(() => {
        fetch('http://localhost:5086/Movies76.Server/Shows')
            .then(response => response.json())
            .then(data => setShows(data))
            .catch(err => console.log(err))
    }, [])

    console.log(shows);
    // function for formatting the show date.
    //the format of release date is DD/MM/YYYY. The type of ReleaseDate is DateTime in the db and is converted into this format.
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-GB', options).format(date);
    };

    
    //console.log("selected shows: ", { selectedShows })

    const handleDeleteShow = (showId) => {
        //console.log("hi");

        
        if (confirm("Proceed to delete?") == true) {
            

            fetch(`http://localhost:5086/Movies76.Server/Shows/${showId}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        alert("Show deleted successfully!");
                        window.location.reload();
                    }

                })
                .catch(error => {
                    console.error(`Error deleting show with ID ${showId}:`, error);
                    alert(`An error occurred while deleting show with ID ${showId}. Please try again later.`);
                });
        } else {
            console.log("cancelled deletion");
        }

    }
    
    


    //returns the following table with the show date, time slot, movie and theatre name and also an option to delete each entry
    return (
        <div>
            <h1>Delete Shows</h1>


            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ShowDate</th>
                        <th>TimeSlot</th>
                        <th>Movie</th>
                        <th>Theatre</th>
                        <th> </th>
                    </tr>
                </thead>

                <tbody className="text-start">
                    {shows.map((show, index) => (
                        <tr key={show.id}>
                            <td>{index + 1}</td>
                            <td>{formatDate(show.showDate)}</td>
                            <td style={{ textAlign: 'right' }}>{show.timeSlot}</td>
                            <td>{show.movie}</td>
                            <td>{show.theatre}</td>
                            <td>
                                <button onClick={() => handleDeleteShow(show.id)} className="btn btn-outline-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </Table>

           

        </div>

    )
};

export default DeleteShows

