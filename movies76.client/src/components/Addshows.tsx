import * as React from "react";
import { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Container } from "react-bootstrap";
import Autocomplete from "./Autocomplete";

interface IAddShows {
    shows: shows[]
}

const Addshows: React.FC<IAddShows> = ({ addshows }) => {

    //defining state for storing the value of the movie  and theatre suggestions.
    const [movieSuggestions, setMovieSuggestions] = useState([])
    const [theatreSuggestions, setTheatreSuggestions] = useState([])


    //method to fetch the movies from the database for the populating the movieSuggestions
    useEffect(() => {
        fetch('http://localhost:5086/Movies76.Server/Movies')
            .then(response => response.json())
            .then(data => setMovieSuggestions(data))
            .catch(err => console.log(err))
    }, [])

    console.log(movieSuggestions)

    //movieSuggestions is an array of objects. extracting the names of the movies alone
    //and assigning it to the array of strings movieSuggestionsName
    const movieSuggestionsName : string[] = movieSuggestions.map(value => value.movieName);
    console.log(movieSuggestionsName)

    //method to fetch the theatres from the database for the populating the theatreSuggestions
    useEffect(() => {
        fetch('http://localhost:5086/Movies76.Server/Theatres')
            .then(response => response.json())
            .then(data => setTheatreSuggestions(data))
            .catch(err => console.log(err))
    }, [])

    console.log(theatreSuggestions)

    //theatreSuggestions is an array of objects. extracting the names of the theatres alone
    //and assigning it to the array of strings theatreSuggestionsName
    const theatreSuggestionsName: string[] = theatreSuggestions.map(value => value.theatreName);
    console.log(theatreSuggestionsName)
    
    //selectTheatre and selectedMovie holds the current selected theatre or movie name.
    const [selectTheatre, setSelectTheatre] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(''); 

    //method for handling the change in the input fields of theatre and movie names.
    const handleTheatreChange = (value) => {
        setSelectTheatre(value);
    };

    const handleMovieChange = (value) => {
        setSelectedMovie(value); 
    };


    ///////

    const [inputMovieName, setInputMovieName] = useState<string>('');
    const [inputTheatreName, setInputTheatreName] = useState<string>('');
    const [inputShowDate, setInputShowDate] = useState<string>('');
    const [inputTimeSlot, setInputTimeSlot] = useState<string>('');

    const handleInputChangeShowDate =
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputShowDate(e.target.value);
        };

    const handleInputChangeMovieName =
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputMovieName(e.target.value);
        };

    const handleInputChangeTheatreName =
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputTheatreName(e.target.value);
        };

    const handleInputChangeTimeSlot =
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputTimeSlot(e.target.value);
        };


    const SearchEntry = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const showDate: string = inputShowDate ? convertStringToNullableDateTime(inputShowDate) : ' ';

        const jsonData = {
            "showDate": showDate,
            "timeSlot": inputTimeSlot,
            "movie": inputMovieName,
            "theatre": inputTheatreName
        };

        fetch('http://localhost:5086/Movies76.Server/Shows', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData)
        })
            .then(response => {
                if (response.ok) {

                    setInputShowDate('');
                    setInputTimeSlot('');
                    setInputMovieName('');
                    setInputTheatreName('');
                    alert('Show added successfully!');
                } else {

                    alert('Failed to add show. Please try again later.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            });
    }
    


    //the component renders the below elements. Autocomplete component is rendered in the movie and theatre field.
    return (
        <Container fluid>
            <div>
                <h1>Search Shows</h1>
                <Form onSubmit={SearchEntry}>
                    <Form.Group as={Row} className="mb-2" controlId="formPlaintextdate">
                        <Form.Label column sm="3" className="text-end">
                            Date
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" placeholder="DD/MM/YYYY" value={inputShowDate} onChange={handleInputChangeShowDate} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-2" controlId="formPlaintexttime">
                        <Form.Label column sm="3" className="text-end">
                            Time
                        </Form.Label>
                        <Col sm="9">
                            <Form.Select value={inputTimeSlot} onChange={handleInputChangeTimeSlot}>
                                <option>Select time slot</option>
                                <option>10.00 am</option>
                                <option>2.00 pm</option>
                                <option>6.00 pm</option>
                                <option>10.00 pm</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-2" controlId="formPlaintextmov">
                        <Form.Label column sm="3" className="text-end">
                            Movie
                        </Form.Label>
                        <Col sm="9">
                            <Autocomplete suggestions={movieSuggestionsName} onSelect={handleMovieChange} value={inputMovieName} onChange={handleInputChangeMovieName} />
                            
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-2" controlId="formPlaintexttheat">
                        <Form.Label column sm="3" className="text-end">
                            Theatre
                        </Form.Label>
                        <Col sm="9">
                            <Autocomplete suggestions={theatreSuggestionsName} onSelect={handleTheatreChange} value={inputTheatreName} onChange={handleInputChangeTheatreName} />
                        </Col>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Save
                    </Button>

                </Form>
            </div>
        </Container>
    )
};

export default Addshows

//<Form.Control type="text" placeholder="enter movie name" />






