import moviesList from '../templates/hero_movies.hbs';
import ApiService from './services/apiService';
import '../sass/main.scss';
import { renderPagination } from './pagination';
// import { startSpin, stopSpin } from './spinner/spinner';

const apiService = new ApiService();

const moviesContainer = document.querySelector('.js-movies-container');

const logo = document.querySelector('.logo');
const homeBtn = document.querySelector('.home-button');
// console.log(apiService.trendingFilms());

renderPage();
trendingFilmsPagination();

homeBtn.addEventListener('click', onLogo);

logo.addEventListener('click', onLogo);

function onLogo(evt) {
  evt.preventDefault();
  clearMarkup();
  // startSpin();
  renderPage();
  trendingFilmsPagination();
  // stopSpin();
}

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
  trendingFilms()
    .then(renderFilmsCard)
    .catch(error => console.log('eRROR'));
}

function trendingMoviesByPage(page) {
  apiService.pageNum = page;
  //   console.log(apiService.getTrendingMoviesPage());
  return trendingFilms();
}

function moviesByPage(wrapper, page) {
  wrapper.innerHTML = '';
  trendingMoviesByPage(page)
    .then(renderFilmsCard)
    .catch(error => console.log('errr'));
}

function trendingFilmsPagination() {
  apiService.getTrendingMovies().then(data => {
    renderPagination(data.total_pages, data.results, moviesByPage);
  });
}

// console.log(apiService.getTrendingMovies());
