import * as React from "react";
import { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Container } from "react-bootstrap";
import Autocomplete from "./Autocomplete";
import { AutocompleteProvider } from './AutocompleteContext';


interface IAddShows {
    shows: shows[]
}

//Component for adding a new show to the database.

const AddNewShow: React.FC<IAddShows> = ({ addshows }) => {

    //Auto-Complete:

    //defining state for storing the value of the movie  and theatre suggestions.
    const [movieSuggestions, setMovieSuggestions] = useState([])
    const [theatreSuggestions, setTheatreSuggestions] = useState([])

    //getting the data from the movies table in the database.
    //the fetched data is stored in movieSuggestions variable.
    useEffect(() => {
        fetch('http://localhost:5086/Movies76.Server/Movies')
            .then(response => response.json())
            .then(data => setMovieSuggestions(data))
            .catch(err => console.log(err))
    }, [])



    //movieSuggestions is an array of objects. extracting the names of the movies alone
    //and assigning it to the array of strings movieSuggestionsName
    const movieSuggestionsName: string[] = movieSuggestions.map(value => value.movieName);


    //method to fetch the theatres from the database for the populating the theatreSuggestions
    useEffect(() => {
        fetch('http://localhost:5086/Movies76.Server/Theatres')
            .then(response => response.json())
            .then(data => setTheatreSuggestions(data))
            .catch(err => console.log(err))
    }, [])



    //theatreSuggestions is an array of objects. extracting the names of the theatres alone
    //and assigning it to the array of strings theatreSuggestionsName
    const theatreSuggestionsName: string[] = theatreSuggestions.map(value => value.theatreName);


    //selectTheatre and selectedMovie holds the current selected theatre or movie name.
    const [selectTheatre, setSelectTheatre] = useState<string>('');
    const [selectedMovie, setSelectedMovie] = useState<string>('');

    //method for handling the change in the input fields of theatre and movie names.
    /*
    const handleTheatreChange = (value: string) => {
        setSelectTheatre(value);
    };
    */
    /*
    const handleTheatreChange =
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSelectTheatre(e.target.value);
        };
    */
    /*
    const handleMovieChange = (value) => {
        setSelectedMovie(value);
    };
    */
    /////////

    //state variables to hold the list of filtered suggestions based on the input, and the variable to stored the input value.
    const [filteredSuggestionsMovies, setFilteredSuggestionsMovies] = useState<string[]>([]);
    const [filteredSuggestionsTheatres, setFilteredSuggestionsTheatres] = useState<string[]>([]);
    const [inputValueTheatre, setInputValueTheatre] = useState<string>('');

    //change handling function for theatre input field. it gets the input value and is assigned to inputValueTheatre variable.
    const handleChangeTheatre = (event: ChangeEvent<HTMLInputElement>) => {
        const inputVal = event.target.value;
        setInputValueTheatre(inputVal);



        //filters the list of suggestions based on the input value and updates the state with the filtered suggestions
        const filteredSuggestionsTheatres = theatreSuggestionsName.filter(theatreSuggestionsName =>
            theatreSuggestionsName.toLowerCase().includes(inputVal.toLowerCase())
        );
        setFilteredSuggestionsTheatres(filteredSuggestionsTheatres);
    };

    //select handling function to be executed when a suggestion is selected. 
    const handleSelectTheatre = (value: string) => {
        setInputValueTheatre(value);
        //onSelect(value);
        setFilteredSuggestionsTheatres([]);
    };

    //same for movies
    //state variable to store the input value from the movie input field..
    const [inputValueMovie, setInputValueMovie] = useState<string>('');

    //change handling function for movie input field. it gets the input value and is assigned to inputValueMovie variable.
    const handleChangeMovie = (event: ChangeEvent<HTMLInputElement>) => {
        const inputVal = event.target.value;
        setInputValueMovie(inputVal);



        //filters the list of suggestions based on the input value and updates the state with the filtered suggestions
        const filteredSuggestionsMovies = movieSuggestionsName.filter(movieSuggestionsName =>
            movieSuggestionsName.toLowerCase().includes(inputVal.toLowerCase())
        );
        setFilteredSuggestionsMovies(filteredSuggestionsMovies);
    };

    //select handling function to be executed when a suggestion is selected.
    const handleSelectMovie = (value: string) => {
        setInputValueMovie(value);
        //onSelect(value);
        setFilteredSuggestionsMovies([]);

    };
    



    //////////



    //defining state variable for holding the input values of show date, time slot
    //const [inputMovieName, setInputMovieName] = useState<string>('');
    //const [inputTheatreName, setInputTheatreName] = useState<string>('');
    const [inputShowDate, setInputShowDate] = useState<string>('');
    const [inputTimeSlot, setInputTimeSlot] = useState<string>('');


    // change handling functions for all four input fields.
    const handleInputChangeShowDate =
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputShowDate(e.target.value);
        };
    /*
    const handleInputChangeMovieName =
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputMovieName(e.target.value);
        };
    

    const handleInputChangeTheatreName =
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputTheatreName(e.target.value);
        };
    */

    const handleInputChangeTimeSlot =
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputTimeSlot(e.target.value);
        };


    // saveToDb function is called on clicking the save button. It saves the data entered in the input fields to the database.
    const saveToDb = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //showDate variable will hold the formatted date string.
        //convertStringToNullableDateTime function is called for formatting the inputShowDate value, which is in the format DD/MM/YYYY
        // THis will be converted to date as string value in ISO format.
        const showDate: string = inputShowDate ? convertStringToNullableDateTime(inputShowDate) : ' ';

        //jsonData to be added is assigned.
        const jsonData = {
            "showDate": showDate,
            "timeSlot": inputTimeSlot,
            "movie": inputValueMovie,
            "theatre": inputValueTheatre
        };

        // an HTTP POST request to a below endpoint with a JSON payload.
        // if the response is ok, corresponding alert messsage is displayed.
        // the input field is again made empty for the next input.
        // if it is not successful, an alert message is shown.
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
                    setInputValueMovie('');
                    setInputValueTheatre('');
                    alert('Show added successfully!');
                } else {

                    alert('Failed to add show. Please try again later.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            });
    };

    //function to convert the inputShowDate of type string to a nullable DateTime value in string ISO format.
    const convertStringToNullableDateTime = (dateString: string): string | null => {
        const parts = dateString.split('/');
        if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10);
            const year = parseInt(parts[2], 10);
            if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                return new Date(year, month - 1, day + 1).toISOString();
            }
        }
        return null;
    };

    //the component renders the below elements.
    return (
        <Container fluid>
            <div>
                <h1>Add Shows</h1>
                <Form onSubmit={saveToDb}>
                    <Form.Group as={Row} className="mb-2" controlId="formPlaintextdate">
                        <Form.Label column sm="3" className="text-end">
                            Date
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" placeholder="DD/MM/YYYY" required value={inputShowDate} onChange={handleInputChangeShowDate} />
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
                            <Form.Control type="text" placeholder="Enter movie name" required value={inputValueMovie} onChange={handleChangeMovie} />
                            <ul className="autocomplete-suggestions">
                                {filteredSuggestionsMovies.map((suggestion, index) => (
                                    <li key={index} className="autocomplete-suggestion" onClick={() => handleSelectMovie(suggestion)}>
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>

                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-2" controlId="formPlaintexttheat">
                        <Form.Label column sm="3" className="text-end">
                            Theatre
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" placeholder="Enter theatre name" required value={inputValueTheatre} onChange={handleChangeTheatre} />
                            <ul className="autocomplete-suggestions">
                                {filteredSuggestionsTheatres.map((suggestion, index) => (
                                    <li key={index} className="autocomplete-suggestion" onClick={() => handleSelectTheatre(suggestion)}>
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
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

export default AddNewShow



