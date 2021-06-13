import refs from './refs/refs';
import apiService from './services/apiService';




refs.libraryBtn.addEventListener('click', (event) => {
    console.log(event.target)
    refs.searchWrap.classList.add('visually-hidden');
    refs.libraryBtnsContainer.classList.remove('visually-hidden');
    refs.libraryBtn.classList.add('current');
    refs.homeBtn.classList.remove('current');
});

refs.watchedBtn.addEventListener('click', (event) => {
    console.log(event.target)
});

refs.queueBtn.addEventListener('click', (event) => {
    console.log(event.target)
});

refs.homeBtn.addEventListener('click', (event) => {
    console.log(event.target)
    refs.homeBtn.classList.add('current');
    refs.libraryBtn.classList.remove('current');
    refs.searchWrap.classList.remove('visually-hidden');
    refs.libraryBtnsContainer.classList.add('visually-hidden');
}
)