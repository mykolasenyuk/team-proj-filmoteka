import refs from './refs/refs';
import apiService from './services/apiService';
import moviesList from '../templates/hero_movies.hbs';
import { stopSpin } from './spinner/spinner';
import localStorage from './services/localStorage';

let storage = new localStorage();

const moviesContainer = document.querySelector('.js-movies-container');

function clearMarkup() {
  moviesContainer.innerHTML = '';
}

function renderFilmsCard(data) {
  moviesContainer.insertAdjacentHTML('beforeend', moviesList(data));
  const moviesCardVoteEl = document.querySelectorAll('.movies-card-vote');
  moviesCardVoteEl.forEach(classList => {
    classList.classList.add('is-hidden');
  });
  // console.log(moviesList(data));
  stopSpin();
}

refs.libraryBtn.addEventListener('click', () => {
  clearMarkup();
  watchedFilmsRender();
  refs.searchWrap.classList.add('visually-hidden'); //cкрывает поиск инпут

  refs.libraryBtn.classList.add('current'); //подчеркивание library

  refs.libraryBtnsContainer.classList.remove('visually-hidden'); // показывает кнопки

  refs.homeBtn.classList.remove('current'); //убирает подчеркивание c кнопки home

  refs.headerBg.classList.add('library__background'); //добавляет фон library

  refs.headerBg.classList.remove('header__background'); //скрывает фон header

  refs.paginationContainer.classList.add('disactive-pagination'); //скрывает пагинацию кнопок
});

refs.watchedBtn.addEventListener('click', watchedFilmsRender);
refs.queueBtn.addEventListener('click', queueFilmsRender);

function watchedFilmsRender() {
  clearMarkup();
  renderFilmsCard(
    storage.getWatched().map(film => ({
      ...film,
      release_date: film.release_date.slice(0, 4),
    })),
  ); // Делает карточки Watched
  refs.watchedBtn.classList.add('active');
  refs.queueBtn.classList.remove('active');
}
// console.log(
//   storage.getWatched().map(film => ({
//     ...film,
//     release_date: film.release_date.slice(0, 4),
//   })),
// );
function queueFilmsRender() {
  clearMarkup();
  renderFilmsCard(
    storage.getQueue().map(film => ({
      ...film,
      release_date: film.release_date.slice(0, 4),
    })),
  ); // Делает карточки Queue
  refs.queueBtn.classList.add('active');
  refs.watchedBtn.classList.remove('active');
}

refs.homeBtn.addEventListener('click', onLogoAndHome);
refs.logo.addEventListener('click', onLogoAndHome);
function onLogoAndHome() {
  {
    refs.homeBtn.classList.add('current');

    refs.libraryBtn.classList.remove('current');

    refs.searchWrap.classList.remove('visually-hidden');

    refs.libraryBtnsContainer.classList.add('visually-hidden');

    refs.headerBg.classList.remove('library__background');

    refs.headerBg.classList.add('header__background');

    refs.heroBlock.classList.remove('visually-hidden');

    refs.paginationContainer.classList.remove('disactive-pagination');
  }
}
