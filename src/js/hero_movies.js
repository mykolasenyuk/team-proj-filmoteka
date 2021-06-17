import moviesList from '../templates/hero_movies.hbs';
import ApiService from './services/apiService';
import { renderPagination } from './pagination';
import { startSpin, stopSpin } from './spinner/spinner';
import '../sass/main.scss';
import Storage from './services/localStorage';
const storage = new Storage();

const apiService = new ApiService();

const moviesContainer = document.querySelector('.js-movies-container');

const logo = document.querySelector('.logo');
const homeBtn = document.querySelector('.home-button');
setLocalStorage();
// console.log(apiService.trendingFilms());
renderPage();
trendingFilmsPagination();
// stopSpin();
homeBtn.addEventListener('click', onLogo);

logo.addEventListener('click', onLogo);

function onLogo(evt) {
  clearMarkup();
  evt.preventDefault();
  renderPage();
  trendingFilmsPagination();
  // stopSpin();
}

// local starage
function setLocalStorage() {
  const getLocalStorageWatched = localStorage.getItem('watched');
  const getLocalStorageQueue = localStorage.getItem('queue');
  if (getLocalStorageWatched && getLocalStorageQueue !== null) {
    console.log('Не пустий');
    return;
  } else {
    console.log('Пустий');
    localStorage.setItem('watched', JSON.stringify({}));
    localStorage.setItem('queue', JSON.stringify({}));
  }
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
  const moviesCardVoteEl = document.querySelectorAll('.movies-card-vote');
  moviesCardVoteEl.forEach(classList => {
    classList.classList.add('is-hidden');
  });

  stopSpin();
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
