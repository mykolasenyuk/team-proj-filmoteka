import refs from './refs/refs';
import apiService from './services/apiService';




refs.libraryBtn.addEventListener('click', (event) => {
    
    refs.searchWrap.classList.add('visually-hidden');//cкрывается поиск инпут    

    refs.libraryBtn.classList.add('current');//подчеркивание library

    refs.libraryBtnsContainer.classList.remove('visually-hidden');// показывают кнопки
    
    refs.homeBtn.classList.remove('current');//убирается подчеркивание c кнопки home
    
    refs.headerBg.classList.add('library__background');//добавляется фон library

    refs.headerBg.classList.remove('header__background');   //скрывается фон header 

    refs.heroBlock.classList.add('visually-hidden');//скрывается блок hero
    
});

refs.watchedBtn.addEventListener('click', (event) => {
    console.log(event.target)
});

refs.queueBtn.addEventListener('click', (event) => {
    console.log(event.target)
});

refs.homeBtn.addEventListener('click', (event) => {
    // console.log(event.target)
    refs.homeBtn.classList.add('current');

    refs.libraryBtn.classList.remove('current');

    refs.searchWrap.classList.remove('visually-hidden');

    refs.libraryBtnsContainer.classList.add('visually-hidden');

    refs.headerBg.classList.remove('library__background');

    refs.headerBg.classList.add('header__background');
    
    refs.heroBlock.classList.remove('visually-hidden');

    // refs.paginationContainer.classList.remove('visually-hidden');
}
)