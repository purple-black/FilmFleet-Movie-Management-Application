import * as React from "react";
import Header from './Header';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import axios from 'axios';

interface IAddMovies {
}



const Addmovies: React.FC<IAddMovies> = () => {

    //Define state for storing the value of the input field for movie name.
    //all three variables initialized with empty string.
    //setInputMovieName,setInputActors, setInputReleaseDate as the function to update its value.
    const [inputMovieName, setInputMovieName] = useState<string>('');
    const [inputActors, setInputActors] = useState<string>('');
    const [inputReleaseDate, setInputReleaseDate] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);

    const [fileName, setFileName] = useState('');

    //functions to handle the changes in the corresponding input fields.
    const handleInputChangeReleaseDate =
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputReleaseDate(e.target.value);
        };

    const handleInputChangeMovieName =
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputMovieName(e.target.value);
        };

    const handleInputChangeActors =
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputActors(e.target.value);
        };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };
    

    // saveToDb function is called on clicking the save button. It saves the data entered in the input fields to the database.
    const saveToDb = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // releaseDate variable will hold the formatted value of the release date.
        //takes inputReleaseDate as its argument and value of nullable DateTime type is stored in the variable.
        const releaseDate: string | null = inputReleaseDate ? convertStringToNullableDateTime(inputReleaseDate) : null;

        //jsonData to be added is assigned.
        const jsonData = {
            "movieName": inputMovieName,
            "actors": inputActors,
            "releaseDate": releaseDate,
            "FileName": file.name

        };

        // an HTTP POST request to a below endpoint with a JSON payload.
        // if the response is ok, corresponding alert messsage is displayed.
        // the input field is again made empty for the next input.
        // if it is not successful, an alert message is shown.
        fetch('http://localhost:5086/Movies76.Server/Movies', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData)
        })
            .then(response => {
                if (response.ok) {
                    
                    setInputMovieName('');
                    setInputActors('');
                    setInputReleaseDate('');
                    alert('Movie added successfully!');
                } else {
                    
                    alert('Failed to add movie. Please try again later.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            });
    };


    //function to convert the inputReleaseDate of type string to a nullable DateTime value.
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

    const UploadFileOnSubmit = async (event) => {
        event.preventDefault();
        console.log(file);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5086/Movies76.Server/Movies', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

   

    // The component renders the following elements on the page.
    // the saveToDb function is called on clicking the form submit button. 
    // An on change handling functions are added to the input fields - Name, Actors and ReleaseDate.
    return (
        
            <div>
                <h1>Add Movies</h1>
                <Form onSubmit={saveToDb}>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextname">
                        <Form.Label column sm="3" className="text-end">
                            Name
                        </Form.Label>
                        <Col sm="9">
                        <Form.Control type="text" placeholder="enter movie name" required value={inputMovieName} onChange={handleInputChangeMovieName} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextactors">
                        <Form.Label column sm="3" className="text-end">
                            Actors
                        </Form.Label>
                        <Col sm="9">
                        <Form.Control type="text" placeholder="enter actors name" required value={inputActors} onChange={handleInputChangeActors} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextdate">
                        <Form.Label column sm="3" className="text-end">
                            Release Date
                        </Form.Label>
                        <Col sm="9">
                        <Form.Control type="text" placeholder="DD/MM/YYYY" value={inputReleaseDate} onChange={handleInputChangeReleaseDate} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formFile">
                        <Form.Label column sm="3" className="text-end">
                            Add Movie Thumbnail
                        </Form.Label>
                        <Col sm="9">
                        <Form.Control type="file" onChange={handleFileChange} />
                        </Col>
                    </Form.Group>

                    <Button variant="primary" type="button" style={{ margin: "10px" }} onClick={UploadFileOnSubmit}>
                        Upload File
                    </Button>
                    

                    <Button variant="primary" type="submit">
                        Save
                    </Button>

                </Form>

            

            </div>
        
    )
};

export default Addmovies





