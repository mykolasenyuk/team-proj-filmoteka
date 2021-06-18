import moviesList from '../templates/hero_movies.hbs';
import ApiService from './services/apiService';
import { renderPagination } from './pagination';
import '../sass/main.scss';
import Noty from 'noty';
import refs from './refs/refs';

const apiService = new ApiService();
const moviesContainer = document.querySelector('.js-movies-container');


setLocalStorage();
renderPage();
trendingFilmsPagination();

refs.homeBtn.addEventListener('click', onLogo);
refs.logo.addEventListener('click', onLogo);

function onLogo(evt) {
  clearMarkup();
  renderPage();
  trendingFilmsPagination();
}

// local storage
function setLocalStorage() {
  const getLocalStorageWatched = localStorage.getItem('watched');
  const getLocalStorageQueue = localStorage.getItem('queue');
  if (getLocalStorageWatched && getLocalStorageQueue !== null) {
    return;
  } else {
    localStorage.setItem('watched', JSON.stringify({}));
    localStorage.setItem('queue', JSON.stringify({}));
  }
}

export function trendingFilms() {
  return apiService
    .getTrendingMovies()
    .then(data => data.results)
    .then(data => {
      // fixs data and genres
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
}

export function renderPage() {
  apiService.page = 1;
  trendingFilms()
    .then(renderFilmsCard)
    .catch(error => {
      console.log('error in renderPage');
      new Noty({
        theme: 'sunset',
        layout: 'topRight',
        type: 'error',
        text: 'Something went wrong!',
        timeout: 3500,
      }).show();
    });
}

function trendingMoviesByPage(page) {
  apiService.pageNum = page;
  return trendingFilms();
}

function moviesByPage(wrapper, page) {
  wrapper.innerHTML = '';
  trendingMoviesByPage(page)
    .then(renderFilmsCard)
    .catch(error => {
      console.log(`Error in moviesByPage`);
      new Noty({
        theme: 'sunset',
        layout: 'topRight',
        type: 'error',
        text: 'Something went wrong!',
        timeout: 3500,
      }).show();
    });
}

export function trendingFilmsPagination() {
  apiService
    .getTrendingMovies()
    .then(data => {
      renderPagination(data.total_pages, data.results, moviesByPage);
    })
    .catch(error => {
      console.log(`Error in trendingFilmsPagination`);
      new Noty({
        theme: 'sunset',
        layout: 'topRight',
        type: 'error',
        text: 'Something went wrong!',
        timeout: 3500,
      }).show();
    });
}


// Создает функцию для пагинации стрелки (nextPage)
// window.addEventListener('click', nextPagePagination);
// function nextPagePagination(e) {
//   if (e.target.classList.contains('btn__pagination__next')) {
//     document.querySelector('.arrow_right').click();
//     onStopScroll()
//   }
// };
// function onStopScroll() {
//   document.body.classList.remove('stop-scrolling')
// };

