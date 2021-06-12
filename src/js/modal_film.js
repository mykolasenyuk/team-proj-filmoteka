import movieCardTmpl from '../templates/cardMovie.hbs';
import moviesList from '../templates/hero_movies.hbs';
import ApiService from './services/apiService';
// console.log(moviesList)
const apiService = new ApiService();
const refs = {
  backdropModalImg: document.querySelector('.backdrop'),
  btnModalImgClose: document.querySelector('.button__close'),
};
// console.log(refs.backdropModalImg);
// console.log(refs.backdropModalImg.classList.value); //backdrop visually-hidden
refs.backdropModalImg.addEventListener('click', onBackdropModalClose);
addEventListener('click', onBtnModalClose);

// Откритие модалки
// document.querySelector('.movies-card');
addEventListener('click', onOpenModalFilmCard);
function addOpenLightboxClass() {
  refs.backdropModalImg.classList.add('is-open');
  refs.backdropModalImg.classList.remove('is-hidden');
}

function onBackdropModalClose(e) {
  if (e.target.classList.value === 'backdrop') {
    refs.backdropModalImg.classList.remove('is-open');
    refs.backdropModalImg.classList.add('is-hidden');
    console.log(e.target.classList.value);
  }
  return;
}

function onBtnModalClose(e) {
  refs.backdropModalImg.classList.remove('is-open');
  refs.backdropModalImg.classList.add('is-hidden');
  // console.log(e.target);
}

window.addEventListener('keydown', closeModalEscape);

function closeModalEscape(e) {
  if (e.code === 'Escape') {
    refs.backdropModalImg.classList.remove('is-open');
    refs.backdropModalImg.classList.add('is-hidden');
  }
  return;
}

function onOpenModalFilmCard(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const movieId = Number(e.target.dataset.action);
  console.log(movieId);
  clearCardList()
  addOpenLightboxClass();
  apiService.getModalMovie(movieId).then(data => renderModal(data));
}

const renderModal = data => {
  const modalMarkapMovieCard = movieCardTmpl(data);
  console.log(modalMarkapMovieCard);
  refs.backdropModalImg.insertAdjacentHTML('beforeend', modalMarkapMovieCard);
};

function clearCardList() {
  refs.backdropModalImg.innerHTML = '';
}
