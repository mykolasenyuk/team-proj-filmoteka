import moviesList from '../templates/hero_movies.hbs';
import '../sass/main.scss';
import ApiService from './services/apiService';
import { startSpin, stopSpin } from './spinner/spinner';

const apiService = new ApiService();
const moviesContainer = document.querySelector('.js-movies-container');

const renderMoviesList = data => {
  const markup = moviesList(data);
  moviesContainer.insertAdjacentHTML('beforeend', markup);
};
// console.log(apiService.getTrendingMovies().then(data => data.results));
const trendingFilms = apiService
  .getTrendingMovies()
  .then(data => data.results)
  .then(data => {
    // вставляем жанры и фиксим дату
    return apiService.getMovieById().then(genresArray => {
      return data.map(film => ({
        ...film,
        release_date: film.release_date.slice(0, 4),
        genres: film.genre_ids.map(id => genresArray.filter(el => el.id === id)).flat(),
      }));
    });
  });
// console.log(apiService.getTrendingMovies().then(pages => pages.total_pages));
// console.log(trendingFilms);
trendingFilms.then(renderMoviesList);

const btn = document.querySelector('.btn');
btn.addEventListener('click', onPage);
console.log(btn);
const num = Number(btn.textContent);

console.log(num);

function onPage() {
  clearMarkup();
  const trendingFilms = apiService
    .getTrendingMoviesPage(num)
    .then(data => data.results)
    .then(data => {
      // вставляем жанры и фиксим дату
      return apiService.getMovieById().then(genresArray => {
        return data.map(film => ({
          ...film,
          release_date: film.release_date.slice(0, 4),
          genres: film.genre_ids.map(id => genresArray.filter(el => el.id === id)).flat(),
        }));
      });
    });
  trendingFilms.then(renderMoviesList);
  // console.log(trendingFilms);
}
function clearMarkup() {
  moviesContainer.innerHTML = '';
}
onPage();

const totalPages = apiService.getTrendingMovies().then(pages => pages.total_pages);

console.log(to);
