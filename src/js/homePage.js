import moviesList from '../templates/hero_movies.hbs';
import ApiService from './services/apiService';
import { renderPagination } from './pagination';

const apiService = new ApiService();

const moviesContainer = document.querySelector('.js-movies-container');

const logo = document.querySelector('.logo');
const homeBtn = document.querySelector('.home-button');
// console.log(apiService.trendingFilms());

function trendingFilms() {
  return apiService
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
}

function clearMarkup() {
  moviesContainer.innerHTML = '';
}

function renderFilmsCard(data) {
  moviesContainer.insertAdjacentHTML('beforeend', moviesList(data));
}

function renderPage() {
  apiService.page = 1;
  trendingFilms().then(renderFilmsCard);
}
renderPage();

function trendingMoviesByPage(page) {
  apiService.pageNum = page;
  //   console.log(apiService.getTrendingMoviesPage());
  return trendingFilms();
}

function moviesByPage(wrapper, page) {
  wrapper.innerHTML = '';
  trendingMoviesByPage(page).then(renderFilmsCard);
}

function trendingFilmsPagination() {
  apiService.getTrendingMovies().then(data => {
    renderPagination(data.total_pages, data.results, moviesByPage);
  });
}
trendingFilmsPagination();

// // logo.addEventListener('click', onLogo);
// // function onLogo(evt) {
// //   evt.preventDefault();
// //   renderMoviesPage();
// // }

// // homeBtn.addEventListener('click', onLogo);

// // console.log(apiService.getTrendingMovies().then(pages => pages.total_pages));
// // console.log(trendingFilms);
// // trendingFilms.then(renderMoviesList);
// // console.log(
// //   apiService.getTrendingMovies().then(data => renderPagination(data.total_pages, data.resulst)),
// // );
// function trendingFilmsPagination() {
//   apiService
//     .getTrendingMovies()
//     .then(data => renderPagination(data.total_pages, data.results, moviesByPage));
// }
// trendingFilmsPagination();

// function moviesByPage(page) {
//   clearMarkup();
//   apiService.getTrendingMoviesPage(page);
//   //   console.log(getMoviesByPage());
// }
// console.log(moviesByPage());

// console.log(trendingFilms());

// console.log(apiService.getTrendingMovies());
