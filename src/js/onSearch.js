import moviesList from '../templates/hero_movies.hbs';
import ApiService from './services/apiService';
import refs from './refs/refs';
import { renderPagination } from './pagination';
import { startSpin, stopSpin } from './spinner/spinner';
import * as renderHero from './hero_movies';
const apiService = new ApiService();
import Noty from 'noty';

function searchingFilms() {
  return apiService
    .getMovieByQuery()
    .then(data => data.results)
    .then(data => {
      return apiService.getMovieById().then(genresArray => {
        return data.map(film => ({
          ...film,
          release_date: film.release_date.slice(0, 4),
          genres: film.genre_ids.map(id => genresArray.filter(el => el.id === id)).flat(),
        }));
      });
    });
}

refs.searchWrap.addEventListener('submit', onSearch);

function onSearch(e) {
  clearMarkup();
  startSpin();
  apiService.pageNum = 1;
  e.preventDefault();
  apiService.query = e.currentTarget.elements.query.value;
  if (apiService.query === '') {
    stopSpin();
    new Noty({
      theme: 'sunset',
      layout: 'topRight',
      type: 'error',
      text: `😬 Please enter valid name!`,
      timeout: 3500,
    }).show();

    renderPage();
    renderHero.trendingFilmsPagination();

    return;
  } else {
    renderSearchMovies(apiService.query);
    searchingFilmPagin(apiService.query);
    e.currentTarget.elements.query.value = '';
    return;
  }
}

function renderSearchMovies(searchQuery) {
  apiService.query = searchQuery;
  searchingFilms()
    .then(renderFilmsCard)
    .catch(error => {
      console.log('error in renderSearchMovies');
      new Noty({
        theme: 'sunset',
        layout: 'topRight',
        type: 'error',
        text: 'Something went wrong!',
        timeout: 3500,
      }).show();
    });
}

function searchMoviesByPage(wrapper, page, searchQuery) {
  wrapper.innerHTML = '';
  searchingFilmsByPage(page, searchQuery)
    .then(renderFilmsCard)
    .catch(error => {
      console.log('error in searchMoviesByPage');
      new Noty({
        theme: 'sunset',
        layout: 'topRight',
        type: 'error',
        text: 'Something went wrong!',
        timeout: 3500,
      }).show();
    });
}

// render page when search is not valid
function renderPage() {
  apiService.page = 1;
  renderHero
    .trendingFilms()
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

function searchingFilmPagin(searchQuery) {
  apiService.query = searchQuery;

  apiService
    .getMovieByQuery()
    .then(data => {
      renderPagination(data.total_pages, data.results, searchMoviesByPage, searchQuery);
      if (data.total_pages === 0) {
        stopSpin();
        new Noty({
          theme: 'sunset',
          layout: 'topRight',
          type: 'error',
          text: `🧐 Sorry. We did not find any results from your search. Please,try again.`,
          timeout: 3500,
        }).show();

        renderPage();
        renderHero.trendingFilmsPagination();
        return;
      }
      new Noty({
        theme: 'sunset',
        layout: 'topRight',
        type: 'success',
        text: `🥳 ${data.total_results} Movies finded!`,
        timeout: 3500,
      }).show();
    })
    .catch(error => {
      console.log('error in searchingFilmPagin');
      noty.show();
      noty.setType('error');
      noty.setText('Something went wrong!');
      noty.setTimeout(4000);
    });
}

function clearMarkup() {
  refs.filmsMarkup.innerHTML = '';
}

function renderFilmsCard(data) {
  clearMarkup();
  refs.filmsMarkup.insertAdjacentHTML('beforeend', moviesList(data));
}

function searchingFilmsByPage(page, searchQuery) {
  apiService.pageNum = page;
  apiService.query = searchQuery;
  return searchingFilms();
}
