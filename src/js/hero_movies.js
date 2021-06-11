import moviesList from '../templates/hero_movies.hbs';
import '../sass/main.scss';
import ApiService from './services/apiService';
import { startSpin, stopSpin } from './spinner/spinner';
import { compile } from 'handlebars';

const apiService = new ApiService();
const moviesContainer = document.querySelector('.js-movies-container');

// console.log(moviesContainer);

const renderMoviesList = data => {
  const markup = moviesList(data);
  moviesContainer.insertAdjacentHTML('beforeend', markup);
  const moviesCardVoteEl = document.querySelectorAll('.movies-card-vote');
  moviesCardVoteEl.forEach(classList => {
    classList.classList.add("is-hidden");
  });
};

// console.log(apiService.getTrendingMovies().then(data => data.results));
const trendingFilms = apiService.getTrendingMovies().then(data => data.results);
// console.log(trendingFilms);
// trendingFilms.then(renderMoviesList);

// вставляем жанры и фиксим дату

function addGenrestoTrending() {
  return trendingFilms.then(data => {
    return apiService.getMovieById().then(genresArray => {
      return data.map(film => ({
        ...film,
        release_date: film.release_date.slice(0, 4),
        genres: film.genre_ids.map(id => genresArray.filter(el => el.id === id)).flat(),
      }));
    });
  });
}
// console.log(addGenrestoTrending());
startSpin();
addGenrestoTrending().then(renderMoviesList);
