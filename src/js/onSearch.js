import moviesList from '../templates/hero_movies.hbs';
import ApiService from './services/apiService';
import { renderPagination } from './pagination';
const apiService = new ApiService();

const refs = {
  searchInput: document.querySelector('.search__input-wrapper'),
  filmsMarkup: document.querySelector('.js-movies-container'),
};

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

refs.searchInput.addEventListener('submit', onSearch);

// console.log(searchingFilms());

function onSearch(e) {
  clearMarkup();
  apiService.pageNum = 1;
  e.preventDefault();
  apiService.query = e.currentTarget.elements.query.value;
  if (apiService.query === '') {
    console.log('Enter valid name');
    return;
  }
  renderSearchMovies(apiService.query);

  searchingFilmPagin(apiService.query);
  e.currentTarget.elements.query.value = '';
}

function renderSearchMovies(searchQuery) {
  apiService.query = searchQuery;
  searchingFilms().then(renderFilmsCard);
}

function searchMoviesByPage(wrapper, page, searchQuery) {
  wrapper.innerHTML = '';
  searchingFilmsByPage(page, searchQuery).then(renderFilmsCard);
}

function searchingFilmPagin(searchQuery) {
  apiService.query = searchQuery;

  apiService
    .getMovieByQuery()
    .then(data => {
      renderPagination(data.total_pages, data.results, searchMoviesByPage, searchQuery);
      if (data.total_pages === 0) {
        console.log('searching Error');
        return;
      }
    })
    .catch(err => console.log('eror on searchingPagination'));
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
