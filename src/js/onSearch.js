import moviesList from '../templates/hero_movies.hbs';
import '../sass/main.scss';
import ApiService from './services/apiService';

const apiService = new ApiService();
const refs = {
  searchInput: document.querySelector('.search__input-wrapper'),
  filmsMarkup: document.querySelector('.js-movies-container'),
};

// console.log(refs.searchInput);
// console.log(refs.filmsMarkup);

function clearMarkup() {
  refs.filmsMarkup.innerHTML = '';
}

const renderSearchMoviesList = data => {
  const markup = moviesList(data);
  refs.filmsMarkup.insertAdjacentHTML('beforeend', markup);
};

refs.searchInput.addEventListener('submit', onFilmSearch);

// const searchedFilms = apiService.getMovieByQuery();
// console.log(searchedFilms);
function onFilmSearch(e) {
  e.preventDefault();
  clearMarkup();

  apiService.query = e.currentTarget.elements.query.value;
  //   console.log(e.currentTarget.elements.query.value);
  const result = apiService.getMovieByQuery(apiService.searchQuery);
  //   renderSearchMoviesList(result).then(data => data.results);
  apiService.getMovieByQuery(apiService.searchQuery);

  const searchingFilms = apiService
    .getMovieByQuery(apiService.searchQuery)
    .then(data => data.results);

  // вставляем жанры и фиксим дату

  function addGenrestoSearching() {
    return searchingFilms.then(data => {
      return apiService.getMovieById().then(genresArray => {
        return data.map(film => ({
          ...film,
          release_date: film.release_date.slice(0, 4),
          genres: film.genre_ids.map(id => genresArray.filter(el => el.id === id)).flat(),
        }));
      });
    });
  }
  addGenrestoSearching().then(renderSearchMoviesList);
  apiService.incrementPage();
}
