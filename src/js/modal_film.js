import movieCardTmpl from '../templates/cardMovie.hbs';
import ApiService from './services/apiService';
import Storage from './services/localStorage';
import Noty from 'noty';
const storage = new Storage();

const apiService = new ApiService();
const refs = {
  backdropModalImg: document.querySelector('.js-lightbox'),
  moviesContainer: document.querySelector('.js-movies-container'),
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

  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const movieId = Number(e.target.dataset.action);

  clearCardList();
  addOpenLightboxClass();
  apiService
    .getModalMovie(movieId)
    .then(data => ({
      ...data,
      popularity: data.popularity.toFixed(1),
    }))
    .then(data => renderModal(data));
  // if (document.querySelector('.add_watched').classList.contains('watched')) {
  //   document.querySelector('.add_watched').textContent = 'REMOVE';
  // }
}

// stop scroll
function onStopScroll() {
  document.body.classList.remove('stop-scrolling');
}

function onAddScroll() {
  document.body.classList.add('stop-scrolling');
}
// checks class of btns
function checkClassBtns() {
  if (document.querySelector('.add_watched').classList.contains('watched')) {
    document.querySelector('.add_watched').textContent = 'REMOVE';
  } else {
    document.querySelector('.add_watched').textContent = 'ADD TO WATCHED';
  }

  if (document.querySelector('.add_queue').classList.contains('queued')) {
    document.querySelector('.add_queue').textContent = 'REMOVE';
  } else {
    document.querySelector('.add_queue').textContent = 'ADD TO QUEUE';
  }
}

function clearCardList() {
  refs.backdropModalImg.innerHTML = '';
}
const renderModal = data => {
  data = storage.setMovieFlags(data);
  const modalMarkapMovieCard = movieCardTmpl(data);
  // console.log(modalMarkapMovieCard);

  refs.backdropModalImg.insertAdjacentHTML('beforeend', modalMarkapMovieCard);
  // let contentText = (document.querySelector('.add_watched').textContent = 'remove');
  checkClassBtns();

  document.querySelector('.add_queue').addEventListener('click', event => {
    storage.addQueue(data);
    event.target.classList.toggle('queued');
    if (event.target.classList.contains('queued')) {
      document.querySelector('.add_queue').textContent = 'REMOVE';
      new Noty({
        theme: 'sunset',
        layout: 'topRight',
        type: 'success',
        text: ` 🤩Added to QUEUE`,
        timeout: 3500,
      }).show();
    } else {
      document.querySelector('.add_queue').textContent = 'ADD TO QUEUE';
      new Noty({
        theme: 'sunset',
        layout: 'topRight',
        type: 'alert',
        text: ` 🙄  removed from QUEUE`,
        timeout: 3500,
      }).show();
    }
  });

  document.querySelector('.add_watched').addEventListener('click', event => {
    storage.addWatched(data);
    event.target.classList.toggle('watched');

    if (event.target.classList.contains('watched')) {
      document.querySelector('.add_watched').textContent = 'REMOVE';
      new Noty({
        theme: 'sunset',
        layout: 'topRight',
        type: 'success',
        text: ` 🤩Added to WATCHED`,
        timeout: 3500,
      }).show();
    } else {
      document.querySelector('.add_watched').textContent = 'ADD TO WACHED';
      new Noty({
        theme: 'sunset',
        layout: 'topRight',
        type: 'alert',
        text: ` 🙄 Removed from WATCHED`,
        timeout: 3500,
      }).show();
    }
  });
};
console.log(document.querySelector('.add_watched'));

function btns() {
  const refs = {
    watched: document.querySelector('.add_watched'),
    queue: document.querySelector('.add_queue'),
  };
  return refs;
}
