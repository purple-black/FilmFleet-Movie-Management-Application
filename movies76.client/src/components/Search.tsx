import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import * as React from "react";
import { InputGroup, FormControl, Button, FormSelect } from 'react-bootstrap';
import { useState, useEffect, createElement } from 'react';
import Table from 'react-bootstrap/Table';
import { renderIntoDocument } from 'react-dom/test-utils';
import { createRoot } from 'react-dom/client';
import ReactDOM, { render } from 'react-dom';
import ListFilteredShows from './listFilteredShows';
//import "./Search.css";





function getDate(num) {
    const today = new Date();
    let month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = (today.getDate(num)) + num;
    
    if (month < 10) {
        return `${date}/0${month}/${year}`;
    }
    return `${date}/${month}/${year}`;
}


// function for the implemetation of the search bar
function Search() {

    const _fileUploadPathOriginal = "src/assets/FileUpload/OriginalPath/";

    const [currentDateplus2, setCurrentDateplus2] = useState(getDate(2));
    const [currentDateplus3, setCurrentDateplus3] = useState(getDate(3));
    const [currentDateplus4, setCurrentDateplus4] = useState(getDate(4));

    // to store input from user
    const [inputSearch, setInputSearch] = useState<string>('');
    const [inputDate, setInputDate] = useState<string>('');

    //to store fetched data
    const [fetchData, setFetchData] = useState<string>('');
    let [finalList, setFinalList] = useState<SearchShow[]>([]);

    const handleInputChangeSearch =
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputSearch(e.target.value);
        };

    const handleInputChangeDate =
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputDate(e.target.value);
        };
    console.log("day:", inputDate);
    
    if (inputDate == 'Today') {
        setInputDate(getDate(0));
    }
    else if (inputDate == 'Tomorrow') {
        setInputDate(getDate(1));
    }

    useEffect(() => {
        fetch('http://localhost:5086/Movies76.Server/Shows')
            .then(response => response.json())
            .then(data => setFetchData(data))
            .catch(err => console.log(err))
    }, [])

    

    const SearchShow = (e: React.EventHandler<HTMLElement>) => {
        e.preventDefault();

        const formatDate = (dateString) => {
            const options = { day: '2-digit', month: 'short', year: 'numeric' };
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('en-GB', options).format(date);
        };

        const DateTimeToString = (dateTime: string): string => {
            const year: string = dateTime.substring(0, 4);
            const month = dateTime.substring(5, 7);
            const date = dateTime.substring(8, 10);
            return `${date}/${month}/${year}`;
        };

        const removeDuplicates = (arr) => {
            return arr.filter((item,
                index) => arr.indexOf(item) === index);
        };

        console.log(inputDate);
        console.log(fetchData.filter(obj => obj.movie.toLowerCase().includes(inputSearch.toLowerCase())))
        
        const filteredArrayMovie = fetchData.filter(obj => obj.movie.toLowerCase().includes(inputSearch.toLowerCase()) && (inputDate == 'Any day' || DateTimeToString(obj.showDate) == inputDate));
        const filteredArrayTheatre = fetchData.filter(obj => obj.theatre.toLowerCase().includes(inputSearch.toLowerCase()) && (inputDate == 'Any day' || DateTimeToString(obj.showDate) == inputDate));
        const filteredArrayTimeSlot = fetchData.filter(obj => obj.timeSlot.toLowerCase().includes(inputSearch.toLowerCase()) && (inputDate == 'Any day' || DateTimeToString(obj.showDate) == inputDate));
        console.log(filteredArrayMovie.concat(filteredArrayTheatre))

        const container = document.getElementById('filterTable');   
        const root = createRoot(container);

        if (filteredArrayMovie.length === 0 && filteredArrayTheatre.length === 0 && filteredArrayTimeSlot.length === 0) {
            root.render(
                <div style={{ padding: '30px', textAlign: 'center' }}>
                    <h3>Oops! No Shows Available!</h3>
                </div>
            );
        }
        else {
            if (filteredArrayMovie.length != 0 || filteredArrayTheatre.length != 0 || filteredArrayTimeSlot.length != 0) {
                const list1 = filteredArrayMovie.concat(filteredArrayTheatre, filteredArrayTimeSlot);
                //console.log(finalList)
                finalList = removeDuplicates(list1);
                console.log(finalList);
                //console.log()
            }
            
            else {
                console.log("NA");
            }

            
            root.render(
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Show Date</th>
                                <th>Time Slot</th>
                                <th>Movie</th>
                                <th>Theatre</th>
                                <th>Thumbnail</th>
                            </tr>
                        </thead>

                        <tbody>
                            {finalList.map((finalList, index) => (
                                <tr key={finalList.id}>
                                    <td>{index + 1}</td>
                                    <td>{formatDate(finalList.showDate)}</td>
                                    <td style={{ textAlign: 'right' }}>{finalList.timeSlot}</td>
                                    <td>{finalList.movie}</td>
                                    <td>{finalList.theatre}</td>
                                    <td>
                                        {finalList.fileName && (
                                            <img src={`${_fileUploadPathOriginal}/${finalList.fileName}`} alt={finalList.movieName} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </Table>
                </div>
            );
            

        }

    }
    

    return (
        <>
            <Container fluid className="d-flex justify-content-center align-items-center vh-90">
                <div>
                    <h2>Search Movies, Theatres, Shows</h2>
                    <InputGroup style={{ width: '500px' }}>
                        <FormControl placeholder="Search" aria-label="Search" aria-describedby="search-addon" value={inputSearch} onChange={handleInputChangeSearch} />
                        <FormSelect onChange={handleInputChangeDate}>
                            <option value={inputDate}>Select day</option>
                            <option>Any day</option>
                            <option>Today</option>
                            <option>Tomorrow</option>
                            <option>{currentDateplus2}</option>
                            <option>{currentDateplus3}</option>
                            <option>{currentDateplus4}</option>
                        </FormSelect>
                        <Button variant="outline-primary" data-mdb-ripple-init onClick={SearchShow}>Search</Button>
                    </InputGroup>
                    <div id="filterTable" className="text-start"></div>
                </div>
                
            </Container>

        </>
    );
}

export default Search

//let filteredArray = array.filter(obj => obj.name === 'Alice');
//console.log(filteredArray);
//<td>{formatDate(movie.releaseDate)}</td>

//&& formatDate(obj.showDate) == inputDate

//<Button variant="outline-primary" data-mdb-ripple-init onClick={SearchShow}>Search</Button>

//


