import movieCardTmpl from '../templates/cardMovie.hbs';

console.log(movieCardTmpl)

const refs = {
  backdropModalImg: document.querySelector('.backdrop'),
  btnModalImgClose: document.querySelector('.button__close'),
  moviesCard: document.querySelector('.movies-card'),
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



/* refs.moviesCard.addEventListener('click', onImageGalleryList);
 function onImageGalleryList(e) {
  e.preventDefault();
  if (e.target.classList.value !== "movies-card") {
    return;
  }
  addOpenLightboxClass();
  addAttributes(e);
}
function addOpenLightboxClass() {
  refs.backdropModalImg.classList.add("is-open");
} */


/* function addAttributes(evt) {
  movieCardTmpl
} */