import movieCardTmpl from '../templates/cardMovie.hbs';
import moviesList from '../templates/hero_movies.hbs';
import ApiService from './services/apiService';
// console.log(moviesList)
const apiService = new ApiService();
const refs = {
  backdropModalImg: document.querySelector('.js-lightbox'),
  btnModalImgClose: document.querySelector('[data-modal-close="closeBtn"]'),
  moviesContainer: document.querySelector('.js-movies-container')
 /*  btnWatchedMovies: document.querySelector('.add_watched'),
btnWillWatchMovie: document.querySelector('.add_queue') */
};
// console.log(refs.backdropModalImg);
// console.log(refs.backdropModalImg.classList.value); //backdrop visually-hidden
refs.backdropModalImg.addEventListener('click', onBackdropModalClose);
refs.moviesContainer.addEventListener('click', onOpenModalFilmCard);
refs.btnModalImgClose.addEventListener('click', onCloseModalByBtn)


// Откритие модалки
// document.querySelector('.movies-card');
// addEventListener('click', onOpenModalFilmCard);

function addOpenLightboxClass() {
  refs.backdropModalImg.classList.add('is-open');
  refs.backdropModalImg.classList.remove('is-hidden');

  if (refs.backdropModalImg.classList.contains("is-open")) {
    window.addEventListener('keydown', closeModalEscape);
  };
}

function onBackdropModalClose(e) {

  if (e.target === refs.backdropModalImg) {
    refs.backdropModalImg.classList.remove('is-open');
    refs.backdropModalImg.classList.add('is-hidden');
  }
  return;
}

function onCloseModalByBtn(e) {
  console.log('sfsa')

  console.log(e.currentTarget)
        console.log(e.target) //это на что мы назначили
         //это на что мы назначили
  // if (e.currentTarget === refs.btnModalImgClose) {
  //     refs.backdropModalImg.classList.remove('is-open');
  //     refs.backdropModalImg.classList.add('is-hidden');
  //   }    
};

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
  // console.log(movieId);
  clearCardList()
  addOpenLightboxClass();
  apiService.getModalMovie(movieId).then(data => renderModal(data));

  
}

const renderModal = data => {
  const modalMarkapMovieCard = movieCardTmpl(data);
  // console.log(modalMarkapMovieCard);
  refs.backdropModalImg.insertAdjacentHTML('beforeend', modalMarkapMovieCard);
};

function clearCardList() {
  refs.backdropModalImg.innerHTML = '';
}




 /* document.querySelector('.add_watched').addEventListener('click', onAddWatchedMovies) ;
 function onAddWatchedMovies() {
   const movieId = Number(e.target.dataset.action);
localStorage.setItem(Watched, movieId)
} 
 */


