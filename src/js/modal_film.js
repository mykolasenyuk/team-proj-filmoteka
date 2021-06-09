
const refs = {
  backdropModalImg: document.querySelector('.backdrop'),
  btnModalImgClose: document.querySelector('.button__close'),
  buttonWatched: document.querySelector('.add_watched'),
  buttonUser: document.querySelector('.add_queue'),
};
console.log(refs.backdropModalImg);
console.log(refs.backdropModalImg.classList.value); //backdrop visually-hidden
refs.backdropModalImg.addEventListener('click', onBackdropModalClose);
refs.btnModalImgClose.addEventListener('click', onBtnModalClose);
function onBackdropModalClose(e) {
  if (e.target.classList.value === 'backdrop') {
    refs.backdropModalImg.classList.add('is-hidden');
    console.log(e.target);
  }
  return;
}
function onBtnModalClose(e) {
  refs.backdropModalImg.classList.add('is-hidden');
  // console.log(e.target);
}
window.addEventListener('keydown', closeModalEscape);
function closeModalEscape(e) {
  if (e.code === 'Escape') {
    refs.backdropModalImg.classList.add('is-hidden');
  }
  return;
}

// btnModalImgClose.addEventListener('click', closeModalClick);
// function closeModalClick() {
//   backdropModalImg.classList.add('is-close');
//

const listWatched = document.createElement('ul');
listWatched.classList.add('modal_list_watched');

const listWillWatch = document.createElement('ul');
listWillWatch.classList.add('modal_list_willwatch');

/* FT - 18 По нажатию на кнопку "Add to watched"
фильм добавляется в просмотренные
фильмы текущего пользователя(local - storage) */

/* FT - 19 По нажатию на кнопку "Add to queue"
фильм добавляется
в очередь текущего пользователя(local - storage) */

/* console.log(localStorage); */


// refs.buttonWatched(click, onAddWatched);
// function onAddWatched() {
//   console.log(e.currentTarget);
//   const movie = e.currentTarget;
//   localStorage.setItem(movie);
//   listWatched.insertAdjacentHTML('beforeend', localStorage.setItem(movie));
// }
// refs.buttonUser(click, onHaveToWatch);

function closeModalCardMovie(e) {
  const onOverlayCloseBtn = e.target !== lightboxCloseBtn;
  /* console.log(e.currentTarget); */
  if (onOverlayCloseBtn) {
    removeLightboxIsOpen();
    removeAtributes();
  }
}
function removeLightboxIsOpen() {
  lightbox.classList.remove('is-open');
}

function removeAtributes() {
  lightBoxImage.src = '';
  lightBoxImage.alt = '';
}

