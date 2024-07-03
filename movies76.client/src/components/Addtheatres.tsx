import * as React from "react";
import Header from "./Header";
import { Link } from 'react-router';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useState } from "react";

function Addtheatres() {

    //defining state for storing the value entered in the theatre name and location fields.
    //initialized to empty string.
    const [inputTheatreName, setInputTheatreName] = useState<string>('');
    const [inputLocation, setInputLocation] = useState<string>('');

    //methods for handling the changes in the input fields.
    const handleInputChangeTheatreName =
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputTheatreName(e.target.value);
        };

    const handleInputChangeLocation =
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputLocation(e.target.value);
        };

    
    //method to save the entered data to the database on clicking save button.
    //create json data. call the api for POST for adding the data to the db.
    //if the response is ok, the data will be added to db and an alert message is shown.
    //if an error occurs, it is displayed using alert messages.
    const saveToDb = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const jsonData = {
            "theatreName": inputTheatreName,
            "location": inputLocation,
        };

        fetch('http://localhost:5086/Movies76.Server/Theatres', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData)
        })
            .then(response => {
                if (response.ok) {

                    setInputTheatreName('');
                    setInputLocation('');
                    alert('Theatre added successfully!');
                } else {

                    alert('Failed to add theatrre. Please try again later.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            });
    };


    //the component renders the following elements on the page. It has two fileds theatres and location to enter user input and a save button.
    return (
        
            <div>
                <h1>Add Theatres</h1>
                <Form onSubmit={saveToDb}>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintexttheatrename">
                        <Form.Label column sm="3" className="text-end">
                            Name
                        </Form.Label>
                        <Col sm="9">
                        <Form.Control type="text" placeholder="enter theatre name" required value={inputTheatreName} onChange={handleInputChangeTheatreName} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextlocation">
                        <Form.Label column sm="3" className="text-end">
                            Location
                        </Form.Label>
                        <Col sm="9">
                        <Form.Control type="text" placeholder="enter location" required value={inputLocation} onChange={handleInputChangeLocation} />
                        </Col>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Save
                    </Button>

                </Form>

            </div>
        
    )
};

export default Addtheatres