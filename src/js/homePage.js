import moviesList from '../templates/hero_movies.hbs';
import ApiService from './services/apiService';
import { renderPagination } from './pagination';

const apiService = new ApiService();
const moviesContainer = document.querySelector('.js-movies-container');
const logo = document.querySelector('.logo');
const homeBtn = document.querySelector('.home-button');
// console.log(logo);

function clearMarkup() {
  moviesContainer.innerHTML = '';
}

const renderMoviesList = data => {
  const markup = moviesList(data);
  moviesContainer.insertAdjacentHTML('beforeend', markup);
};

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

function renderMoviesPage() {
  clearMarkup();
  apiService.page = 1;
  trendingFilms.then(renderMoviesList).catch(error => console.log('error'));
}
renderMoviesPage();

// logo.addEventListener('click', onLogo);
// function onLogo(evt) {
//   evt.preventDefault();
//   renderMoviesPage();
// }

// homeBtn.addEventListener('click', onLogo);

// console.log(apiService.getTrendingMovies().then(pages => pages.total_pages));
// console.log(trendingFilms);
// trendingFilms.then(renderMoviesList);
// console.log(
//   apiService.getTrendingMovies().then(data => renderPagination(data.total_pages, data.resulst)),
// );
function trendingFilmsPagination() {
  apiService.getTrendingMovies().then(data => renderPagination);
}
trendingFilmsPagination();
console.log(apiService.getTrendingMovies().then(data => renderPagination(data.total_pages)));
// function getMoviesByPage(page) {
//   apiService.page = page;
//   //   console.log(apiService.getTrendingMoviesPage());
//   //   return trendingFilms;
// }
// console.log(getMoviesByPage());

// console.log(moviesByPage());

const btn = document.querySelector('.pagenumbers');
btn.addEventListener('click', numbers);
console.log(btn);
const num = Number(btn.textContent);
const numPage = num + 1;
console.log(numPage);

function numbers() {
  apiService.getTrendingMoviesPage(numPage);
}
function moviesByPage() {
  clearMarkup();
  apiService.getTrendingMoviesPage(numPage);
  //   console.log(getMoviesByPage());
}
moviesByPage();
