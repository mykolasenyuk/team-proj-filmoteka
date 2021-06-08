import { getTrendingMovies } from './services/apiService.js';
import moviesList from '../templates/hero_movies.hbs';



const moviesContainer = document.querySelector('.js-movies-container');

console.log(moviesContainer);

const renderMoviesList = data => {
    const markup = moviesList(data);
    moviesContainer.insertAdjacentHTML('beforeend', markup);

};

getTrendingMovies().then(renderMoviesList);