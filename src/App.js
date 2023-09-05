import {useEffect, useState} from 'react';

import MovieCard from './MovieCard.jsx';
import SearchIcon from './search.svg';
import './App.css';

//5ec0a09a

const API_URL = 'http://www.omdbapi.com?apikey=5ec0a09a';  //using external api to get the movies data

const App=() => {

  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    searchMovies("Spiderman");
 }, []);

  const searchMovies = async(title) => {
     const response = await fetch(`${API_URL}&s=${title}`);  //this is gonna call the api
     const data = await response.json();  //once we get the response, we need to get the data

     setMovies(data.Search);  //allows us to populate movies
  }; // function to fetch data. async means it's gonna take some time to fetch data
  

  return (
    <div className="app">
      <h1>MovieVerse</h1>

      <div className="search">
        <input 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />

          <img
            src={SearchIcon}
            alt="search"
            onClick = {() => searchMovies(searchTerm)}
          />
      </div>
        {
          movies?.length>0 // ? is the optional chaining operator used to safely access the length 
          ?(
            <div className="container">
              {movies.map((movie) => (
                <MovieCard movie = {movie}/> 
              ))} 
            </div>
          ): (
            <div className="empty">
              <h2>No Movies Found</h2>
            </div>
          )}
 
    </div>
  );
};

export default App;
