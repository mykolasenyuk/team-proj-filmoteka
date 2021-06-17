import movieCardTmpl from '../templates/cardMovie.hbs';
import moviesList from '../templates/hero_movies.hbs';
import ApiService from './services/apiService';
import Storage from './services/localStorage';
const storage = new Storage();

const apiService = new ApiService();
const refs = {
  backdropModalImg: document.querySelector('.js-lightbox'),
  // btnModalImgClose: document.querySelector('[data-modal-close="closeBtn"]'),
  moviesContainer: document.querySelector('.js-movies-container'),
  // btnWatchedMovies: document.querySelector('.add_watched'),
  // btnWillWatchMovie: document.querySelector('.add_queue'),
};

refs.backdropModalImg.addEventListener('click', onBackdropModalClose);
refs.moviesContainer.addEventListener('click', onOpenModalFilmCard);

function addOpenLightboxClass() {
  refs.backdropModalImg.classList.add('is-open');
  refs.backdropModalImg.classList.remove('is-hidden');

  if (refs.backdropModalImg.classList.contains('is-open')) {
    window.addEventListener('keydown', closeModalEscape);
  }
}

function onBackdropModalClose(e) {
  if (e.target === refs.backdropModalImg) {
    onStopScroll();
    refs.backdropModalImg.classList.remove('is-open');
    refs.backdropModalImg.classList.add('is-hidden');
  }
  return;
}

window.addEventListener('click', onCloseModalByBtn);

function onCloseModalByBtn(e) {
  if (e.target.classList.contains('button__close')) {
    onStopScroll();
    refs.backdropModalImg.classList.remove('is-open');
    refs.backdropModalImg.classList.add('is-hidden');
  }
}

function closeModalEscape(e) {
  if (e.code === 'Escape') {
    onStopScroll();
    refs.backdropModalImg.classList.remove('is-open');
    refs.backdropModalImg.classList.add('is-hidden');
  }
  return;
}

function onOpenModalFilmCard(e) {
  e.preventDefault();
  onAddScroll();
  // setLocalStorage();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const movieId = Number(e.target.dataset.action);
  // console.log(movieId);
  clearCardList();
  addOpenLightboxClass();
  apiService
    .getModalMovie(movieId)
    .then(data => ({
      ...data,
      popularity: data.popularity.toFixed(1),
    }))
    .then(data => renderModal(data));
}

// stop scroll
function onStopScroll() {
  document.body.classList.remove('stop-scrolling');
}

function onAddScroll() {
  document.body.classList.add('stop-scrolling');
}

function clearCardList() {
  refs.backdropModalImg.innerHTML = '';
}
const renderModal = data => {
  data = storage.setMovieFlags(data);
  const modalMarkapMovieCard = movieCardTmpl(data);
  // console.log(modalMarkapMovieCard);
  refs.backdropModalImg.insertAdjacentHTML('beforeend', modalMarkapMovieCard);
  document.querySelector('.add_queue').addEventListener('click', event => {
    storage.addQueue(data);
    event.target.classList.toggle('queued');
  });
  document.querySelector('.add_watched').addEventListener('click', () => {
    storage.addWatched(data);
    event.target.classList.toggle('watched');
  });
};
